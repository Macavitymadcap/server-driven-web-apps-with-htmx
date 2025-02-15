import { join } from 'path';

type Sonnet = {
  number: number;
  text: string;
};

export class SonnetService {
  async getRandom(): Promise<Sonnet> {
    const sonnetNumber = Math.floor(Math.random() * 154) + 1;
    const path = join(__dirname, `data/${sonnetNumber}.txt`);
    const file = Bun.file(path);
    const sonnet = await file.text();

    return { number: sonnetNumber, text: sonnet.trim() };
  }
}
