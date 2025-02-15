import { type Context, Hono } from 'hono';
import { streamSSE } from 'hono/streaming';

export const chapter8 = new Hono();

chapter8.get('/countdown', (context: Context) => {
  const start = context.req.query('start');

  return streamSSE(context, async stream => {
    let count = Number(start);

    if (isNaN(count)) {
      await stream.writeSSE({
        event: 'error',
        data: 'start query parameter must be a number',
      });
      return;
    }

    while (count >= 0) {
      await stream.writeSSE({
        event: 'count',
        data: String(count),
      });
      await Bun.sleep(1000);
      count--;
    }
  });
});

let number = -1;

chapter8.get('/start', (context: Context) => {
  number = Number(context.req.query('start'));
  return context.body(null);
});

chapter8.get('/htmx-countdown', (context: Context) => {
  return streamSSE(context, async stream => {
    while (number > -1) {
      if (number >= 0) {
        const jsx = <div>{number}</div>;
        await stream.writeSSE({
          event: 'count',
          id: String(crypto.randomUUID()),
          data: jsx.toString(),
        });
        number--;
      }
      await stream.sleep(1000);
    }
  });
});