type RandomQuote = {
    id: string;
    text: string;
    author: {
      id: string;
      name: string;
    };
};

type Quote = {
  author: string;
  text: string;
};

export class QuoteService {
  private _url = 'https://quoterism.com/api/quotes/random';

  async fetch(): Promise<Quote> {
    const request = await fetch(this._url);
    const response = (await request.json()) as RandomQuote;

    return { author: response.author.name, text: response.text };
  }
}
