/* eslint-disable linebreak-style */
const express = require('express');
const debug = require('debug');
const dotenv = require('dotenv');
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

// app routes
app.use(userRoute);
app.use(authrouter);
app.use(postRouter)


// listening on console
app.listen(PORT, () => {
  debug(`Listening on port ${PORT}`);
  console.log(`runnig on ${PORT}`);
});
