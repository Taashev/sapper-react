import { useEffect, useState } from 'react';

import { Timer } from '../Timer/Timer';
import { Reset } from '../Reset/Reset';

import style from './app.module.css';

function App() {
  const [startTimer, setStartTimer] = useState(false);
  const [timeTimer, setTimeTimer] = useState(40);
  const [timeStopwatch, setTimeStopwatch] = useState(0);

  function reset() {
    setTimeTimer(40);
    setTimeStopwatch(0);
    setStartTimer(false);
  }

  return (
    <div className={style.app}>
      <section className={style.sapper}>
        <header className={style.header}>
          <Timer
            time={timeTimer}
            setTime={setTimeTimer}
            type="timer"
            start={startTimer}
          />
          <Reset onClick={reset} />
          <Timer
            time={timeStopwatch}
            setTime={setTimeStopwatch}
            type="stopwatch"
            start={startTimer}
          />
        </header>
        <div className={style.minefield}></div>
      </section>
    </div>
  );
}

export default App;
