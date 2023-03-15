import { IField } from '../types/IField';
import { BOMB } from './constants';

export function createBomb(fields: IField[], size: number): IField[] {
  function checkField(x: number, y: number) {
    if (x >= 0 && x < size && y >= 0 && y < size) {
      if (BOMB === fields[y * size + x].value) return;
      fields[y * size + x].value += 1;
    }
  }

  for (let i = 0; i <= 40; i++) {
    const x = Math.floor(Math.random() * size);
    const y = Math.floor(Math.random() * size);
    const index = y * size + x;

    if (fields[index].value === BOMB) continue;

    fields[index].value = BOMB;

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
