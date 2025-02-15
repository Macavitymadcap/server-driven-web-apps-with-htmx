import { type Context, Hono, Next } from 'hono';
import { serveStatic } from 'hono/bun';
import './sockets/reload-server';
import { Header, HeaderProps } from './components/Header';
import { Footer } from './components/Footer';

import { chapter1 } from './routes/chapter-1';
import { chapter3 } from './routes/chapter-3';
import { chapter4 } from './routes/chapter-4';
import { chapter6 } from './routes/chapter-6';
import { chapter7 } from './routes/chapter-7';
import { chapter8 } from './routes/chapter-8';
import { booksDb, conditionsDb } from './database';

const policies = [
  'report-uri /csp-report',
  "default-src 'self' 'unsafe-eval'",
  "connect-src 'self' https://jsonplaceholder.typicode.com ws:",
  'font-src https://fonts.googleapis.com https://fonts.gstatic.com',
  'img-src https://images.unsplash.com http://localhost:3000 https://raw.githubusercontent.com',
  'media-src http://commondatastorage.googleapis.com',
  "script-src-elem 'self' 'unsafe-inline' https://unpkg.com https://cdn.jsdelivr.net",
  "style-src-elem 'self' 'unsafe-inline' https://fonts.googleapis.com",
  "style-src-attr 'self' 'unsafe-inline'",
  "script-src-attr 'self' 'unsafe-inline'",
];

const csp = policies.join('; ');

const app = new Hono();

app.use('/*', (context: Context, next: Next) => {
  context.header('Content-Security-Policy', csp);

  const yearSeconds = 31536000;
  context.header(
    'Strict-Transport-Security',
    `max-age=${yearSeconds}; includeSubDomains`,
  );

  const fn = serveStatic({ root: 'public' });
  return fn(context, next);
});

app.post('/csp-report', async (context: Context) => {
  const json = await context.req.json();
  const report = json['csp-report'];
  let file = report['document-uri'];
  const origin = context.req.raw.headers.get('origin');
  if (file === origin + '/') file = 'index.html';
  console.error(
    `${file} attempted to access ${report['blocked-uri']} which violates the ${report['effective-directive']} csp directive`,
  );
  context.status(403);
  return context.text('CSP Violation');
});

app.get('/footer', (context: Context) => {
  return context.html(Footer());
});

app.get('/header', (context: Context) => {
  const values = context.req.query();
  return context.html(Header(values as unknown as HeaderProps));
});

app.route('chapter-1', chapter1);
app.route('chapter-3', chapter3);
app.route('chapter-4', chapter4);
app.route('chapter-6', chapter6);
app.route('chapter-7', chapter7);
app.route('chapter-8', chapter8);

// Safely close the database connection when the server is stopped
process.on('SIGINT', () => {
  booksDb.close();
  conditionsDb.close();
  process.exit();
});

process.on('SIGTERM', () => {
  booksDb.close();
  conditionsDb.close();
  process.exit();
});

export default app;
