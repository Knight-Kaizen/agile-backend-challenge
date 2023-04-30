const express = require('express');
const bodyParser = require('body-parser');
const dotenv = require('dotenv');

const connectDB = require('./config/connectDB');
const eventController = require('./controllers/event');


const app = express();
app.use(bodyParser.json())
dotenv.config();

const port = process.env.PORT || 8001;

connectDB();

app.get('/', (req, res) => {
    res.send(`Backend working`);
})

//POST request which will take data from api and create an event
app.post('/events', eventController.createEvent);

app.get('/events', eventController.getEvents);

app.put('/events/:id', eventController.updateEvent);

app.delete('/events/:id', eventController.deleteEvent);
//Health api, to check if our server is up or not.
app.listen(port, () => {
    console.log('listening to port: ', port);
});