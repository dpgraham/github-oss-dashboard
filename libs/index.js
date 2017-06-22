import express from 'express';
import path from 'path';
const app = express();

app.use(express.static('assets'));
const port = process.env.GITHUB_OSS_PORT || 3333;
app.listen(port);
console.log(`Running server on port ${port}`);