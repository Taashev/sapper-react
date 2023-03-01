import { useEffect, useState } from 'react';
import sprite from '../../images/sprite.png';
import style from './reset.module.css';

interface IResetProps {
  onClick: () => void;
}

export function Reset({ onClick }: IResetProps): JSX.Element {
  const [imgPosition, setImgPosition] = useState(0);

  function onMouseDown() {
    setImgPosition(55);
  }

  function onMouseUp() {
    setImgPosition(0);
  }

  return (
    <button
      className={style.reset}
      onClick={onClick}
      onMouseDown={onMouseDown}
      onMouseUp={onMouseUp}
    >
      <img
        className={style.reset__img}
        src={sprite}
        alt="smile"
        style={{ transform: `translate(-${imgPosition}px, -49px` }}
      />
    </button>
  );
}
