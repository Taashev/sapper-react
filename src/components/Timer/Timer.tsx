import { useEffect } from 'react';
import { Number } from './Number/Number';
import style from './timer.module.css';

interface ITimerProps {
  time: number;
  setTime: React.Dispatch<React.SetStateAction<number>>;
  type: string;
  start: boolean;
}

export function Timer({
  time,
  setTime,
  type,
  start,
}: ITimerProps): JSX.Element {
  useEffect(() => {
    let timer: NodeJS.Timeout;

    if (type === 'timer' && start) {
      timer = setTimeout(() => {
        setTime((dev) => --dev);
      }, 60000);
    }

    if (type === 'stopwatch' && start) {
      timer = setTimeout(() => {
        setTime((dev) => ++dev);
      }, 1000);
    }

    return () => clearTimeout(timer);
  }, [time, start]);

  return (
    <div className={style.timer}>
      <Number number={time.toString().padStart(3, '0')[0]} />
      <Number number={time.toString().padStart(3, '0')[1]} />
      <Number number={time.toString().padStart(3, '0')[2]} />
    </div>
  );
}
