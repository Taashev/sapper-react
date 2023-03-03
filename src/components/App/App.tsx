import { useReducer, useState, useEffect } from 'react';

import { ResetButtonContext } from '../../contexts/ResetButtonContext';

import {
  resetButtonInitialState,
  resetButtonReducer,
} from '../../reducers/resetButtonReducer';

import { Timer } from '../Timer/Timer';
import { Reset } from '../Reset/Reset';
import { Field } from '../Field/Field';
import { Overlay } from '../Overlay/Overlay';

import { createFields } from '../../utils/createFields';

import style from './app.module.css';

function App() {
  const initialFields = new Array(16 * 16).fill(0);

  const [start, setStart] = useState(false);
  const [gameState, setGameState] = useState('default');
  const [firstClick, setFirstClick] = useState(true);
  const [timer, setTimer] = useState(40);
  const [stopwatch, setStopwatch] = useState(0);
  const [fields, setFields] = useState(createFields(16));

  const [resetButtonState, resetButtonDispatch] = useReducer(
    resetButtonReducer,
    resetButtonInitialState
  );

  function reset() {
    setStart(false);
    setTimer(40);
    setStopwatch(0);
    setFields(initialFields);
  }

  function onStart() {
    if (!start) {
      setStart(true);
      setFields(createFields(16));
    }
  }

  return (
    <ResetButtonContext.Provider
      value={{ resetButtonState, resetButtonDispatch }}
    >
      <div className={style.app}>
        <section className={style.sapper}>
          <header className={style.header}>
            <Timer time={timer} setTime={setTimer} type="timer" start={start} />
            <Reset onReset={reset} />
            <Timer
              time={stopwatch}
              setTime={setStopwatch}
              type="stopwatch"
              start={start}
            />
          </header>
          <div
            className={style.minefield}
            style={{
              gridTemplateColumns: `repeat(${16}, calc(var(--offset-base-size) * 8))`,
            }}
          >
            {gameState === 'winner' || (gameState === 'lost' && <Overlay />)}
            {fields.map((value, index) => {
              return (
                <Field
                  key={index}
                  index={index}
                  value={value}
                  onStart={onStart}
                  setStart={setStart}
                  setGameState={setGameState}
                />
              );
            })}
          </div>
        </section>
      </div>
    </ResetButtonContext.Provider>
  );
}

export default App;
