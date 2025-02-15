const countdown = async (ws: WebSocket, start: number) => {
  let count = start;
  while (count >= 0) {
    const html = <span id="htmx-ws-countdown">{count}</span>;
    ws.send(html.toString());
    await Bun.sleep(1000);
    count--;
  }
};

const wsServer = Bun.serve({
  port: 3003,
  fetch(req, server) {
    if (server.upgrade(req)) return;
    return new Response('WebSocket upgrade failed', { status: 500 });
  },
  websocket: {
    message(ws, message) {
      try {
        const data = JSON.parse(message as string);
        countdown(ws, Number(data.start));
      } catch (error) {
        console.error(error);
      }
    },
  },
});

console.log(`htmx WebSocket listening on port: ${wsServer.port}`);
