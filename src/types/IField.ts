export interface IField {
  id: number;
  value: number;
  coordinates: { x: number; y: number };
  state: 'close' | 'open' | 'flag' | 'question' | 'cleared';
}
