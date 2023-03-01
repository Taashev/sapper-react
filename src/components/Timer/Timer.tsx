import { useState, useEffect } from 'react';
import { Number } from './Number/Number';
import style from './timer.module.css';

interface ITimerProps {
  m: number;
  type: string;
}

export function Timer({ m, type }: ITimerProps): JSX.Element {
  const [minute, setMinute] = useState(m);
  const [start, setStart] = useState(false);

  function reset() {
    setMinute(m);
    setStart(false);
  }

  useEffect(() => {
    let timer: NodeJS.Timeout;

    if (type === 'timer' && start) {
      timer = setTimeout(() => {
        setMinute((dev) => --dev);
      }, 60_000);
    }

    if (type === 'stopwatch' && start) {
      timer = setTimeout(() => {
        setMinute((dev) => ++dev);
      }, 1_000);
    }

    return () => clearTimeout(timer);
  }, [minute, start]);

  return (
    <div className={style.timer}>
      <Number number={minute.toString().padStart(3, '0')[0]} />
      <Number number={minute.toString().padStart(3, '0')[1]} />
      <Number number={minute.toString().padStart(3, '0')[2]} />
    </div>
  );
}
