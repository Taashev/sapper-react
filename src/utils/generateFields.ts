import { IField } from '../types/IField';
import { createBomb } from './createBomb';

export function generateFields(size: number): IField[] {
  const fields = new Array(size * size);

  let x = -1;
  let y = 0;

  for (let i = 0; i < fields.length; i++) {
    if (x > 14) {
      x = -1;
      y += 1;
    }
    fields[i] = {
      id: i,
      value: 0,
      coordinates: { x: (x += 1), y: y },
      state: 'close',
    };
  }

  createBomb(fields, size);

  return fields;
}
