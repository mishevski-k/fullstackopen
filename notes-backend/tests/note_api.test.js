const mongoose = require('mongoose');
const supertest = require('supertest');
const app = require('../app');
const api = supertest(app);
const helper = require('./test_helper');
const Note = require('../models/note');
const User = require('../models/user');

const GetRootUser = async () => {
    const user = {
        username: 'root',
        password: 'sudo',
    }

    return await api
        .post('/api/login')
        .send(user);
}

beforeEach(async () => {
    await Note.deleteMany({});
    await User.deleteMany({});

    const rootUser = {
        username: 'root',
        password: 'sudo'
    };

    await api
        .post('/api/users')
        .send(rootUser)
        .expect(201)
        .expect('Content-Type', /application\/json/);

    const noteObject = helper.initialNotes
        .map(note => new Note(note))
    const promiseArray = noteObject.map(note => note.save());
    await Promise.all(promiseArray);
});

test('notes are returned as json', async () =>{
    await api
        .get('/api/notes')
        .expect(200)
        .expect('Content-Type', /application\/json/);
});

test('all notes are returned', async () => {
    const response = await api.get('/api/notes');

    expect(response.body).toHaveLength(helper.initialNotes.length);
});

test('note without content is not added', async () => {
    const newNote = {
        important: true
    };

    await api  
        .post('/api/notes')
        .send(newNote)
        .expect(400);

    const notesAtEnd = await helper.notesInDb();

    expect(notesAtEnd).toHaveLength(helper.initialNotes.length);
});

test('a valid note can be added', async () => {
    const user = await GetRootUser();

    const token = user.body.token;

    const newNote = {
        content: 'async/await simplifies making async calls',
        important: true
    };

    await api
        .post('/api/notes')
        .auth(token, {type: 'bearer'})
        .send(newNote)
        .expect(201)
        .expect('Content-Type', /application\/json/);

    const notesAtEnd = await helper.notesInDb();
    expect(notesAtEnd).toHaveLength(helper.initialNotes.length + 1);
    
    const contents = notesAtEnd.map(n => n.content);
    expect(contents).toContain(
        'async/await simplifies making async calls'
    );
});

test('a specific note can be viewed', async () => {
    const notesAtStart = await helper.notesInDb();

    const noteToView = notesAtStart[0];

    const resultNote = await api
        .get(`/api/notes/${noteToView.id}`)
        .expect(200)
        .expect('Content-Type', /application\/json/);

        expect(resultNote.body).toEqual(noteToView);
});

test('a note can be deleted', async () => {
    const notesAtStart = await helper.notesInDb();
    const noteToDelete = notesAtStart[0];

    await api
        .delete(`/api/notes/${noteToDelete.id}`)
        .expect(204);

    const notesAtEnd = await helper.notesInDb();

    expect(notesAtEnd).toHaveLength(
        helper.initialNotes.length - 1
    );

    const contents = notesAtEnd.map(r => r.content);

    expect(contents).not.toContain(noteToDelete.content);
})

afterAll(async () => {
    await mongoose.connection.close();
});