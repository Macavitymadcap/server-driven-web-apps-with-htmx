export type Beatle = 'John' | 'Paul' | 'George' | 'Ringo';

export class BeatleService {
  private _beatles = ['John', 'Paul', 'George', 'Ringo'] as const;
  private _selectedBeatle = '';
  private _togglePath = 'chapter-4/toggle-beatle';

  get beatles() {
    return this._beatles;
  }

  get selectedBeatle() {
    return this._selectedBeatle;
  }

  set selectedBeatle(beatle: string) {
    if (
      typeof beatle !== 'string' ||
      !this._beatles.includes(beatle as Beatle)
    ) {
      throw new Error(`Invalid beatle: ${beatle}`);
    }

    this._selectedBeatle = beatle;
  }

  get togglePath() {
    return this._togglePath;
  }
}
