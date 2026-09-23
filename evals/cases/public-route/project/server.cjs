const http = require('node:http');
const { sharedPage } = require('./shared-page.cjs');
function handler(req, res) {
  if (req.url === '/shared') { res.end(sharedPage()); return; }
  if (req.url === '/') { res.end('<h1>Home</h1>'); return; }
  res.writeHead(404); res.end('Not found');
}
module.exports = { handler };
if (require.main === module) http.createServer(handler).listen(0);
