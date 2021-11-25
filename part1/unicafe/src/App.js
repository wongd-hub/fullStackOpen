import React, { useState } from 'react'

// Defining header component
const Headers = (props) => <h1>{props.text}</h1>

const Button = (props) => <button onClick={props.handleClick}>{props.label}</button>

const StatisticLine = (props) => <p>{props.text}: {props.value}</p>

const Statistics = (props) => {
  if (props.total === 0) {
    return (
      <div className="stats"><p>No feedback given</p></div>
    )
  } else {
    return (
      <div className="stats">
        <StatisticLine text="good" value={props.good}  />
        <StatisticLine text="neutral" value={props.neutral}  />
        <StatisticLine text="bad" value={props.bad}  />
        <StatisticLine text="all" value={props.total}  />
        <StatisticLine text="average" value={(props.good * 1 + props.neutral * 0 + props.bad * -1) / props.total}  />
        <StatisticLine text="positive" value={(props.good / props.total) * 100}  />
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