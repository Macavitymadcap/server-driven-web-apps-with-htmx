let tuneSquadScore = 0;
let monstersScore = 0;

const coinToss = () => Math.floor(Math.random() * 2);

const getPoints = () => {
  const howMuch = coinToss();
  return howMuch > 0 ? 3 : 2;
}

const incrementScore = () => {
  const whoScored = coinToss();
  if (whoScored) {
    tuneSquadScore += getPoints();
  } else {
    monstersScore += getPoints();
  }
}

const getRandomSecondsInMilliseconds = () => Math.floor(Math.random() * 5) * 1000;

const sendScore = async (ws: WebSocket) => {
  incrementScore();
  const html = <span id="htmx-ws-basketball-scores">{`Tune Squad: ${tuneSquadScore} - Monsters ${monstersScore}`}</span>;
  ws.send(html.toString());
  await Bun.sleep(getRandomSecondsInMilliseconds());
}

const wsServer = Bun.serve({
  port: 3004,
  fetch(req, server) {
    if (server.upgrade(req)) return;
    return new Response('WebSocket upgrade failed', { status: 500 });
  },
  websocket: {
    message(ws, message) {
      try {
        sendScore(ws);
      } catch (error) {
        console.error(error);
      }
    },
  },
});

console.log(`htmx WebSocket listening on port: ${wsServer.port}`);
