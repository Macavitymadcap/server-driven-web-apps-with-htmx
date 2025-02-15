# Server Driven Web Apps With htmx

This repository contains my replications of the code example from the book
[Server Driven Web Apps With HTMX](https://pragprog.com/titles/rvhxweb/server-driven-web-apps-with-htmx/) 
by R. Mark Volkmann.

## Getting Started

1. Install the dependencies:
```bash
bun install
```

2. To start the production server
```bash
bun run start
```

The Development server allows for reloading content without restarting the 
server, but requires a bit more setup.

1. Uncomment the following lin in the head of all html file:
```html
<script src="../scripts/reload-client.js" type="module"></script>
```

2. Uncomment line 3 of [server.ts](src/server.ts):
```typescript
import './sockets/reload-server';
```

3. Start the development server
```bash
bun run dev
```

