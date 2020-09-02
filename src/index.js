const express = require('express');
const mongoose = require('mongoose')

const app = express();

require('dotenv').config();

mongoose.connect(`mongodb+srv://${process.env.USERDB}:${process.env.PWDDB}@bootcamp.x979p.mongodb.net/${process.env.DB}?retryWrites=true&w=majority`, 
{
    useUnifiedTopology: true,
    useNewUrlParser: true,
    useFindAndModify: false
})

app.use(express.json())
app.use('/account', require('./routes'))

app.listen(`${process.env.PORT}`, () => {
    try {
        console.log('server funcinando');
    } catch (error) {
        console.log(`erro no server: ${error}`);
    }
})