const mongoose = require('mongoose');


const eventSchema = new mongoose.Schema({
    type: String,
    uid: Number,
    name: String,
    tagline: String,
    schedule: String,
    description: String,
    image_url: String,
    moderator: String,
    category: String,
    sub_category: String,
    rigor_rank: Number,
    attendees: []
})
module.exports = new mongoose.model("Events", eventSchema);