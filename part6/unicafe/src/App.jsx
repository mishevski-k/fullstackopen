import React from 'react'
import ReactDOM from 'react-dom/client'
import {createStore} from 'redux';
import counterReducer from './reducers/counter';
import RatingButton from './compontents/RatingButton';
import Stats from './compontents/Stats';

const store = createStore(counterReducer);

const App = () => {
  console.log(store.getState());
  return(
    <div>
      <div>
        <RatingButton text="Good" handleCLick={() => store.dispatch({type: 'GOOD'})}/>
        <RatingButton text="Neutral" handleCLick={() => store.dispatch({type: 'OK'})}/>
        <RatingButton text="Bad" handleCLick={() => store.dispatch({type: 'BAD'})}/>
        <RatingButton text="reset stats" handleCLick={() => store.dispatch({type: 'ZERO'})}/>
      </div>
      <Stats stats={store.getState()} />
    </div>
  );
};

const root = ReactDOM.createRoot(document.getElementById('root'))

const renderApp = () => {
	root.render(<App />);
}

renderApp()
store.subscribe(renderApp)