import React, { useState } from 'react'

// Defining header component
const Headers = (props) => <h1>{props.text}</h1>

const Button = (props) => <button onClick={props.handleClick}>{props.label}</button>

const Statistics = (props) => {
  const av = (props.good * 1 + props.neutral * 0 + props.bad * -1) / props.total;
  const pos = (props.good / props.total) * 100;

  if (props.total === 0) {
    return (
      <div className="stats"><p>No feedback given</p></div>
    )
  } else {
    return (
      <div className="stats">
        <p>
          good: {props.good} 
          <br /> 
          neutral: {props.neutral} 
          <br /> 
          bad: {props.bad}
          <br /> 
          all: {props.total}
          <br />
          average: {!isNaN(av) ? av : 0}
          <br />
          positive: {!isNaN(pos) ? pos + "%" : "0%"}
        </p>
      </div>
    )
  }
}

const App = () => {
  // Save clicks of each button to its own state
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)

  // Save total number of clicks to calculate average
  const [total, setTotal] = useState(0)

  // Create fnctn that returns a fnctn template for iterating good, neutral, and bad counts
  const handleClick = (value) => {
    return () => {
      setTotal(total + 1);

      switch(value) {
        case 'good':
          setGood(good + 1);
          break;
        case 'neutral':
          setNeutral(neutral + 1);
          break;
        case 'bad':
          setBad(bad + 1);
          break;
        default:
          return
      }
    }
  }

  return (
    <div>
      <Headers text="Give feedback" />
      <Button handleClick={handleClick('good')} label="good" />
      <Button handleClick={handleClick('neutral')} label="neutral" />
      <Button handleClick={handleClick('bad')} label="bad" />
      <Headers text="Statistics" />
      <Statistics good={good} neutral={neutral} bad={bad} total={total}/>
    </div>
  )
}

export default App