import React, { useState } from 'react'

const App = () => {
  const [persons, setPersons] = useState([{ name: 'Arto Hellas', number: '040-1234567' }]) 
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')

  // Handler for name change
  const changeHandler = (event) => setNewName(event.target.value)

  // Handle for number change
  const changeNumberHandler = (event) => setNewNumber(event.target.value)

  // Handle form submission
  const submitHandler = (event) => {
    event.preventDefault();

    if (persons.map((per) => per.name).includes(newName)) {
      window.alert(`${newName} is already in the phonebook`);
    } else {
      setPersons([
        ...persons,
        {name: newName,
        number: newNumber}
      ]);
    }

    // Clear fields
    setNewName('');
    setNewNumber('');

  }

  return (
    <div>
      <h2>Phonebook</h2>
      <form onSubmit={submitHandler}>
        <div>
          name: <input value={newName} onChange={changeHandler} />
          <br />
          number: <input value={newNumber} onChange={changeNumberHandler} />
        </div>
        <div>
          <button type="submit">add</button>
        </div>
      </form>
      <h2>Numbers</h2>
     {persons.map((per) => <p key={per.name + per.number}>{per.name} {per.number}</p>)}
    </div>
  )
}

export default App