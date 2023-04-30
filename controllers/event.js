
const Events = require('../models/event');


const createEvent = async (req, res) => {
    try {
        const {
            type,
            uid,
            name,
            tagline,
            schedule,
            description,
            image_url,
            moderator,
            category,
            sub_category,
            rigor_rank,
            attendees
        } = req.body;

        //check if event with corresponding id exists?
        const eventExist = await Events.find({ uid });
        if (Object.keys(eventExist).length != 0)
            res.send(`Event already exists with uid: ${uid}`);
        
        else {
            const newEvent = new Events({
                type,
                uid,
                name,
                tagline,
                schedule,
                description,
                image_url,
                moderator,
                category,
                sub_category,
                rigor_rank,
                attendees
            })
            const event = await newEvent.save();

            res.send(`Event created with id: ${event.uid}`);
        }


    }
    catch (err) {
        console.log('Error in creating new event', err);
    }

}


const getEvents = async (req, res) => {
    try {
        const typePresentInQuery = 'type' in req.query;
        if (typePresentInQuery) {

            const documentLimit = req.query.limit;
            //Search an event by its recency & paginate results by page number and limit of events per page
            const result = await Events.find().sort({ "schedule": 1 }).limit(documentLimit);
            if (Object.keys(result).length == 0)
                res.send('No events found');
            else
                res.send(`Query results, ${result}`);
        }
        else {
            const documentId = req.query.id;
            const result = await Events.find({ uid: documentId });

            if (Object.keys(result).length == 0)
                res.send('Event with the given id not found');
            else
                //Search on base on id and will return the event if found
                res.send(`Event with id found ${result}`);
        }
    }
    catch (err) {
        res.send(`error in getting data:  ${err}`);
    }
}

const updateEvent = async (req, res) => {
    try {
        const eventId = req.params.id;
        const {
            type,
            uid,
            name,
            tagline,
            schedule,
            description,
            image_url,
            moderator,
            category,
            sub_category,
            rigor_rank,
            attendees
        } = req.body;

        const result = await Events.updateOne({ uid: eventId }, {
            $set: {
                type,
                uid,
                name,
                tagline,
                schedule,
                description,
                image_url,
                moderator,
                category,
                sub_category,
                rigor_rank,
                attendees
            }
        })

        if (result.matchedCount == 0)
            res.send(`No event found with id: ${eventId}`);
        else
            res.send(`Updated event details with id: ${eventId}`);
    }
    catch (err) {
        res.send(`Error in updating, ${err}`);
    }
}

const deleteEvent = async (req, res) => {
    try {
        const eventId = req.params.id;
        const result = await Events.deleteOne({ uid: eventId });
        console.log(result);
        if (result.deletedCount == 0)
            res.send(`Could not delete event! Try again`);
        else
            res.send(`Deleted event with id: ${eventId}`);
    }
    catch (err) {
        res.send(`Error in deleting event with id ${err}`)
    }
}
module.exports = {
    createEvent,
    getEvents,
    updateEvent,
    deleteEvent
}