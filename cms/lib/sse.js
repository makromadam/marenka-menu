/* =============================================================================
   Marenka CMS — Server-Sent Events hub
   Pushes "menu updated" events to every open public menu so customer screens
   refresh instantly (anlık) when the owner publishes a change.
   ========================================================================== */
"use strict";

const clients = new Set();

function addClient(req, res) {
  res.writeHead(200, {
    "Content-Type": "text/event-stream",
    "Cache-Control": "no-cache, no-transform",
    Connection: "keep-alive",
    "X-Accel-Buffering": "no",
  });
  res.write("retry: 3000\n\n");
  clients.add(res);
  req.on("close", () => { clients.delete(res); });
}

function broadcast(event, data) {
  const payload = `event: ${event}\ndata: ${JSON.stringify(data)}\n\n`;
  for (const res of clients) {
    try { res.write(payload); } catch (_) { clients.delete(res); }
  }
}

// keep-alive comment so proxies don't drop idle connections
const heartbeat = setInterval(() => {
  for (const res of clients) { try { res.write(`: ping\n\n`); } catch (_) { clients.delete(res); } }
}, 25000);
if (heartbeat.unref) heartbeat.unref();

function clientCount() { return clients.size; }

module.exports = { addClient, broadcast, clientCount };
