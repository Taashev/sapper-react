export function createFields(size: number): number[] {
  const BOMB = -1;
  const fields = new Array(size * size).fill(0);

  function checkField(x: number, y: number) {
    if (x >= 0 && x < size && y >= 0 && y < size) {
      if (BOMB === fields[y * size + x]) return;
      fields[y * size + x] += 1;
    }
  }

  for (let i = 0; i < size * 2; i++) {
    const x = Math.floor(Math.random() * size);
    const y = Math.floor(Math.random() * size);

    if (fields[y * size + x] === BOMB) continue;

    fields[y * size + x] = BOMB;

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
