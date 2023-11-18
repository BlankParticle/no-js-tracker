import type { ServerWebSocket } from "bun";
let sockets: ServerWebSocket<unknown>[] = [];

Bun.serve({
  port: 3000,
  fetch: async (req) => {
    let url = new URL(req.url);
    if (url.pathname === "/") {
      return new Response(Bun.file("index.html").stream());
    } else if (url.pathname.startsWith("/images/")) {
      sockets.forEach((socket) => socket.send(url.pathname.replaceAll("/images/", "")));
      return new Response("", {
        headers: {
          "Content-Type": "image/jpeg",
        },
      });
    } else {
      return new Response("Not found", {
        status: 404,
      });
    }
  },
});

console.log("Listening on http://localhost:3000");

Bun.serve({
  port: 3001,
  fetch: (req, server) => {
    let url = new URL(req.url);
    if (url.pathname.startsWith("/socket")) {
      if (server.upgrade(req)) {
        return;
      }
      return new Response("Upgrade failed :(", { status: 500 });
    } else {
      return new Response(Bun.file("receiver.html").stream());
    }
  },
  websocket: {
    open: (socket) => {
      console.log("Socket opened!");
      sockets.push(socket);
    },
    message: (ws, message) => {},
    close: (ws) => {
      console.log("Socket closed!");
      sockets = sockets.filter((socket) => socket.readyState === 3);
    },
  },
});
