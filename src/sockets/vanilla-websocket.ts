const wsServer = Bun.serve({
  port: 3002,
  fetch(req, server) {
    if (server.upgrade(req)) return;
    return new Response('WebSocket upgrade failed', { status: 500 });
  },
  websocket: {
    open(ws) {
      console.log('WebSocket is open.');
    },
    message(ws, message) {
      console.log(`Received message: ${message}`);
      if (message === 'stop') {
        ws.close();
      } else {
        ws.send(`Thank you for sending '${message}'`);
      }
    },
    close(ws, code, message) {
      console.log(`WebSocket closed with code ${code}`);
      if (message) {
        console.log(`WebSocket closed with message: ${message}`);
      }
    },
  },
});

console.log(`vanilla WebSocket listenting on ${wsServer.port}`);
