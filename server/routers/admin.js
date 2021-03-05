const express = require('express');
const router = express.Router();
const DButils = require("../DButils.js");
const bcrypt = require("bcrypt");
bcrypt_saltRounds = 13


// register organization
router.post('/registerOrganization', async (req, res,next) => {
    try {
        const {organizationName, phoneNumber} = req.body;
        const organizationType =  req.body.organizationType.value;

        console.log("organization");
        console.log(req.body);
        // organizations exist
        let organizations = []
        organizations = await DButils.execQuery("SELECT organizationName FROM organizations");
        if (organizations.find((x) => x.organizationName === organizationName))
            throw { status: 409, message: "organizationName taken" };

        //insert into DB Organization
        await DButils.execQuery("Insert into organizations (organizationName, organizationType, phoneNumber) "
            + `VALUES ('${organizationName}', '${organizationType}', '${phoneNumber}');`)

    }catch (error){
        next(error);
    }
});


router.post('/registerResponsible', async (req, res,next) => {
    try {
        const {firstName, lastName, username, password, email} = req.body;
        const organizationName = req.body.organizationName.value;
        const responsibleType = req.body.responsibleType.value;
        const gender =  req.body.gender.value;

        // username exists
        let users = []
        users = await DButils.execQuery("SELECT username FROM users");
        if (users.find((x) => x.username === username))
            throw { status: 409, message: "Username taken" };

        // make hash to password
        let hash_password = bcrypt.hashSync(password,parseInt(bcrypt_saltRounds));

        //insert into DB users
        await DButils.execQuery("Insert into users (username, password, userRole, organizationName) "
            + `VALUES ('${username}', '${hash_password}', 'responsible', '${organizationName}');`)

        // insert into DB responsibleUsers
        await DButils.execQuery("Insert into responsibleUsers (userName, firstName, lastName, email, gender," +
            "organizationName, responsibleType) "
            + `VALUES ('${username}', '${firstName}', '${lastName}', '${email}', '${gender}',
            '${organizationName}','${responsibleType}');`)

        //send result
        res.setHeader('Content-Type', 'application/json');
        res.status(200).send({message: "registration succeeded", success: true});
    }catch (error){
        next(error);
    }
});


router.get('/organizationNames', async (req, res,next) => {
    try {
        let organizations = await DButils.execQuery(`SELECT organizationName FROM organizations`);
        console.log(organizations)
        res.send(organizations);
    }catch (error){
        next(error);
    }
});


module.exports = router;