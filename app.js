import express from 'express'
import path from 'path'
import { dirname } from 'path';
import { fileURLToPath } from 'url';

const app = express();
const __dirname = dirname(fileURLToPath(import.meta.url));

app.use('/', express.static(path.join(__dirname, 'public')))
app.get('/test', (req, res) => {
    let mid = req.query.mid
    console.log(mid)
    res.json('Hello World');
  });

const PORT = process.env.PORT || 8080;
const HOST = '0.0.0.0';

app.listen(PORT, HOST);
console.log(`Running on http://${HOST}:${PORT}`);