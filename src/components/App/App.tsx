import { useState } from 'react';

import { TResetButton } from '../../types/TResetButton';
import { IField } from '../../types/IField';

import { FlagCounter } from '../FlagCounter/FlagCounter';
import { Stopwatch } from '../Stopwatch/Stopwatch';
import { ResetButton } from '../ResetButton/ResetButton';
import { Field } from '../Field/Field';
import { Overlay } from '../Overlay/Overlay';

import { BOMB, SIZE } from '../../utils/constants';
import { generateFields } from '../../utils/generateFields';

import style from './app.module.css';

function App() {
  const [fields, setFields] = useState(generateFields(SIZE));
  const [start, setStart] = useState(false);
  const [time, setTime] = useState(0);
  const [flagCounter, setFlagCount] = useState(40);
  const [resetButtonState, setResetButtonState] =
    useState<TResetButton>('smile');

  function reset() {
    setFields(generateFields(SIZE));
    setStart(false);
    setTime(0);
    setFlagCount(40);
  }

  function gameOver(explosionField: IField) {
    setStart(false);
    setResetButtonState('lost');
    setFields(
      fields.map((i) => {
        if (
          i.state === 'flag' &&
          i.value === BOMB &&
          explosionField.id !== i.id
        ) {
          i.state = 'harmless';
        } else if (
          i.state === 'close' &&
          i.value === BOMB &&
          explosionField.id !== i.id
        ) {
          i.state = 'open';
        } else if (explosionField.id === i.id) {
          i.state = 'explosion';
        }
        return i;
      })
    );
  }

  function winner() {
    setStart(false);
    setResetButtonState('winner');
  }

  function onStart() {
    if (!start) {
      setStart(true);
    }
  }

  return (
    <div className={style.app}>
      <section className={style.sapper}>
        <header className={style.header}>
          <FlagCounter flagCounter={flagCounter} />
          <ResetButton
            onReset={reset}
            state={resetButtonState}
            setState={setResetButtonState}
          />
          <Stopwatch
            time={time}
            setTime={setTime}
            start={start}
            setStart={setStart}
          />
        </header>
        <div
          className={style.minefield}
          style={{
            gridTemplateColumns: `repeat(${SIZE}, calc(var(--offset-base-size) * 8))`,
          }}
        >
          {resetButtonState === 'lost' && <Overlay />}
          {resetButtonState === 'winner' && <Overlay />}
          {fields.map((field) => {
            return (
              <Field
                key={field.id}
                field={field}
                fields={fields}
                setFields={setFields}
                onStart={onStart}
                setResetButtonState={setResetButtonState}
                gameOver={gameOver}
                winner={winner}
                flagCounter={flagCounter}
                setFlagCount={setFlagCount}
              />
            );
          })}
        </div>
      </section>
    </div>
  );
}

export default App;
