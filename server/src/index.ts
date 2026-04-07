import 'dotenv/config';
import cors from 'cors';
import express from 'express';
import {config} from './config.js';
import {connectDb} from './db.js';
import {chatRouter} from './routes/chat.js';
import {feedbackRouter} from './routes/feedback.js';

async function main(): Promise<void> {
  await connectDb(config.mongodbUri);

  const app = express();
  app.use(express.json({limit: '512kb'}));

  const corsOptions: cors.CorsOptions = {
    origin:
      config.corsOrigins.length > 0
        ? config.corsOrigins
        : ['http://localhost:3000', 'http://127.0.0.1:3000'],
    methods: ['GET', 'POST', 'OPTIONS'],
    allowedHeaders: ['Content-Type'],
  };
  app.use(cors(corsOptions));
  app.options('*', cors(corsOptions));

  app.get('/health', (_req, res) => {
    res.json({ok: true, service: 'sme2-api'});
  });

  app.use('/api/chat', chatRouter);
  app.use('/api/feedback', feedbackRouter);

  app.listen(config.port, () => {
    console.log(`sme2-api listening on http://localhost:${config.port}`);
  });
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});
