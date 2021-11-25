import React from 'react'
// const App = () => {
//   console.log('Hello from component')
//   return (
//     <div>
//       <p>Hello world</p>
//     </div>
//   )
// }

// const App = () => {
//   const now = new Date()
//   const a = 10
//   const b = 20

//   return (
//     <div>
//       <p>Hello world, it is {now.toString()}</p>
//       <p>
//         {a} plus {b} is {a + b}
//       </p>
//     </div>
//   )
// }

const Hello = (props) => {
  return (
    <div>
      {/* <p>Hello {props.name}</p> */}
      Hello {props.name}, you are {props.age} years old
    </div>
  )
}

const App = () => {
  const name = 'Peter'
  const age = 10

  return (
    <div>
      <h1>Greetings</h1>
      {/* <Hello />
      <Hello name="George" />
      <Hello name="Daisy" /> */}
      <Hello name="Maya" age={26 + 10} />
      <Hello name={name} age={age} />
    </div>
  )
}

export default App