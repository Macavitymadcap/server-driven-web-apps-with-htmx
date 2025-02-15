import { type Context, Hono } from 'hono';
import { heapStats } from 'bun:jsc';
import { Chip } from '../components/Chip';
import { Quote } from '../components/Quote';
import { quoteService } from '../services';

export const chapter6 = new Hono();

chapter6.post('/register', async (context: Context) => {
  const formData = await context.req.formData();
  const name = formData.get('name') || '';
  const age = Number(formData.get('age')) || 0;
  const message = `User ${name} of age ${age} has been submitted`;

  return context.html(Chip({ message, selfDestruct: true }));
});

chapter6.get('/heap-size', (context: Context) => {
  const stats = heapStats();

  return context.text((stats.heapSize / 1024 / 1024).toFixed(4));
});

chapter6.get('/time/:count', async (context: Context) => {
  const count = context.req.param('count');
  const time = new Date().toLocaleTimeString('en-gb');

  return context.text(`The count at ${time} was ${count}`);
});

chapter6.get('/quote', async (context: Context) => {
  const quote = await quoteService.fetch();

  return context.html(Quote(quote));
});
