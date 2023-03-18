require('dotenv').config();
const express = require('express');
const Note = require('./models/note');
const app = express();
const cors = require('cors');


const requestLogger = (request, response, next) => {
    console.log('Method: ', request.method);
    console.log('Path: ', request.path);
    console.log('Body: ', request.body);
    console.log('---');
    next();
}

app.use(express.json());
app.use(requestLogger);
app.use(cors());

let notes = [
    {
        id: 1,
        content: "HTML is easy",
        important: true,
    },
    {
        id: 2,
        content: "Browser can execute only JavaScript",
        important: false,
    },
    {
        id: 3,
        content: "GET and POST are the most important methods of HTTP protocol",
        important: true,
    }
];

app.get('/', ( request, response ) => {
    response.send('<h1>Hello World!</h1>');
});

app.get('/api/notes', ( request, response ) => {
    Note.find({}).then(notes => {
        response.json(notes);
    })
});

app.get('/api/notes/:id', ( request, response, next ) => {
    const id = request.params.id;
    Note
        .findById(id)
        .then(note => {
            if(note){
                response.json(note);
            }else{
                response.status(404).send({error: "Note cannot be found"});
            }
        })
        .catch(error => next(error) )
});

app.post('/api/notes', ( request, response) => {
    const body = request.body;

    if(!body.content) {
        return response.status(400).json({
            error: 'content missing'
        });
    }

    const note = new Note({
        content: body.content,
        important: body.important || false
    });

    note.save().then(savedNote => {
        response.json(savedNote);
    });
});

app.put('/api/notes/:id', (request, response, next) => {
    const body = request.body;

    if(!body.content) {
        return response.status(400).json({
            error: 'content missing'
        });
    }

    const note = {
        content: body.content,
        important: body.important
    }

    Note.findByIdAndUpdate(request.params.id, note, { new: true })
        .then(updatedNote => {
            response.json(updatedNote);
        })
        .catch(error => next(error))
})

app.delete('/api/notes/:id', ( request, response, next ) => {
    Note.findByIdAndRemove(request.params.id)
        .then(result => {
            reposen.status(204).end()
        })
        .catch(error => next(error))
});

const unknownEnpoint = (request, response) => {
    response.status(404).send({error: 'unkown endpoint'});
}

app.use(unknownEnpoint);

const errorHandler = (error, request, response, next) => {
    console.log(error.message);

    if(error.name === 'CastError'){
        return response.status(400).send({error: 'malformed id'})
    }

    next(error);
}

app.use(errorHandler);

const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});