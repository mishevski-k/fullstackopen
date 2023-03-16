import { useState, useEffect } from 'react';
import PhoneList from "./components/PhoneList";
import Filter from './components/Filter';
import PersonForm from './components/PersonForm';
import axios from 'axios';

const App = () => {
  
  const [ persons, setPersons ] = useState([]);
  const [ newName, setNewName ] = useState('');
  const [ newNumber, setNewNumber ] = useState('');
  const [ filterPerson, setFilterPerson ] = useState('');

  useEffect(() => {
    axios
      .get('http://localhost:3001/persons')
      .then(response => {
        setPersons(response.data)
      })
      .catch((error) => {
        console.error(error);
      })
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

  const addPerson = (event) => {
    event.preventDefault();

    const personExists = persons.some(person => person.name === newName);

    if(personExists){
      return alert(`${newName} is already added to phonebook`);
    }

    const newPerson = {
      name: newName,
      number: newNumber,
      id: persons.length + 1
    };

    setPersons(persons.concat(newPerson));
    setNewName('')
    setNewNumber('');
  }

  return(
    <div>
      <h2>Phonebook</h2>
      <Filter value={filterPerson} handleChange={handleFilterPerson} />
      <h3>Add a new</h3>
      <PersonForm handleSubmit={addPerson} nameValue={newName} numberValue={newNumber} handleNameChange={handleNameChange} handleNumberChange={handleNumberChange} />
      <h3>Numbers</h3>
      <PhoneList list={personsToShow} />
    </div>
  )
}

export default App;