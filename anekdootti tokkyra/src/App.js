import { useState } from 'react'

const Button = ({text, handleClick}) => (
  <button onClick={handleClick}>{text}</button>
)

const App = () => {
  const anecdotes = [
    'If it hurts, do it more often.',
    'Adding manpower to a late software project makes it later!',
    'The first 90 percent of the code accounts for the first 90 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.',
    'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.',
    'Premature optimization is the root of all evil.',
    'Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.',
    'Programming without an extremely heavy use of console.log is same as if a doctor would refuse to use x-rays or blood tests when dianosing patients.',
    'The only way to go fast, is to go well.',
    'Using MOOC as source of learning is same as if driving without steering wheel.'
  ]
  
  //ei saa suuttua viimeisesta anekdootista :)

  const [selected, setSelected] = useState(0)
  const [votes, setVotes] = useState(Array(anecdotes.length).fill(0))
  const [topRated, setTopRated] = useState(0)

  const randomizzzze = () => {
    let rndIndex = 0
     do {
      rndIndex = Math.floor(Math.random() * anecdotes.length)
    } while (rndIndex === selected)
    setSelected(rndIndex)
  }

  const giveVote = () => {
    let copy = [...votes]
    copy[selected] += 1
    findMostVoted(copy, selected)
    setVotes(copy)
  }

  const findMostVoted = (copy, voted) => {
    if (copy[voted] > votes[topRated]) {
      setTopRated(voted)
    }
  }

  return (
    <div>
      <h1>Anecdote of the day:</h1>
      {anecdotes[selected]}
      <br/><br/>
      <div>This anecdote has {votes[selected]} votes</div>
      <br/>
      <div>
        <Button handleClick={() => randomizzzze()} text={"Show anecdote"}/>
        <Button handleClick={() => giveVote()} text={"Give vote"}/>
      </div>
      <h2>Top rated:</h2>
      {anecdotes[topRated]}
    </div>
  )
}
export default App