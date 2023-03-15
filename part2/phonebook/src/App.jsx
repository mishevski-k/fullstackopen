import { useState } from 'react';
import PhoneList from "./components/PhoneList";

const App = () => {
  const [ persons, setPersons ] = useState([{name: 'Arto Hellas', id: 1}]);
  const [ newName, setNewName ] = useState('');

  const handleNameChange = (event) => {
    setNewName(event.target.value);
  }

  const addPerson = (event) => {
    event.preventDefault();

    const personExists = persons.some(person => person.name === newName);

    if(personExists){
      return alert(`${newName} is already added to phonebook`);
    }

    const newPerson = {
      name: newName,
      id: persons.length + 1
    };

    setPersons(persons.concat(newPerson));
    setNewName('')
  }

  return(
    <div>
      <h2>Phonebook</h2>
      <form onSubmit={addPerson}>
        <div>
          name: <input value={newName} onChange={handleNameChange} />
        </div>
        <div>
          <button type="submit">add</button>
        </div>
      </form>
      <h2>Numbers</h2>
      <PhoneList list={persons} />
    </div>
  )
}

export default App;