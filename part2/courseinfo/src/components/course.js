import React from 'react';

const Header = ({ course }) => <h1>{course.name}</h1>
  
const Part = (props) => <p>{props.part.name} {props.part.exercises}</p>    

const Content = ({ course }) => {
return ( // Use map to extend number of courses to any arbitrary n
    <div>
    {
        course.parts.map((part) => <Part key={part.id} part={part} />)
    }
    </div>
)
}

const Total = ({ course }) => {
    const sum = course.parts.map((i) => {return i.exercises}).reduce((a, b) => a + b)
    return(
        <p><strong>Total of {sum} exercises</strong></p>
    ) 
}
  
const Course = ({ course }) => {
    return (
      <div>
        <Header course={course} />
        <Content course={course}/>
        <Total course={course}/>
      </div>
    )
}

export default Course;