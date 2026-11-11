import http from 'node:http';
import {readFile,stat} from 'node:fs/promises';
import path from 'node:path';
const root=path.resolve('.next-build');
const types={'.html':'text/html; charset=utf-8','.js':'application/javascript','.css':'text/css','.svg':'image/svg+xml','.json':'application/json','.txt':'text/plain','.woff2':'font/woff2','.png':'image/png','.ico':'image/x-icon'};
const server=http.createServer(async(req,res)=>{try{const pathname=decodeURIComponent(new URL(req.url||'/','http://localhost').pathname);let file=path.resolve(root,'.'+pathname);if(file!==root&&!file.startsWith(root+path.sep)){res.writeHead(403);res.end();return}if((await stat(file)).isDirectory())file=path.join(file,'index.html');const content=await readFile(file);res.writeHead(200,{'Content-Type':types[path.extname(file)]||'application/octet-stream'});res.end(content)}catch{res.writeHead(404,{'Content-Type':'text/plain'});res.end('Not found')}});
server.on('error',error=>{console.error('Preview server failed:',error.message);process.exitCode=1});
server.listen(3000,'127.0.0.1',()=>console.log('Portfolio production preview: http://127.0.0.1:3000'));
