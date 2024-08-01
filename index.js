const express= require('express');
const cors = require('cors');
const bodyParser = require('body-parser');

const corsOptions ={
    origin: 'http://localhost:3000',
    optionsSuccessStatus:200
}


const app=express();


app.use(cors(corsOptions));
app.use(bodyParser.json());


const PORT=3500;

app.use('/api/user',require('./router/api/user'));
app.use('/api/songs',require('./router/api/songs'));
app.use('/api/login',require('./router/api/login'));
app.use('/api/signup',require('./router/api/signup'));
app.use('/api/albums',require('./router/api/albums'));

app.listen(PORT,() => console.log(`Server started on port ${PORT}`));
