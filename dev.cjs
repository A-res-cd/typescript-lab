const http = require('node:http');
const fs = require('node:fs');
const path = require('node:path');
const root = path.resolve(__dirname, 'dist');
const port = Number(process.env.PORT || 8000);
const clients = new Set();
const mime = {'.html':'text/html', '.js':'text/javascript', '.css':'text/css', '.json':'application/json', '.txt':'text/plain', '.ts':'text/plain'};
const server = http.createServer((req,res) => {
  if(req.url === '/__reload') {
    res.writeHead(200, {'Content-Type':'text/event-stream','Cache-Control':'no-cache','Connection':'keep-alive'});
    res.write(': connected\n\n'); clients.add(res); req.on('close',()=>clients.delete(res)); return;
  }
  let pathname; try {pathname = decodeURIComponent(new URL(req.url,'http://localhost').pathname);} catch {res.writeHead(400).end();return;}
  const file = path.resolve(root, '.' + (pathname === '/' ? '/index.html' : pathname));
  if(!file.startsWith(root + path.sep)) {res.writeHead(403).end();return;}
  fs.readFile(file,(error,data)=>{
    if(error){res.writeHead(404).end('Not found');return;}
    res.writeHead(200, {'Content-Type': mime[path.extname(file)] || 'application/octet-stream','Cache-Control':'no-store'});
    if(path.extname(file)==='.html') data = Buffer.from(data.toString().replace('</body>', '<script>new EventSource("/__reload").onmessage=()=>location.reload()</script></body>'));
    res.end(data);
  });
});
const watcher = fs.watch(root,{recursive:true},()=>{for(const client of clients)client.write('data: reload\n\n');});
server.listen(port,'127.0.0.1',()=>console.log(`Development server: http://localhost:${port} (automatic reload enabled)`));
server.on('error',e=>{console.error(e.message);watcher.close();process.exitCode=1;});
