import { useContext } from 'react';
import { ResetButtonContext } from '../../contexts/ResetButtonContext';
import sprite from '../../images/sprite.png';
import style from './reset.module.css';

interface IResetProps {
  onReset: () => void;
}

export function Reset({ onReset }: IResetProps): JSX.Element {
  const { resetButtonState, resetButtonDispatch } =
    useContext(ResetButtonContext);

  const { resetButtonImgPosition } = resetButtonState;

  function onMouseDown() {
    resetButtonDispatch({ type: 'press' });
  }

  function onMouseUp() {
    resetButtonDispatch({ type: 'smile' });
  }

  return (
    <button
      className={style.reset}
      onClick={onReset}
      onMouseDown={onMouseDown}
      onMouseUp={onMouseUp}
    >
      <img
        className={style.reset__img}
        src={sprite}
        alt="smile"
        style={{ transform: `translate(-${resetButtonImgPosition}px, -49px` }}
      />
    </button>
  );
}
