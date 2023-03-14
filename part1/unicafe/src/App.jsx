import { useState } from 'react';
import Statistics from './components/Statusctics';
import RatingButton from './components/RatingButton';

const App = () => {
  const [ good, setGood ] = useState(0);
  const [ neutral, setNeutral ] = useState(0);
  const [ bad, setBad ] = useState(0);
  const [ ratingCount, setRatingCount ] = useState(0);
  const [ avarage, setAvarage ] = useState(0);
  const [ positive, setPositive ] = useState(0);

  const increaseRatingCountByOne = () => setRatingCount(ratingCount + 1);

  const increaseGoodByOne = () => {
    increaseRatingCountByOne()
    setGood(good + 1);
    const newGood = good + 1;
    const newRatingCount = ratingCount + 1;
    setAvarage((newGood - bad) / newRatingCount);
    setPositive((newGood / newRatingCount) * 100);
  }
  const increaseNeutralByOne = () => {
    increaseRatingCountByOne()
    setNeutral(neutral + 1);
    const newRatingCount = ratingCount + 1;
    setAvarage((good - bad) / newRatingCount);
    setPositive((good / newRatingCount) * 100);
  }
  const increaseBadByOne = () => {
    increaseRatingCountByOne()
    setBad(bad + 1);
    const newBad = bad + 1;
    const newRatingCount = ratingCount + 1;
    setAvarage((good - newBad) / newRatingCount);
    setPositive((good / newRatingCount) * 100);
  } 

  return(
    <div>
      <h1>Give feedback</h1>
      <div>
        <RatingButton text="Good" handleCLick={increaseGoodByOne} />
        <RatingButton text="Neutral" handleCLick={increaseNeutralByOne} />
        <RatingButton text="Bad" handleCLick={increaseBadByOne} />
      </div>
      <Statistics good={good} neutral={neutral} bad={bad} ratingCount={ratingCount} avarage={avarage} positive={positive + "%"} />
    </div>
  )
}

export default App;
