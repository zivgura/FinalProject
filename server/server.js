const express = require('express');
const bodyParser = require('body-parser');
const app = express();
// app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(express.json()); // parse application/json


const cors = require('cors')
const corsOptions = {
    origin: 'http://localhost:3000',
    credentials: true
}
app.use(cors(corsOptions))

const user = require("./routers/user.js");
app.use("/user",user);

const responsible = require("./routers/responsible.js");
app.use("/responsible",responsible);

const admin = require("./routers/admin.js");
app.use("/admin",admin);

// error middleware
// app.use(function (err, req, res, next) {
//     console.error(err.status);
//     //why send 500 on 409?!
//     res.status(err.status || 500).send({ message: err.message, success: false });
// });

app.listen(3001, () =>
    console.log('Express server is running on localhost:3001')
);

