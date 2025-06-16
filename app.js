import express, { json, urlencoded } from 'express';
import cookieParser from 'cookie-parser';
import cors from 'cors';
 
const corsOption = {
    origin: "*",
    // credentials: true
}
const app = express();
 
app.use(cors(corsOption));

app.use(json({limit: '100mb'}));
app.use(
  urlencoded({ extended: true, limit: "100mb", parameterLimit: 1000000 })
);
app.use(cookieParser());

app.get('/', (req, res) =>
{
    res.send('Hello World!');
});

import indexRouter from './routes/index.router.js';
import templateRouter from './routes/template.router.js';
app.use('/api/v1', indexRouter);
app.use('/api/v1', templateRouter);

export { app  };
