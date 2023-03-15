import { useState } from 'react';
import PhoneList from "./components/PhoneList";
import Filter from './components/Filter';
import PersonForm from './components/PersonForm';

const App = () => {
  
  const [ persons, setPersons ] = useState([
    { name: 'Arto Hellas', number: '040-123456', id: 1 },
    { name: 'Ada Lovelace', number: '39-44-5323523', id: 2 },
    { name: 'Dan Abramov', number: '12-43-234345', id: 3 },
    { name: 'Mary Poppendieck', number: '39-23-6423122', id: 4 }
  ]);

  const [ newName, setNewName ] = useState('');
  const [ newNumber, setNewNumber ] = useState('');
  const [ filterPerson, setFilterPerson ] = useState('');

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