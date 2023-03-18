const mongoose = require('mongoose');

const argumentsLength = process.argv.length;

if(argumentsLength < 3){
    console.log('give pasword as argument');
    process.exit();
}

const password = process.argv[2];

const url = `mongodb+srv://mishevski2000:${password}@cluster0.plmkeby.mongodb.net/phonebook?retryWrites=true&w=majority`;

mongoose.set('strictQuery', false);
mongoose.connect(url);

const personSchema = new mongoose.Schema({
    name: String,
    number: String,
});

const Person = mongoose.model('Person', personSchema);

const addPerson = (name, number) => {
    const person = new Person({
        name: name,
        number: number, 
    });

    person.save().then(result => {
        console.log(`added ${name} ${number} to phonebook`);
        mongoose.connection.close();
    });
}

const getAll = () => {
    Person.find({}).then( result => {
        console.log('phonebook');
        result.forEach(person => {
            console.log(person.name, person.number)
        })
        mongoose.connection.close();
    })
}

if(argumentsLength >= 4){
    const name = process.argv[3];
    const number = process.argv[4] || null;
    addPerson(name, number);
}else{
    getAll();
}