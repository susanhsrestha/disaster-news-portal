const express = require('express');
const cors = require('cors');
const app = express();
const port = 5000; // Specify the port number for the server

app.use(cors()); // Enable Cross-Origin Resource Sharing

const server = app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});

const mongoose = require('mongoose');

// Connect to MongoDB using the provided connection URL and options
mongoose.connect('mongodb+srv://mario:Fr33t3st@cluster.bdqihjb.mongodb.net/disaster', {
    useNewUrlParser: true,
    useUnifiedTopology: true,
})
    .then(() => {
        console.log('Connected to MongoDB');
    })
    .catch((error) => {
        console.error('Failed to connect to MongoDB', error);
    });

const relatedSchema = new mongoose.Schema({
    title: String,
    timestamp: Date,
    twitterUrl: String,
});

// Create a Mongoose model for the 'Related' collection using the defined schema
const Related = mongoose.model('relateds', relatedSchema);

// Define an API route '/api/related'
app.get('/api/related', (req, res) => {
    // Fetch all documents from the 'Related' collection
    Related.find({})
        .then(data => {
            res.json(data); // Send the fetched data as a JSON response
        })
        .catch(error => {
            console.error('Error fetching data from MongoDB:', error);
            res.status(500).json({ error: 'Failed to fetch data from MongoDB' });
        });
});

// Handle the SIGINT signal (e.g., when the server is terminated)
process.on('SIGINT', () => {
    // Close the MongoDB connection and stop the server
    mongoose.connection.close(() => {
        console.log('Mongoose connection closed');
        server.close();
    });
});
