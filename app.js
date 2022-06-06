/* eslint-disable linebreak-style */
const express = require('express');
const debug = require('debug');
const dotenv = require('dotenv');
const mongoose = require('mongoose')
const PORT = 3000;
// imported routes
const userRoute = require('./Routers/user.route');
const authrouter = require('./Routers/auth.route');
const postRouter =require('./Routers/post.route');

debug(express);
dotenv.config();
// initialize express
const app = express();
app.use(express.json());
app.use(express.urlencoded({extended: true}));

// MongoDB connection, success and error event responses
const uri = 'mongodb://127.0.0.1:27017';
mongoose.connect(uri, {useNewUrlParser: true, useUnifiedTopology: true});
const db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', () => console.log(`Connected to mongo at ${uri}`));

app.get('/', (req, res)=>{
  res.status(200).send('hello bitches');
});
// app routes
app.use(userRoute);
app.use(authrouter);
app.use(postRouter);


// listening on console
app.listen(PORT, () => {
  debug(`Listening on port ${PORT}`);
  console.log(`runnig on ${PORT}`);
});
