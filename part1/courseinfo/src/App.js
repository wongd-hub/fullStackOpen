import React from 'react';

const Header = (props) => {
  return (
    <h1>{props.course}</h1>
  );
}

const Part = (props) => {
  return (
    <p>
      {props.part} {props.exercises}
    </p>
  )
}

const Content = (props) => {
  return (
    <div>
      <Part part={props.courseStructure[0].name} exercises={props.courseStructure[0].exercises} />
      <Part part={props.courseStructure[1].name} exercises={props.courseStructure[1].exercises} />
      <Part part={props.courseStructure[2].name} exercises={props.courseStructure[2].exercises} />
    </div>
  )
}

const Total = (props) => {
  return (
    <p>Number of exercises {props.courseStructure[0].exercises + props.courseStructure[1].exercises + props.courseStructure[2].exercises}</p>
  ) 
}

const App = () => {

  const course = {
    name: 'Half Stack application development',
    parts: [
      {
        name: 'Fundamentals of React',
        exercises: 10
      },
      {
        name: 'Using props to pass data',
        exercises: 7
      },
      {
        name: 'State of a component',
        exercises: 14
      }
    ]
  }

  return (
    <div>
      <Header course={course.name}/>
      <Content courseStructure={course.parts}/>
      <Total courseStructure={course.parts} />
    </div>
  )
}



export default App;
