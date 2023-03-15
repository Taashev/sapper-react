import { Number } from '../Number/Number';
import style from './flagCounter.module.css';

interface IFlagCounterProps {
  flagCounter: number;
}

export function FlagCounter({ flagCounter }: IFlagCounterProps): JSX.Element {
  return (
    <div className={style.counter}>
      <Number number={flagCounter.toString().padStart(3, '0')[0]} />
      <Number number={flagCounter.toString().padStart(3, '0')[1]} />
      <Number number={flagCounter.toString().padStart(3, '0')[2]} />
    </div>
  );
}
