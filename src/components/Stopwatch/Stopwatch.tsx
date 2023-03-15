import { useEffect } from 'react';
import { Number } from '../Number/Number';
import style from './stopwatch.module.css';

interface IStopwatch {
  start: boolean;
  setStart: React.Dispatch<React.SetStateAction<boolean>>;
  time: number;
  setTime: React.Dispatch<React.SetStateAction<number>>;
}

export function Stopwatch({
  start,
  setStart,
  time,
  setTime,
}: IStopwatch): JSX.Element {
  useEffect(() => {
    let timer: NodeJS.Timeout;
    if (start) {
      timer = setTimeout(() => {
        setTime((dev) => ++dev);
      }, 1000);

      if (999 <= time) {
        setStart(false);
      }
    }
    return () => clearTimeout(timer);
  }, [start, time]);

  return (
    <div className={style.timer}>
      <Number number={time.toString().padStart(3, '0')[0]} />
      <Number number={time.toString().padStart(3, '0')[1]} />
      <Number number={time.toString().padStart(3, '0')[2]} />
    </div>
  );
}
