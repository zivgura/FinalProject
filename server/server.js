const express = require('express');
const bodyParser = require('body-parser');
const app = express();
app.use(bodyParser.urlencoded({ extended: false }));
// app.use(bodyParser.json());
app.use(express.json()); // parse application/json


const cors = require('cors')
const corsOptions = {
    origin: 'http://localhost:3000',
    credentials: true
}
app.use(cors(corsOptions))

const user = require("./routers/user");
app.use("/user",user);

const responsible = require("./routers/responsible.js");
app.use("/responsible",responsible);

// error middleware
app.use(function (err, req, res, next) {
    console.error(err);
    //why send 500 on 409?!
    // res.status(err.message || 500).send({ message: err.message, success: false });
});

app.listen(3001, () =>
    console.log('Express server is running on localhost:3001')
);

