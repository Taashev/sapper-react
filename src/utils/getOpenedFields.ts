import { IField } from '../types/IField';
import { BOMB } from './constants';
import { isWithin } from './isWithin';

export function fieldOpen(
  x: number,
  y: number,
  size: number,
  fields: IField[],
  clearing?: [number, number][]
) {
  if (
    isWithin(x, y, size) &&
    fields[y * size + x].state === 'close' &&
    fields[y * size + x].value !== BOMB
  ) {
    fields[y * size + x].state = 'open';
    clearing?.push([x, y]);
  }
}

export function getOpenedFields(
  fields: IField[],
  x: number,
  y: number,
  size: number
): IField[] {
  const copyFields = JSON.parse(JSON.stringify(fields));
  const clearing: [number, number][] = [];

  fieldOpen(x, y, size, copyFields, clearing);

  if (
    fields[y * size + x].state === 'open' &&
    fields[y * size + x].value === 1
  ) {
    fieldOpen(x - 1, y, size, copyFields, clearing);
    fieldOpen(x + 1, y, size, copyFields, clearing);
    fieldOpen(x, y + 1, size, copyFields, clearing);
    fieldOpen(x, y - 1, size, copyFields, clearing);
    fieldOpen(x + 1, y - 1, size, copyFields, clearing);
    fieldOpen(x - 1, y - 1, size, copyFields, clearing);
    fieldOpen(x + 1, y + 1, size, copyFields, clearing);
    fieldOpen(x - 1, y + 1, size, copyFields, clearing);
  }

  while (clearing.length) {
    const [x, y] = clearing.pop()!!;
    const field = copyFields[y * size + x];

    if (field.value === 0) {
      fieldOpen(x + 1, y, size, copyFields, clearing);
      fieldOpen(x - 1, y, size, copyFields, clearing);
      fieldOpen(x, y + 1, size, copyFields, clearing);
      fieldOpen(x, y - 1, size, copyFields, clearing);
      fieldOpen(x + 1, y - 1, size, copyFields, clearing);
      fieldOpen(x - 1, y - 1, size, copyFields, clearing);
      fieldOpen(x + 1, y + 1, size, copyFields, clearing);
      fieldOpen(x - 1, y + 1, size, copyFields, clearing);
    }
  }

  return copyFields;
}
