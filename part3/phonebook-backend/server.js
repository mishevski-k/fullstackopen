require('dotenv').config();
const express = require('express');
const morgan = require('morgan');
const cors = require('cors');
const Person = require('./models/person');
const server = express();

morgan.token('json-body', (req,res) => {
    return JSON.stringify(req.body);
});

server.use(express.json());
server.use(express.static('dist'));
server.use(morgan(':method :url :status :res[content-length] - :response-time ms :json-body'));
server.use(cors());

server.get('/api/v1', (request, response) => {
    const routes = {
        root: '/',
        info: '/info',
        persons: '/api/v1/persons',
        personById: '/api/v1/persons/:id'
    }

    response.json(routes);
});

server.get('/info', (request, response, next) => {

    Person
        .find({})
        .then( result => {
            response.send(`<p>Phonebook has info for ${result.length} people</p><h4>${new Date()}</h4>`);
        })
        .catch(error => next(error))

});

const personsResource = '/api/v1/persons';

server.get(`${personsResource}`, (request, response, next) => {

    Person
        .find({})
        .then( result => {
            response.json(result);
        })
        .catch(error => next(error))
});

server.get(`${personsResource}/:id`, (request, response, next) => {

    Person
        .findById(request.params.id)
        .then( result => {
            response.json(result);
        })
        .catch(error => next(error))
});

server.post(`${personsResource}`, (request, response,next) => {
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

    const person = new Person({
        name: name,
        number: number,
    });

    person
        .save()
        .then( result => {
            response.json(result);
        })
        .catch( error => next(error))
})

server.put(`${personsResource}/:id`, (request, response, next) => {
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
    
    const person = {
        name: body.name,
        number: body.number
    };

    Person
        .findByIdAndUpdate(request.params.id, person, { new: true})
        .then(result => {
            response.json(result);
        })
        .catch(error => next(error));
})

server.delete(`${personsResource}/:id`, (request, response,next) => {

    Person
        .findByIdAndRemove(request.params.id)
        .then( result => {
            response.status(204).end()
        })
        .catch(error => next(error))
})

const unknownEnpoint = (request, response) => {
    response.status(404).send({error: "unkown endpoint"});
}

server.use(unknownEnpoint);

const errorHandler = (error, request, reponse, next) => {
    console.log(error.message);

    if(error.name === 'CastError'){
        return reponse.status(400).send({error: "malformed parametar"})
    }

    next(error);
}

server.use(errorHandler);

const PORT = process.env.PORT || 3001 // should be changed to environment variable

server.listen(PORT, () => {
    console.log(`server is running at http://localhost:${PORT}`)
})