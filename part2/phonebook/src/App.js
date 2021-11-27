import React, { useState } from 'react'

const Filter = (props) => <form>filter shown with: <input value={props.filter} onChange={props.changeFilterHandler} /></form>

const AddNewPerson = (props) => {
  return (
    <form onSubmit={props.submitHandler}>
      <h2>Add a new contact</h2>
      <div>
        name: <input value={props.newName} onChange={props.changeHandler} />
        <br />
        number: <input value={props.newNumber} onChange={props.changeNumberHandler} />
      </div>
      <div>
        <button type="submit">add</button>
      </div>
    </form>
  )
}

const ShowPhonebook = (props) => {
  return (
    props.personsToShow.map((per) => <p key={per.name + per.number}>{per.name} {per.number}</p>)
  )
}

const App = () => {
  const [persons, setPersons] = useState([{ name: 'Arto Hellas', number: '040-1234567' }]) 
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [filter, setFilter] = useState('')

  // Handler for name change
  const changeHandler = (event) => setNewName(event.target.value)

  // Handler for number change
  const changeNumberHandler = (event) => setNewNumber(event.target.value)

  // Handler for filter change
  const changeFilterHandler = (event) => setFilter(event.target.value)

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

  let personsToShow = []; 
  if (filter === '') {
    personsToShow = persons;
  } else {
    personsToShow = persons
      .filter((per) => per.name
                        .toLowerCase()
                        .includes(filter.toLowerCase()))
  }

  return (
    <div>
      <h2>Phonebook</h2>
      <Filter filter={filter} changeFilterHandler={changeFilterHandler} />
      <AddNewPerson submitHandler={submitHandler} newName={newName} changeHandler={changeHandler} newNumber={newNumber} changeNumberHandler={changeNumberHandler} />
      <h2>Numbers</h2>
      <ShowPhonebook personsToShow={personsToShow} />
    </div>
  )
}

export default App