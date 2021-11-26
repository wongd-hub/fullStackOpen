import React, { useState } from 'react';

const Button = (props) => <button onClick={props.handleClick}>{props.label}</button>;

const Anecdotes = (props) => {
  return (
    <p>
      {props.selectedAnecdote}
      <br />
      Has {props.votes} votes
      </p>
  )
}

const App = () => {
  const anecdotes = [
    'If it hurts, do it more often',
    'Adding manpower to a late software project makes it later!',
    'The first 90 percent of the code accounts for the first 10 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.',
    'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.',
    'Premature optimization is the root of all evil.',
    'Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.',
    'Programming without an extremely heavy use of console.log is same as if a doctor would refuse to use x-rays or blood tests when diagnosing patients'
  ]
   
  const [selected, setSelected] = useState(0);

  // Define state that tracks votes for each anecdote in the `anecdotes` array
  const voteInitiator = anecdotes.map(() => 0);
  const [votes, setVotes] = useState(voteInitiator);

  // Define handler function for clicks that sets selected to random number
  const handleClick = () => {
    const randIdx = Math.floor(Math.random() * anecdotes.length);
    setSelected(randIdx);
  }

  const handleVote = () => {
    const stateCopy = [...votes];
    stateCopy[selected] += 1;
    setVotes(stateCopy);
  }

  return (
    <div>
      <Anecdotes selectedAnecdote={anecdotes[selected]} votes={votes[selected]}/>
      <br />
      <Button handleClick={handleVote} label="Vote" />
      <Button handleClick={handleClick} label="Next anecdote" />
    </div>
  )
}

export default App;