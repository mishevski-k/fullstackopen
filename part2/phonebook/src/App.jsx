import { useState, useEffect } from 'react';
import PhoneList from "./components/PhoneList";
import Filter from './components/Filter';
import PersonForm from './components/PersonForm';
import personService from './services/persons';

const App = () => {
  
  const [ persons, setPersons ] = useState([]);
  const [ newName, setNewName ] = useState('');
  const [ newNumber, setNewNumber ] = useState('');
  const [ filterPerson, setFilterPerson ] = useState('');

  useEffect(() => {

    personService
      .getAll()
      .then(initialPersons => {
        setPersons(initialPersons);
      });
  }, []);

  const personsToShow = filterPerson === ''
    ? persons
    : persons.filter(person => person.name.toLowerCase().includes(filterPerson.toLowerCase()));

  const handleNameChange = (event) => {
    setNewName(event.target.value);
  }

  const handleNumberChange = (event) => {
    setNewNumber(event.target.value);
  }

  const handleFilterPerson = (event) => {
    setFilterPerson(event.target.value);
  }

  const deletePerson = (id) => {
    const person = persons.find(person => person.id === id);
    if(person && window.confirm(`Delete ${person.name} ?`)){
      personService
      .remove(id)
      .then( response => {
        setPersons(persons.filter(person => person.id !== id));
      });
    }
  }

  const updateNumber = (id, person) => {
    personService
      .update(id, person)
      .then( result => {
        setPersons(persons.map(person => person.id !== result.id ? person : result));
      })
      .catch(error => {
        setPersons(person.filter(person => person.id !== id));
      })
  }

  const addPerson = (event) => {
    event.preventDefault();

    const newPerson = {
      name: newName,
      number: newNumber,
    };

    const existingPerson = persons.find(person => person.name === newName);

    if(existingPerson){
      if(window.confirm(`${existingPerson.name} is alredy added to phonebook, replace the old number with a new one?`)){
        return updateNumber(existingPerson.id, newPerson);
      }else{
        return;
      }

    }

    personService
      .create(newPerson)
      .then( returnedPerson => {
        setPersons(persons.concat(returnedPerson));
        setNewName('')
        setNewNumber('');
      })
  }

  return(
    <div>
      <h2>Phonebook</h2>
      <Filter value={filterPerson} handleChange={handleFilterPerson} />
      <h3>Add a new</h3>
      <PersonForm handleSubmit={addPerson} nameValue={newName} numberValue={newNumber} handleNameChange={handleNameChange} handleNumberChange={handleNumberChange} />
      <h3>Numbers</h3>
      <PhoneList list={personsToShow} handleDelete={deletePerson} />
    </div>
  )
}

export default App;