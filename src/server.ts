import express from 'express';
import { verify } from './routes/v1/templates/verify';
import { render } from './routes/v1/templates/render';

const app = express();
const host = process.env.HOST ?? '0.0.0.0';
const port = parseInt(process.env.PORT ?? '3000');


process.on('SIGINT', () => {
  console.log('Stopping...');
  process.exit(0);
});


app.use(express.json({
  limit: '10mb'
}));


app.use((req, res, next) => {
  const reqId = crypto.randomUUID();
  const epId = `[${reqId}] ${req.method} ${req.url}`;

  console.time(epId);
  console.log(epId);
  next();
  console.log(`${epId} - ${res.statusCode} - ${console.timeEnd(epId)}`);
});

app.post('/v1/templates/verify', verify);
app.post('/v1/templates/render', render);


app.listen(port, host, () => {
  console.info(`Local address http://localhost:${port}`);
  console.info(`Public address http://0.0.0.0:${port}`);
});
