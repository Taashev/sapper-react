import { IField } from '../types/IField';
import { BOMB } from './constants';
import { isWithin } from './isWithin';

export function createBomb(fields: IField[], size: number): IField[] {
  function checkField(x: number, y: number) {
    if (isWithin(x, y, size)) {
      const field = fields[y * size + x];
      if (BOMB === field.value) return;
      field.value += 1;
    }
  }

  for (let i = 0; i < 40; ) {
    const x = Math.floor(Math.random() * size);
    const y = Math.floor(Math.random() * size);
    const index = y * size + x;

    if (fields[index].value === BOMB) continue;

    fields[index].value = BOMB;

    i += 1;

    checkField(x + 1, y);
    checkField(x - 1, y);
    checkField(x, y + 1);
    checkField(x, y - 1);
    checkField(x + 1, y - 1);
    checkField(x - 1, y - 1);
    checkField(x + 1, y + 1);
    checkField(x - 1, y + 1);
  }

  return fields;
}
