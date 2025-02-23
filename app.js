import express, { json, urlencoded } from 'express';
import cookieParser from 'cookie-parser';
import cors from 'cors';
import { Server } from 'socket.io';
import { createServer } from 'http';
const corsOption = {
    origin: "*",
    credentials: true
}
const app = express();
const httpServer = createServer(app)
// export const ioServer=new Server(httpServer)
const socket = new Server(httpServer, {
    cors: {
        origin: "*"
      }
})
socket.on('connect', (io) =>
{
    console.log('user is connected');
    io.on('prompt', (prompt) =>
    {
        console.log(`prompt from ${io.id} :${prompt}`);
    })
    io.on('disconnect', () =>
    {
        console.log(`socket ${io.id} disconnected`);
    })
}

)
export { socket }

app.use(cors(corsOption));

// // view engine setup
// app.set('views', path.join(__dirname, 'views'));
// app.set('view engine', 'jade');

// app.use(logger('dev'));
app.use(json());
app.use(urlencoded({ extended: false }));
app.use(cookieParser());
// app.use(static(join(__dirname, 'public')));

app.get('/', (req, res) =>
{
    res.send('Hello World!');
});
// app.get('/api/v1', (req, res) =>{
//     res.send('Hello World!');
// });

import indexRouter from './routes/index.router.js';
app.use('/api/v1', indexRouter);


// catch 404 and forward to error handler
// app.use(function(req, res, next) {
//   next(createError(404));
// });

// // error handler
// app.use(function(err, req, res, next) {
//   // set locals, only providing error in development
//   res.locals.message = err.message;
//   res.locals.error = req.app.get('env') === 'development' ? err : {};

//   // render the error page
//   res.status(err.status || 500);
//   res.render('error');
// });

export { app, httpServer };
