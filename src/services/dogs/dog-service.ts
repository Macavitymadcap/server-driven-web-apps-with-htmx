export class DogService {
  private _breeds = [
    'Beagle',
    'Bulldog',
    'Daschund',
    'French Bulldog',
    'German Shepard',
    'German Shorthaired Pointer',
    'Golden Retriever',
    'Labrador',
    'Poodle',
    'Rottweiler',
    'Whippet',
  ] as const;

  private _dogs = new Map<string, boolean>();

  constructor() {
    for (const breed of this._breeds) {
      this._dogs.set(breed, false);
    }
  }

  get breeds() {
    return this._breeds;
  }

  get dogs() {
    return this._dogs;
  }

  getHeart(like: boolean) {
    return like ? '❤️' : '🤍';
  }
}
