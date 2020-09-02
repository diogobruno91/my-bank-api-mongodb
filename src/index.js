const express = require('express');
const mongoose = require('mongoose')

const app = express();

mongoose.connect('mongodb+srv://dbruno:dbruno123@bootcamp.x979p.mongodb.net/Bootcamp?retryWrites=true&w=majority', 
{
    useUnifiedTopology: true,
    useNewUrlParser: true,
    useFindAndModify: false
})

app.use(express.json())
app.use('/account', require('./routes'))

app.listen('3001', () => {
    try {
        console.log('server funcinando');
    } catch (error) {
        console.log(`erro no server: ${error}`);
    }
})