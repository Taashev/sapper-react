import { IField } from '../types/IField';
import { SIZE } from './constants';

export function getOpenedFields(
  fields: IField[],
  x: number,
  y: number
): IField[] {
  const copyFields = JSON.parse(JSON.stringify(fields));
  const clearing: [number, number][] = [];

  function clear(x: number, y: number) {
    if (x >= 0 && x < SIZE && y >= 0 && y < SIZE) {
      if (copyFields[y * SIZE + x].state !== 'close') return;

      clearing.push([x, y]);
    }
  }

  clear(x, y);

  while (clearing.length) {
    const [x, y] = clearing.pop()!!;

    copyFields[y * SIZE + x].state = 'open';

    if (copyFields[y * SIZE + x].value !== 0) continue;

    clear(x + 1, y);
    clear(x - 1, y);
    clear(x, y + 1);
    clear(x, y - 1);
    clear(x + 1, y - 1);
    clear(x - 1, y - 1);
    clear(x + 1, y + 1);
    clear(x - 1, y + 1);
  }

  return copyFields;
}
