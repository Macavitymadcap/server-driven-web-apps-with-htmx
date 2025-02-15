export interface Pokemon {
  name: string;
  url: string;
}

export class PokemonService {
  private _urlPrefix = 'https://pokeapi.co/api/v2/pokemon-species';

  async fetch(page: number, rowsPerPage: number): Promise<Pokemon[]> {
    Bun.sleepSync(500); // Simulate long running query

    const offset = (page - 1) * rowsPerPage;
    const url = `${this._urlPrefix}?offset=${offset}&limit=${rowsPerPage}`;
    const response = await fetch(url);
    const json = await response.json();
    return json.results as Pokemon[];
  }
}
