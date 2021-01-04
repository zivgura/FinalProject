const express = require('express');
const router = express.Router();
const DButils = require("../DButils.js");
const bcrypt = require("bcrypt");
bcrypt_saltRounds = 13


// register organization
router.post('/registerOrganization', async (req, res,next) => {
    try {
        const {organizationName, responsibleUserName, organizationType} = req.body;

        // organizations exist
        let organizations = []
        organizations = await DButils.execQuery("SELECT organizationName FROM dbo.organizations");
        if (organizations.find((x) => x.organizationName === organizationName))
            throw { status: 409, message: "organizationName taken" };

        //insert into DB Organization
        await DButils.execQuery("Insert into organizations (organizationName, responsibleUserName, organizationType) "
            + `VALUES ('${organizationName}', '${responsibleUserName}', '${organizationType}');`)

    }catch (error){
        next(error);
    }
});


router.post('/registerResponsible', async (req, res,next) => {
    try {
        const {firstName, lastName, username, password, email, organizationName} = req.body;
        const gender =  req.body.gender.value;

        // username exists
        let users = []
        users = await DButils.execQuery("SELECT username FROM dbo.users");
        if (users.find((x) => x.username === username))
            throw { status: 409, message: "Username taken" };

        // make hash to password
        let hash_password = bcrypt.hashSync(password,parseInt(bcrypt_saltRounds));

        // insert into DB Responsible
        await DButils.execQuery("Insert into ResponsibleUsers (userName, firstName, lastName, email, password, gender) "
            + `VALUES ('${username}', '${firstName}', '${lastName}', '${email}', '${hash_password}','${gender}');`)

        //insert into DB users
        await DButils.execQuery("Insert into users (username, organizationName, userRole) "
            + `VALUES ('${username}', '${organizationName}', 'Responsible');`)


        //send result
        res.setHeader('Content-Type', 'application/json');
        res.status(200).send({message: "registration succeeded", success: true});
    }catch (error){
        next(error);
    }
});


router.get('/responsibleUsers', async (req, res,next) => {
    try {
        let users = await DButils.execQuery(`SELECT userName FROM users where userRole = 'Responsible' `);
        console.log(users)
        res.send(users);
    }catch (error){
        next(error);
    }

});


module.exports = router;