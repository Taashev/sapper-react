import { useEffect, useState } from 'react';
import sprite from '../../images/sprite.png';
import style from './number.module.css';

interface INumberState {
  number: string;
}

export function Number({ number }: INumberState): JSX.Element {
  const [position, setPosition] = useState<number>(268);

  function positionNumber(number: string) {
    switch (number) {
      case '1':
        return setPosition(0);
      case '2':
        return setPosition(30);
      case '3':
        return setPosition(60);
      case '4':
        return setPosition(90);
      case '5':
        return setPosition(119);
      case '6':
        return setPosition(149);
      case '7':
        return setPosition(179);
      case '8':
        return setPosition(208);
      case '9':
        return setPosition(238);
      default:
        return setPosition(268);
    }
  }

  useEffect(() => {
    positionNumber(number);
  }, [number]);

  return (
    <span className={style.number}>
      <img
        className={style.timer__img}
        src={sprite}
        alt={`${number}`}
        style={{ transform: `translateX(-${position}px)` }}
      />
    </span>
  );
}
