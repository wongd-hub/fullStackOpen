import React, { useState } from 'react'

const App = () => {
  const [persons, setPersons] = useState([{ name: 'Arto Hellas' }]) 
  const [newName, setNewName] = useState('')

  const submitHandler = (event) => {
    event.preventDefault();

    if (persons.map((per) => per.name).includes(newName)) {
      window.alert(`${newName} is already in the phonebook`);
    } else {
      setPersons([
        ...persons,
        {name: newName}
      ]);
    }

    // Clear field
    setNewName('');

  }

  const changeHandler = (event) => setNewName(event.target.value)

  return (
    <div>
      <h2>Phonebook</h2>
      <form onSubmit={submitHandler}>
        <div>
          name: <input value={newName} onChange={changeHandler}/>
        </div>
        <div>
          <button type="submit">add</button>
        </div>
      </form>
      <h2>Numbers</h2>
     {persons.map((per) => <p key={per.name}>{per.name}</p>)}
    </div>
  )
}

export default App