require('dotenv').config();
const express = require('express');
const bodyParser = require('body-parser');
const fetch = require('node-fetch');
const path = require('path');

const app = express();
const port = 3000;

const apodEndpoint = 'https://api.nasa.gov/planetary/apod?api_key=' + process.env.API_KEY;

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use('/', express.static(path.join(path.resolve(), 'src/public')));


// Connects to NASA's APOD API and retrieves the image for a specific date
app.get('/apod/get_image', async (req, res) => {
    const {date} = req.query;

    try {
        let image = await fetch(`${apodEndpoint}&start_date=${date}`)
            .then(res => res.json())

        res.send(image)
    } catch (err) {
        console.log('error:', err);
    }
});

// Connects to NASA's APOD API and retrieves the images for a date range
app.get('/apod/get_images', async (req, res) => {
    const {start_date, end_date} = req.query;

    try {
        let images = await fetch(`${apodEndpoint}&start_date=${start_date}&end_date=${end_date}`)
            .then(res => res.json())

        res.send(images);
    } catch (err) {
        console.log('error:', err);
    }
});

app.listen(port, () => console.log(`Example app listening on port ${port}!`));