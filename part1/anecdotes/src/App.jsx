import { useState } from 'react';

function App() {
  const predifinedAnecdotes = [
    {
      content: 'If it hurts, do it more often.',
      votes: 0
    },
    {
      content: 'Adding manpower to a late software project makes it later!',
      votes: 0
    },
    {
      content: 'The first 90 percent of the code accounts for the first 10 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.',
      votes: 0
    },
    {
      content: 'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.',
      votes: 0
    },
    {
      content: 'Premature optimization is the root of all evil.',
      votes: 0
    },
    {
      content: 'Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.',
      votes: 0
    },
    {
      content: 'Programming without an extremely heavy use of console.log is same as if a doctor would refuse to use x-rays or blood tests when diagnosing patients.',
      votes: 0
    },
    {
      content: 'The only way to go fast, is to go well.',
      votes: 0
    },
  ];

  const [ selected, setSelected ] = useState(0);
  const [ anecdotes, setAnecdotes ] = useState(predifinedAnecdotes); 

  function randomNumberMinMax(min, max) { // min and max included 
    return Math.floor(Math.random() * (max - min + 1) + min)
  }
  

  const nextAnecdote = () => {
    setSelected(randomNumberMinMax(0, anecdotes.length - 1));
    console.log(selected);
    console.log(anecdotes);
  }

  const voteAnecdote = () => {
    const copyAnecdotes = [ ...anecdotes ];
    copyAnecdotes[selected].votes += 1;
    console.log(copyAnecdotes);
    setAnecdotes(copyAnecdotes);
    console.log(anecdotes);
  }

  return (
    <div>
      <p>{ anecdotes[selected].content }</p>
      <p>has { anecdotes[selected].votes } votes</p>
      <div>
        <button onClick={voteAnecdote}>vote</button>
        <button onClick={nextAnecdote}>next anecdote</button>
      </div>
    </div>
  )
}

export default App
