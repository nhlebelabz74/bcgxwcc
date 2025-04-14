const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const cookieParser = require('cookie-parser');
const compression = require('compression');

const { verifyAccessToken, errorHandler } = require('./middleware');
const { loginRouter, 
  logoutRouter, 
  refreshRouter, 
  memberRouter,
  eventRouter,
  userRouter
} = require('./routers');
const connectDB = require('./config/connectDB');
require('dotenv').config();

const app = express();
const port = process.env.PORT || 4774;

const corsOptions = {
    origin: [
        'http://localhost:5173',
        'https://bcgxwcc-opening-event.netlify.app'
    ],
    credentials: true,
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
    allowedHeaders: ['Content-Type', 'Authorization', 'Origin', 'X-Requested-With'],
    exposedHeaders: ['Content-Length', 'Authorization'],
    optionsSuccessStatus: 200
};
app.use(cors(corsOptions));
app.options('*', cors(corsOptions));
app.use(cookieParser());
app.use(compression());
app.use(express.json({ limit: "10mb" }));
app.use(express.urlencoded({ limit: "10mb", extended: true }));

app.use('/login', loginRouter);
app.use('/logout', logoutRouter);
app.use('/refresh', refreshRouter);

app.use('/api/v1', /*verifyAccessToken,*/ [memberRouter, eventRouter, userRouter]);

app.get('/', (req, res) => {
    res.send('Hello World');
});

app.use(errorHandler);

app.all("*", (req, res) => {
    res.status(404).send("404 NOT FOUND")
});

connectDB();

mongoose.connection.on("connected", async () => {
    console.log("SUCCESSFULLY CONNECTED TO DATABASE");
    app.listen(port, () => {
        console.log(`server listening on port: ${port}...`)
    });
});
mongoose.connection.on("disconnected", () => {
    console.log("Lost connection to database")
});