import { useState } from 'react';

const App = () => {
  const [ good, setGood ] = useState(0);
  const [ neutral, setNeutral ] = useState(0);
  const [ bad, setBad ] = useState(0);

  const increaseGoodByOne = () => setGood(good + 1);
  const increaseNeutralByOne = () => setNeutral(neutral + 1);
  const increaseBadByOne = () => setBad(bad + 1);

  return(
    <div>
      <h1>Give feedback</h1>
      <div>
        <button onClick={increaseGoodByOne}>Good</button>
        <button onClick={increaseNeutralByOne}>Neural</button>
        <button onClick={increaseBadByOne}>Bad</button>
      </div>
      <h1>Statistics</h1>
      <div>
        <p>Good { good }</p>
        <p>Neutral { neutral }</p>
        <p>Bad { bad }</p>
      </div>
    </div>
  )
}

export default App;
