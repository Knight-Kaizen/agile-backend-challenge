const express = require('express');
const bodyParser  = require('body-parser');

const app = express();
app.use(bodyParser.json())

//Get request to read any event based on some queries

app.get('/events', (req, res)=>{
    
    const typePresentInQuery = 'type' in req.query;
    if(typePresentInQuery){
        //Search an event by its recency & paginate results by page number and limit of events per page
        //will call some function to do the task;
        res.send('Got recent events...');
    }
    else{
        //Search on base on id and will return the event if found
        res.send(`Event with id = ${req.query.id}`);
    }

})

//POST request which will take data from api and create an event
app.post('/events', (req, res)=>{
    console.log(req.body);
    
    res.send(`receiving post request for following name: ${req.body.name}`);
})

//PUT request which will take unique id and updated data from api and will update the event with current id.
app.put('/events/:id', (req, res)=>{
    
    // update(req.body) some function call where updated data will be passed
    const uniqueId = req.params.id;
    res.send(`updating event with id = ${uniqueId}`);
})

//DELETE request which will take id as a parameter and delete an event with corresponding id
app.delete('/events/:id', (req, res)=>{
   
    const uniqueId = req.params.id;
    res.send(`Deleting event with id = ${uniqueId}`);
})

//Health api, to check if our server is up or not.
app.listen(8001, ()=>{
    console.log('listening to port 8001');
});