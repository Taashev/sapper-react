import { useEffect, useState } from 'react';
import sprite from '../../images/sprite.png';
import { TResetButton } from '../../types/TResetButton';
import style from './resetButton.module.css';

interface IResetProps {
  onReset: () => void;
  state: TResetButton;
  setState: React.Dispatch<React.SetStateAction<TResetButton>>;
}

export function ResetButton({
  onReset,
  state,
  setState,
}: IResetProps): JSX.Element {
  const [imgPosition, setImgPosition] = useState(0);

  function onMouseDown() {
    setState('press');
  }

  function onMouseUp() {
    setState('smile');
  }

  useEffect(() => {
    switch (state) {
      case 'smile':
        return setImgPosition(0);
      case 'press':
        return setImgPosition(55);
      case 'winner':
        return setImgPosition(164);
      case 'lost':
        return setImgPosition(219);
      case 'wow':
        return setImgPosition(110);
      default:
        setImgPosition(0);
    }
  }, [state]);

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
        style={{ transform: `translate(-${imgPosition}px, -49px` }}
      />
    </button>
  );
}
