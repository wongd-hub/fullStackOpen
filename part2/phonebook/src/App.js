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

const Message = ({ message, style }) => {
  if (message === null) {
    return null
  }

  return (
    <div style={style}>
      <p>{message}</p>
    </div> 
  )
}

const App = () => {
  const [persons, setPersons] = useState([{ name: 'Arto Hellas', number: '040-1234567' }]) 
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [filter, setFilter] = useState('')
  const [message, setMessage] = useState({
    message: null,
    style: null
  });

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

    if (persons.map(per => per.name).includes(newName)) {
      const userConfirm = window.confirm(`${newName} is already in the phonebook, replace the old number with a new one?`);
      // const id = persons.map(per => per.name).indexOf(newName) + 1;
      // The above code doesn't always work, trying a more sophisticated way of pulling the id of the replaced name...

      if (userConfirm) {
        personService
          .getAll()
          // ... Return array of names in order, then get index of the one that matches
          .then(response => response.map(el => el.name).indexOf(newName))
          // Then query for object at index that was output previously and grab id
          .then(idx => personService
              .getAll()
              .then(response => response[idx].id)
          )
          // Once the index is confirmed, perform update and set state to refresh app
          .then(id => personService 
            .update(id, {
              name: newName,
              number: newNumber
            })
            .then(response => {
              setPersons(persons.map(per => per.id !== id ? per : response))
            })
          )
          .then(response => {
            setMessage({
              message: `Updated successfully`,
              style: {
                border: '3px solid green',
                color: 'green',
                marginBottom: '30px'
              }
            })

            setTimeout(() => {
              setMessage({
                message: null,
                style: null
              })
            }, 5000)
          })
          .catch(error => {
            setMessage({
              message: `Unsuccessful in updating`,
              style: {
                border: '3px solid red',
                color: 'red',
                marginBottom: '30px'
              }
            })

            setTimeout(() => {
              setMessage({
                message: null,
                style: null
              })
            }, 5000)
          })
      }

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
        .then(response => {
          setMessage({
            message: `Added successfully`,
            style: {
              border: '3px solid green',
              color: 'green',
              marginBottom: '30px'
            }
          })

          setTimeout(() => {
            setMessage({
              message: null,
              style: null
            })
          }, 5000)
        })
        .catch(error => {
          setMessage({
            message: `Unsuccessful in adding`,
            style: {
              border: '3px solid red',
              color: 'red',
              marginBottom: '30px'
            }
          })

          setTimeout(() => {
            setMessage({
              message: null,
              style: null
            })
          }, 5000)
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
      })
      .then(response => {
        setMessage({
          message: `Deleted successfully`,
          style: {
            border: '3px solid green',
            color: 'green',
            marginBottom: '30px'
          }
        })

        setTimeout(() => {
          setMessage({
            message: null,
            style: null
          })
        }, 5000)
      })
      .catch(error => {
        setMessage({
          message: `Unsuccessful in deleting`,
          style: {
            border: '3px solid red',
            color: 'red',
            marginBottom: '30px'
          }
        })

        setTimeout(() => {
          setMessage({
            message: null,
            style: null
          })
        }, 5000)
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
      <Message message={message.message} style={message.style} />
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