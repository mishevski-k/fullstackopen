const express = require('express');
const server = express();

server.use(express.json());

let persons = [
    {
        id: 1,
        name: "Arto Hellas",
        number: "040-123456",
    },
    {
        id: 2,
        name: "Ada Lovelace",
        number: "39-44-5323523",
    },
    {
        id: 3,
        name: "Dan Abramov",
        number: "12-43-234345",
    },
    {
        id: 4,
        name: "Marry Poppendick",
        number: "39-23-6423122",
    },
    {
        id: 5,
        name: "Maja Aleksovska",
        number: "389-078-000-000",
    },
];

const generateId= () => {
    return Math.floor(Math.random() * 321);
}

server.get('/', (request, response) => {
    const routes = {
        root: '/',
        info: '/info',
        persons: '/api/v1/persons',
        personById: '/api/v1/persons/:id'
    }

    response.json(routes);
});

server.get('/info', (request, response) => {

    response.send(`<p>Phonebook has info for ${persons.length} people</p><h4>${new Date()}</h4>`);
});

const personsResource = '/api/v1/persons';

server.get(`${personsResource}`, (request, response) => {
    if(persons.length === 0){
        return response.status(404).json({code: 1000, message: "We could not find any person"});
    }

    response.json(persons);
});

server.get(`${personsResource}/:id`, (request, response) => {
    const id = Number(request.params.id);

    if(id != id){
        return response.json({error: 'Id given is not a number'});
    }

    const person = persons.find( p => p.id === id);

    if(person){
        response.json(person);
    }else{
        response.status(404).json({error:`Could not find person with id ${id}`});
    }
});

server.post(`${personsResource}`, (request, response) => {
    const body = request.body;

    if(!body.name){
        return response.status(400).json({
            error: `Missing persons name`
        });
    }

    if(!body.number){
        return response.status(400).json({
            error: `Missing persons number`
        });
    }

    const name = body.name;
    const number = body.number;

    const existingPerson = persons.find(p => p.name === name);

    if(existingPerson){
        return response.status(400).json({
            error: `name must be unique`
        });
    }

    const newPerson = {
        name: name,
        number: number,
        id: generateId(),
    };

    persons = persons.concat(newPerson);

    response.json(newPerson);
})

server.delete(`${personsResource}/:id`, (request, response) => {
    const id = Number(request.params.id);

    if(id != id){
        return response.json({error: 'Id given is not a number'});
    }

    persons.filter(p => p.id !== id);

    response.status(204).end();
})

const PORT = 3001 // should be changed to environment variable

server.listen(PORT, () => {
    console.log(`server is running at http://localhost:${PORT}`)
})