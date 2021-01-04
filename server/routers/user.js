const express = require('express');
const router = express.Router();
const DButilsElderly = require("../DButils");
const bcrypt = require("bcrypt");

bcrypt_saltRounds=13


router.post("/login", async (req, res, next) => {
    try {
        // check that username exists
        let users = []
        users = await DButils.execQuery("SELECT username FROM dbo.users");
        if (!users.find((x) => x.username === username))
            throw { status: 401, message: "Username or Password incorrect" };

        // check that the password is correct
        const user = (
            await DButils.execQuery(
                `SELECT * FROM dbo.users WHERE username = '${req.body.username}'`
            )
        )[0];

        if (!bcrypt.compareSync(password, user.password)) {
            throw { status: 401, message: "Username or Password incorrect" };
        }

        // Set cookie
        // req.session.user_id = user.user_id;
        //req.session.save();

        res.status(200).send({ message: "login succeeded", success: true });
    } catch (error) {
        next(error);
    }
});

module.exports = router
