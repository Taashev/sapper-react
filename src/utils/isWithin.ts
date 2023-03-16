export function isWithin(x: number, y: number, size: number): boolean {
  return x >= 0 && x < size && y >= 0 && y < size;
}
