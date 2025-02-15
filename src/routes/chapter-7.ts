import { type Context, Hono } from 'hono';
import { html } from 'hono/html';

export const chapter7 = new Hono();

chapter7.get('/version', (c: Context) => {
  const storedContent = '<script>alert("XSS!");</script>';
  const escaped = html`v${Bun.version} ${storedContent}`;
  return c.html(escaped);
});
