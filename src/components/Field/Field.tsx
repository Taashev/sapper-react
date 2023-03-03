import { useState, useContext, useEffect } from 'react';
import { ResetButtonContext } from '../../contexts/ResetButtonContext';
import style from './field.module.css';

interface IFieldProps {
  value: number;
  index: number;
  onStart: any;
  setStart: React.Dispatch<React.SetStateAction<boolean>>;
  setGameState: React.Dispatch<React.SetStateAction<string>>;
}

export function Field({
  value,
  onStart,
  setStart,
  setGameState,
}: IFieldProps): JSX.Element {
  const [isOpen, setIsOpen] = useState(false);
  const [imgPosition, setImgPosition] = useState({ x: 0, y: 98 });
  const { resetButtonDispatch } = useContext(ResetButtonContext);

  function onClick() {
    onStart();
    setIsOpen(true);
    if (-1 === value) {
      setStart(false);
      setGameState('lost');
      resetButtonDispatch({ type: 'lost' });
      return setImgPosition({ x: 203, y: 97 });
    }
  }

  function onMouseDown() {
    !isOpen && setImgPosition({ x: 35, y: 98 });
    !isOpen && resetButtonDispatch({ type: 'wow' });
  }

  function onMouseUp() {
    !isOpen && resetButtonDispatch({ type: 'smile' });
  }

  useEffect(() => {
    if (isOpen) {
      if (-1 === value) setImgPosition({ x: 203, y: 97 });
      if (1 === value) setImgPosition({ x: 0, y: 131 });
      if (2 === value) setImgPosition({ x: 35, y: 131 });
      if (3 === value) setImgPosition({ x: 70, y: 131 });
      if (4 === value) setImgPosition({ x: 102, y: 131 });
      if (5 === value) setImgPosition({ x: 135, y: 131 });
      if (6 === value) setImgPosition({ x: 168, y: 131 });
    } else {
      setImgPosition({ x: 0, y: 98 });
    }
  }, [isOpen]);

  return (
    <button
      className={style.field}
      style={{
        backgroundPosition: `-${imgPosition.x}px -${imgPosition.y}px`,
      }}
      onClick={onClick}
      onMouseDown={onMouseDown}
      onMouseUp={onMouseUp}
    ></button>
  );
}
