export class DiceService {
  rollDie(faces: number): number {
    return Math.floor(Math.random() * faces) + 1;
  }
}
