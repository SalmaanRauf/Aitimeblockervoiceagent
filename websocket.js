const WebSocket = require('ws');
const { processText } = require('./nlu');
const eventController = require('./controllers/eventController');

const wss = new WebSocket.Server({ noServer: true });

wss.on('connection', (ws) => {
    console.log('Client connected');

    ws.on('message', async (message) => {
        console.log(`Received message: ${message}`);
        const result = await processText(message);
        console.log('NLU Result:', result);

        const intent = result.intent;
        const entities = result.entities;

        let responseMessage = 'I didn\'t understand that.';

        if (intent === 'create_event') {
            const title = entities.title ? entities.title.resolution.value : 'New Event';
            const startTime = entities.start_time ? entities.start_time.resolution.value : null;
            const endTime = entities.end_time ? entities.end_time.resolution.value : null;

            const req = { body: { title, startTime, endTime, timeZone: 'UTC' } };
            const res = { redirect: () => {}, send: () => {} }; 
            const next = (err) => console.error(err); 

            await eventController.event_create_post(req, res, next);
            responseMessage = `Created event: ${title}`;
        }

        ws.send(responseMessage);
    });

    ws.on('close', () => {
        console.log('Client disconnected');
    });
});

module.exports = wss;