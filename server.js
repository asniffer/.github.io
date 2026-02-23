const http = require('http');
const fs = require('fs');
const path = require('path');

const DATA_FILE = path.join(__dirname, 'data.json');
if (!fs.existsSync(DATA_FILE)) fs.writeFileSync(DATA_FILE, JSON.stringify({records:[]}));

http.createServer((req, res) => {
res.setHeader('Access-Control-Allow-Origin', '*');
res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS');
res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

if (req.method === 'GET' && req.url === '/api/data') {
res.end(fs.readFileSync(DATA_FILE));
} else if (req.method === 'POST' && req.url === '/api/save') {
let body = '';
req.on('data', chunk => body += chunk);
req.on('end', () => {
fs.writeFileSync(DATA_FILE, body, 'utf8');
res.end(JSON.stringify({status: 'success'}));
});
} else if (req.method === 'OPTIONS') {
res.writeHead(204); res.end();
}
}).listen(3000, () => {
console.log('🚀 交易助手后端已启动！端口: 3000');
});