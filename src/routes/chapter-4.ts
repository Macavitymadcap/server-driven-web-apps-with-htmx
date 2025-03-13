import { Context, Hono } from 'hono';
import {
  beatlesService,
  dogsService,
  monstersService,
  pokemonService,
  progressService,
  sportsballService,
  usersService,
  validationService,
} from '../services';
import { Chip } from '../components/Chip';
import { conditionsDb } from '../database';
import { ConditionsRow } from '../components/ConditionsRow';
import { List } from '../components/List';
import { DogRows } from '../components/DogRows';
import { PaginatedPokeTable } from '../components/pokemon/PaginatedPokeTable';
import { InfinitePokeRows } from '../components/pokemon/InfinitePokeRows';
import { SelectableButtonRow } from '../components/selectable-button-row/SelectableButtonRow';
import { SelectableButton } from '../components/selectable-button-row/SelectableButton';
import { ToggleSelectedButton } from '../components/selectable-button-row/ToggleSelectedButton';
import { StatusCode } from 'hono/utils/http-status';
import { SportsBallScores } from '../components/SportsBallScores';
import { CustomProgressBar } from '../components/progress-bar/CustomProgressBar';
import { NativeProgressBar } from '../components/progress-bar/NativeProgressBar';
import { UsersTable } from '../components/UsersTable';

export const chapter4 = new Hono();

chapter4.get('/users', async (context: Context) => {
  const users = await usersService.fetch();

  return context.html(UsersTable({ users }));
});

chapter4.get('/email-validate', (context: Context) => {
  const email = context.req.query('email') || '';
  const isValid = validationService.isValidEmail(email);

  return context.text(isValid ? '&#9989;' : '&#10060;');
});

chapter4.get('/password-validate', (context: Context) => {
  const password = context.req.query('password') || '';
  const isValid = validationService.isStrongPassword(password);

  return context.text(isValid ? '&#9989;' : '&#10060;');
});

chapter4.post('/api-validation', async (c: Context) => {
  Bun.sleepSync(1000); // Simulate slow network

  const formData = await c.req.formData();
  const email = (formData.get('email') as string) || '';
  const password = (formData.get('password') as string) || '';

  const validEmail = validationService.isValidEmail(email);
  const strongPassword = validationService.isStrongPassword(password);
  const message =
    validEmail && strongPassword
      ? 'Succesfully logged into nowhere'
      : 'Acces Denied: Email and/or password invalid';

  return c.html(Chip({ message, selfDestruct: true }));
});

chapter4.post('/reset-conditions-form', async (context: Context) => {
  const formData = await context.req.formData();
  const condition = (formData.get('condition') as string) || '';

  return context.html(Chip({ message: condition, deleteable: true }));
});

chapter4.get('/conditions', (context: Context) => {
  const conditions = conditionsDb.readAll();

  return context.html(ConditionsRow({ conditions }));
});

chapter4.delete('/condition/:id', (context: Context) => {
  const id = context.req.param('id');
  conditionsDb.delete(id);

  return context.body(null);
});

chapter4.post('search-monsters', async (context: Context) => {
  const formData = await context.req.formData();
  const query = (formData.get('search') as string) || '';

  if (query === '') {
    return context.html('');
  }

  const monsters = monstersService.search(query);

  return context.html(List({ items: monsters }));
});

chapter4.get('dog-rows', (context: Context) => {
  const breeds = dogsService.breeds;

  return context.html(DogRows({ breeds }));
});

chapter4.put('/dog/:breed', async (context: Context) => {
  Bun.sleepSync(1000); // Simulate slow network
  const breed = context.req.param('breed');
  const dogs = dogsService.dogs;
  const like = !(dogs.get(breed) ?? false);
  dogs.set(breed, like);

  return context.html(dogsService.getHeart(like));
});

chapter4.get('/paginated-poke-rows', async (context: Context) => {
  const page = Number(context.req.query('page'));
  if (!page) throw new Error('Page Qquery parameter is required');
  const rowsPerPage = 5;
  const pokemon = await pokemonService.fetch(page, rowsPerPage);

  return context.html(
    PaginatedPokeTable({ pokeList: pokemon, rowsPerPage, page }),
  );
});

chapter4.get('/infinite-poke-rows', async (context: Context) => {
  const page = Number(context.req.query('page'));
  if (!page) throw new Error('Page Query parameter is required');
  const rowsPerPage = 10;
  const pokemon = await pokemonService.fetch(page, rowsPerPage);

  return context.html(
    InfinitePokeRows({ pokeList: pokemon, page, rowsPerPage }),
  );
});

chapter4.get('beatles', (context: Context) => {
  const beatles = beatlesService.beatles;

  return context.html(
    SelectableButtonRow({
      buttons: beatles,
      togglePath: beatlesService.togglePath,
    }),
  );
});

chapter4.get('/toggle-beatle/:beatle', async (context: Context) => {
  const name = context.req.param('beatle');
  const isDeselecting = name === beatlesService.selectedBeatle;
  const previous = beatlesService.selectedBeatle
    ? await SelectableButton({
        name: beatlesService.selectedBeatle,
        togglePath: beatlesService.togglePath,
        toggle: true,
      })
    : null;

  const current = await SelectableButton({
    name,
    togglePath: beatlesService.togglePath,
    toggle: true,
    isSelected: !isDeselecting,
  });

  // If the selected beatle is clicked again it is deselected
  beatlesService.selectedBeatle =
    name === beatlesService.selectedBeatle ? '' : name;

  return context.html(ToggleSelectedButton({ previous, current }));
});

chapter4.get('/score', (context: Context) => {
  sportsballService.getScore();
  // 286 is a htmx specific status code that cancels polling
  context.status(
    sportsballService.score1 > 30 || sportsballService.score2 > 30
      ? (286 as StatusCode)
      : 200,
  );

  return context.html(
    SportsBallScores({
      team1: sportsballService.team1,
      team2: sportsballService.team2,
      score1: sportsballService.score1,
      score2: sportsballService.score2,
    }),
  );
});

chapter4.get('/custom-progress-bar', (context: Context) => {
  return context.html(CustomProgressBar({ percentCompleteCustom: 0 }));
});

chapter4.get('/custom-progress', (context: Context) => {
  const trigger = context.req.header('hx-trigger');
  if (trigger === 'custom-reset-button') {
    progressService.customCompletionPercentage = 0;
  } else {
    progressService.updateCustomCompletionPercentage();
  }

  return context.html(
    CustomProgressBar({
      percentCompleteCustom: progressService.customCompletionPercentage,
    }),
  );
});

chapter4.get('/native-progress', (context: Context) => {
  const trigger = context.req.header('hx-trigger');
  if (trigger === 'native-reset-button') {
    progressService.nativeCompletionPercentage = 0;
  } else {
    progressService.updateNativeCompletionPercentage();
  }

  return context.html(
    NativeProgressBar({
      percentCompleteNative: progressService.nativeCompletionPercentage,
    }),
  );
});

chapter4.get('/do-thing', (context: Context) => {
  return context.text('You Done The Thing. Naughty naughty naughty!');
});

chapter4.get('/request1', (context: Context) => {
  const token = context.req.header('x-token');
  return context.text(`/request1 received the token: ${token}`);
});

chapter4.get('/request2', (context: Context) => {
  const token = context.req.header('x-token');
  return context.text(`/request2 received the token: ${token}`);
});
