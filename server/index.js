const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const cors = require('cors');

mongoose.set('strictQuery', true)
    .connect('mongodb://localhost:27017/marketplace')
    .then( () => console.log('MongoDB Connected!'))
    .catch((err) => console.log('Error connecting to DB', err));

const app = express();
app.use(express.json());
app.use(bodyParser.json());
app.use(cors());
app.use('/uploads', express.static('uploads'));



app.listen(3333, (error) => {
    if (error) {
        return console.log(error);
    }
    console.log('Підключення сервера успішне');
});