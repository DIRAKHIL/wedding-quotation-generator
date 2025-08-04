const http = require('http');
const fs = require('fs');
const path = require('path');

const PORT = 12000;

const MIME_TYPES = {
    '.html': 'text/html',
    '.css': 'text/css',
    '.js': 'text/javascript',
    '.json': 'application/json',
    '.png': 'image/png',
    '.jpg': 'image/jpeg',
    '.jpeg': 'image/jpeg',
    '.gif': 'image/gif',
    '.svg': 'image/svg+xml',
    '.ico': 'image/x-icon',
};

const server = http.createServer((req, res) => {
    console.log(`Request: ${req.method} ${req.url}`);
    
    // Handle CORS
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
    
    // Handle OPTIONS request for CORS preflight
    if (req.method === 'OPTIONS') {
        res.statusCode = 204;
        res.end();
        return;
    }
    
    // Normalize URL
    let url = req.url;
    if (url === '/') {
        url = '/index-v3.html'; // Use the v3 version as shown in the screenshot
    }
    
    // Get file path
    const filePath = path.join(__dirname, url);
    const extname = path.extname(filePath);
    
    // Check if file exists
    fs.access(filePath, fs.constants.F_OK, (err) => {
        if (err) {
            console.error(`File not found: ${filePath}`);
            res.statusCode = 404;
            res.end('File not found');
            return;
        }
        
        // Set content type
        const contentType = MIME_TYPES[extname] || 'application/octet-stream';
        res.setHeader('Content-Type', contentType);
        
        // Stream file to response
        const fileStream = fs.createReadStream(filePath);
        fileStream.pipe(res);
        
        fileStream.on('error', (err) => {
            console.error(`Error reading file: ${err}`);
            res.statusCode = 500;
            res.end('Server error');
        });
    });
});

server.listen(PORT, '0.0.0.0', () => {
    console.log(`Server running at http://0.0.0.0:${PORT}/`);
});