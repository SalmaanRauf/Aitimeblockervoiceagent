require('dotenv').config();
const express = require('express');
const path = require('path');
const dotenv = require('dotenv');
const cors = require('cors');
const indexRouter = require('./routes/index');
const apiRouter = require('./routes/api');
const wss = require('./websocket');

// Load config file
dotenv.config({ path: './config/config.env' });

const app = express();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use('/', indexRouter);
app.use('/api', apiRouter);

app.use(express.static(path.join(__dirname, './client/build')));

const server = app.listen(process.env.PORT || 3001, () => {
    console.log(`Server is running on port ${server.address().port}`);
});

server.on('upgrade', (request, socket, head) => {
    wss.handleUpgrade(request, socket, head, (ws) => {
        wss.emit('connection', ws, request);
    });
});

module.exports = app;