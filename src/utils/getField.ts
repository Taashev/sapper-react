import { IField } from '../types/IField';

export function getField(
  x: number,
  y: number,
  size: number,
  fields: IField[]
): IField {
  return fields[y * size + x];
}
