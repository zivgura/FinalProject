const DButils = require("./DButils");
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

const user = require("../server/routers/user.js");
app.use("/user",user);



// cookie middleware
// app.use(function (req, res, next) {
//     if (req.session && req.session.user_id) {
//         DButils.queryDatabase("SELECT user_id FROM dbo.users")
//             .then((users) => {
//                 if (users.find((x) => x.user_id === req.session.user_id)) {
//                     req.user_id = req.session.user_id;
//                 }
//                 next();
//             })
//             .catch((error) => next(error));
//     } else {
//         next();
//     }
// });


// error middleware
app.use(function (err, req, res, next) {
    console.error(err);
    //why send 500 on 409?!
    // res.status(err.message || 500).send({ message: err.message, success: false });
});

app.listen(3001, () =>
    console.log('Express server is running on localhost:3001')
);

