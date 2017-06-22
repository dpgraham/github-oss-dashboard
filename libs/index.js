import express from 'express';
import path from 'path';
import proxy from 'http-proxy-middleware';

const app = express();

app.use(express.static('assets'));
app.use('/vendor', express.static('node_modules'));

// TODO: This shouldn't happen in production. Should be built to same directory
app.use('/client', proxy({target: 'http://localhost:8080', pathRewrite: {'^/client': '/'}}));

const port = process.env.GITHUB_OSS_PORT || 3333;
app.listen(port);
console.log(`Running server on port ${port}`);