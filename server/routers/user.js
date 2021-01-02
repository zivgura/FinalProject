const express = require('express');
const router = express.Router();
const DButils = require("../DButils");
const bcrypt = require("bcrypt");

bcrypt_saltRounds=13

router.post('/register', async (req, res,next) => {
    try {
        const {firstName, lastName, username, password, email} = req.body;
        // username exists
        let users = []
        users = await DButils.execQuery("SELECT username FROM dbo.users");
        console.log(users)
        if (users.find((x) => x.username === username))
            throw { status: 409, message: "Username taken" };

        // make hash to password
        let hash_password = bcrypt.hashSync(password,parseInt(bcrypt_saltRounds));

        // insert into DB
        await DButils.execQuery("INSERT INTO users (username, firstname, lastname,country,email,password,pathToProfilePicture) " +
            `VALUES ('${username}', '${firstName}', '${lastName}', 'Israel', '${email}', '${hash_password}','ziv');`)

        //send result
        res.setHeader('Content-Type', 'application/json');
        res.status(200).send({message: "registration succeeded", success: true});
    }catch (error){
        next(error);
    }
});

module.exports = router


// router.post("/login", async (req, res, next) => {
//     try {
//
//         // check that username exists
//         const users = await DButils.queryDatabase("SELECT username FROM dbo.users");
//         if (!users.find((x) => x.username === username))
//             throw { status: 401, message: "Username or Password incorrect" };
//
//         // check that the password is correct
//         const user = (
//             await DButils.execQuery(
//                 `SELECT * FROM dbo.users WHERE username = '${req.body.username}'`
//             )
//         )[0];
//
//         if (!bcrypt.compareSync(password, user.password)) {
//             throw { status: 401, message: "Username or Password incorrect" };
//         }
//
//         // Set cookie
//         req.session.user_id = user.user_id;
//         //req.session.save();
//
//
//
//
//
//         res.status(200).send({ message: "login succeeded", success: true });
//     } catch (error) {
//         next(error);
//     }
// });
