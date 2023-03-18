const express = require('express');
const server = express();

const persons = [
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
        return response.json({code: 1000, message: 'Id given is not a number'});
    }

    const person = persons.find( p => p.id === id);

    if(person){
        response.json(person);
    }else{
        response.status(404).json({code: 1001, message: `Could not find person with id ${id}`});
    }
})

const PORT = 3001 // should be changed to environment variable

server.listen(PORT, () => {
    console.log(`server is running at http://localhost:${PORT}`)
})