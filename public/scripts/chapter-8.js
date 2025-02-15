let ws;

const connectWebSocket = () => {
  console.log('Attempting WebSocket connection ...');
  ws = new WebSocket('ws://localhost:3002');

  ws.onopen = () => {
    console.log('WebSocket connection was opened');
    ws.send('Hello from the Client!');
  };

  ws.onmessage = event => {
    const received = document.getElementById('received');
    received.textContent = event.data;
  };

  ws.onerror = error => {
    console.error(`WebSocket error: ${error}`);
  };

  ws.onclose = () => {
    console.log('Websocket connection was closed');
    setTimeout(connectWebSocket, 2000);
  };
};

connectWebSocket();

const closeWebSocket = () => {
  ws.close();
};

const sendWebSocket = (event, message) => {
  ws.send(message);
  const form = event.target;
  form.reset();
};

let countdown, eventSource;

function connectSSE(event) {
  event.preventDefault();
  countdown.innerHTML = '';
  if (eventSource) eventSource.close();

  const input = document.getElementById('vanilla-sse-input');
  eventSource = new EventSource(
    'http://localhost:3000/chapter-8/countdown?start=' + input.value,
  );
  event.target.reset();

  eventSource.addEventListener('count', event => {
    const number = event.data;
    const div = document.createElement('div');
    div.textContent = number;
    countdown.appendChild(div);

    if (number === '0') eventSource.close();
  });

  eventSource.addEventListener('error', event => {
    countdown.textContent = event.data;
    eventSource.close();
  });
}

window.onload = () => {
  countdown = document.getElementById('vanilla-sse-countdown');
};


const reset = (event) => {
  event.target.reset();
  document.getElementById('htmx-sse-countdown').innerHTML = '';
}