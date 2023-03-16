import { useState, useEffect } from 'react';

import { BOMB, SIZE } from '../../utils/constants';
import { generateFields } from '../../utils/generateFields';
import { getOpenedFields } from '../../utils/getOpenedFields';

import { IField } from '../../types/IField';
import { TResetButton } from '../../types/TResetButton';

import style from './field.module.css';

interface IFieldProps {
  field: IField;
  fields: IField[];
  setFields: React.Dispatch<React.SetStateAction<IField[]>>;
  onStart: any;
  setResetButtonState: React.Dispatch<React.SetStateAction<TResetButton>>;
  gameOver: (fieldIgnore: IField) => void;
  winner: () => void;
  flagCounter: number;
  setFlagCount: React.Dispatch<React.SetStateAction<number>>;
}

export function Field({
  field,
  fields,
  setFields,
  onStart,
  setResetButtonState,
  gameOver,
  winner,
  flagCounter,
  setFlagCount,
}: IFieldProps): JSX.Element {
  const [imgPosition, setImgPosition] = useState({ x: 0, y: 98 });

  const { value, coordinates, state } = field;

  function isWinner(fields: IField[]): boolean {
    const fieldsIsNotBomb = fields.filter((i) => i.value !== BOMB);
    return fieldsIsNotBomb.every((i) => i.state === 'open');
  }

  function onClick() {
    const isFirstClick = fields.every((i) => i.state === 'close');

    while (isFirstClick && BOMB === field.value) {
      fields = generateFields(SIZE);
      field = fields[coordinates.y * SIZE + coordinates.x];
    }

    if ('close' === state) {
      onStart();

      const openedFields = getOpenedFields(
        fields,
        coordinates.x,
        coordinates.y,
        SIZE
      );

      if (isWinner(openedFields)) {
        winner();
      }

      setFields(openedFields);

      if (!isFirstClick && BOMB === value) {
        gameOver(field);
      }

      return;
    }

    if ('open' === state && 1 === value) {
      const openedFields = getOpenedFields(
        fields,
        coordinates.x,
        coordinates.y,
        SIZE
      );
      setFields(openedFields);
    }
  }

  function onMouseDown(e: React.MouseEvent<HTMLButtonElement, MouseEvent>) {
    if (e.button === 0 && 'close' === state) {
      setResetButtonState('wow');
    }
  }

  function onMouseUp(e: React.MouseEvent<HTMLButtonElement, MouseEvent>) {
    if (e.button === 0 && 'close' === state) {
      setResetButtonState('smile');
    }
  }

  function onContextMenu(e: React.MouseEvent<HTMLButtonElement, MouseEvent>) {
    e.preventDefault();

    const copyFields = JSON.parse(JSON.stringify(fields));
    const field = copyFields[coordinates.y * SIZE + coordinates.x];

    if (field.state === 'open') return;

    if (field.state === 'close' && 0 <= flagCounter - 1) {
      field.state = 'flag';
      setFlagCount(flagCounter - 1);
    } else if (
      field.state === 'flag' ||
      (field.state === 'close' && 0 <= flagCounter - 1)
    ) {
      field.state = 'question';
      setFlagCount(flagCounter + 1);
    } else {
      field.state = 'close';
    }

    setFields(copyFields);
  }

  useEffect(() => {
    if (state === 'open') {
      if (BOMB === value) return setImgPosition({ x: 169, y: 97 });
      if (0 === value) return setImgPosition({ x: 35, y: 98 });
      if (1 === value) return setImgPosition({ x: 1, y: 130 });
      if (2 === value) return setImgPosition({ x: 35, y: 130 });
      if (3 === value) return setImgPosition({ x: 68, y: 130 });
      if (4 === value) return setImgPosition({ x: 102, y: 130 });
      if (5 === value) return setImgPosition({ x: 135, y: 130 });
      if (6 === value) return setImgPosition({ x: 168, y: 130 });
      if (7 === value) return setImgPosition({ x: 205, y: 130 });
      if (8 === value) return setImgPosition({ x: 235, y: 130 });
    } else {
      if ('flag' === state) return setImgPosition({ x: 67, y: 98 });
      if ('question' === state) return setImgPosition({ x: 101, y: 98 });
      if ('harmless' === state) return setImgPosition({ x: 236, y: 98 });
      if ('explosion' === state) return setImgPosition({ x: 203, y: 97 });
      return setImgPosition({ x: 0, y: 98 });
    }
  }, [state, value]);

  return (
    <button
      className={style.field}
      style={{
        backgroundPosition: `-${imgPosition.x}px -${imgPosition.y}px`,
      }}
      onClick={onClick}
      onMouseDown={onMouseDown}
      onMouseUp={onMouseUp}
      onContextMenu={onContextMenu}
    ></button>
  );
}
