import { useState } from "react"

const Button = (props) => (
    <button onClick={props.handleClick}>{props.text}</button>
)

const App = () => {
    
    const [good, setGood] = useState(0)
    const [neutral, setNeutral] = useState(0)
    const [bad, setBad] = useState(0)
    const [all, setAll] = useState(0)
    const [points, setPoints] = useState(0)

    if (!all) {
        var avg = 0
        var positives = 0
    } else {
        avg = points / all
        positives = (good / all)*100
    }

  return (
    <div>
      <h1>Give feedback</h1>
      <Button handleClick={() => setGood(good+1) + setAll(all+1) + setPoints(points+1)} text= "Good"/>
      <Button handleClick={() => setNeutral(neutral+1) + setAll(all+1)} text="Neutral"/>
      <Button handleClick={() => setBad(bad+1) + setAll(all+1) + setPoints(points-1)} text="Bad"/>
      <h2>Statistics</h2>
      <div>
        <ul>
        <li>Good: {good}</li>
        <li>Neutral: {neutral}</li>
        <li>Bad: {bad}</li>
        <li>All: {all}</li>
        <li>Average: {avg.toFixed(2)}</li>
        <li>Positive: {positives.toFixed(2)}%</li>
        </ul>
        </div>
    </div>
  )
}

export default App