import axios from 'axios';
import React, { useState, useEffect } from 'react';
import personService from './services/persons';

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

const App = () => {
  const [persons, setPersons] = useState([{ name: 'Arto Hellas', number: '040-1234567' }]) 
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [filter, setFilter] = useState('')

  useEffect(() => {
    personService
      .getAll()
      .then(response => {
        setPersons(response)
      })
  }, [])

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
      // Post the person to the server and update the app's state
      personService
        .create({
          name: newName,
          number: newNumber
        })
        .then(response => {
          setPersons([
            ...persons,
            response
          ])
        })
    }

    // Clear fields
    setNewName('');
    setNewNumber('');

  }

  const fullDeleteHandle = (id) => {
    const userConfirm = window.confirm(`Do you really want to delete person ${id}?`);

    if (userConfirm) {
      personService
      .handleDelete(id)
      .then(() => {
        // Re-GET persons to refresh the app
        personService
        .getAll()
        .then(response => {
          setPersons(response)
        })
      });
    } else {
      return
    }
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
      {
        personsToShow
          .map((per) => <p key={per.name + per.number}>{per.name} {per.number} <button onClick={() => fullDeleteHandle(per.id)}>Delete</button></p>)
      }
    </div>
  )
}

export default App