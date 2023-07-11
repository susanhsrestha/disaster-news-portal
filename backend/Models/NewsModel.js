const mongoose = require("mongoose");

const relatedSchema = new mongoose.Schema({
    title: String,
    timestamp: Date,
    twitterUrl: String,
    upvotes: Number,
    upvotedBy: [String],
});

module.exports = mongoose.model('related', relatedSchema);