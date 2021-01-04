const express = require('express');
const router = express.Router();
const DButils = require("../DButils.js");

const bcrypt = require("bcrypt");

bcrypt_saltRounds=13

// register volunteer
router.post('/registerVolunteer', async (req, res,next) => {
    try {
        const {firstName, lastName, username, password, email, organizationName} = req.body;
        const city = req.body.city.value;
        const gender =  req.body.gender.value;
        const areasOfIntrest = req.body.selectedAreasOfInterest.map((dict)=>dict.value);
        const languages = req.body.selectedLanguages.map((dict)=>dict.value);
        console.log(city)
        console.log(areasOfIntrest)
        // username exists
        let users = []
        users = await DButils.execQuery("SELECT username FROM dbo.users");
        if (users.find((x) => x.username === username))
            throw { status: 409, message: "Username taken" };

        // make hash to password
        let hash_password = bcrypt.hashSync(password,parseInt(bcrypt_saltRounds));

        // insert into DB Volunteer
        await DButils.execQuery("Insert into volunteerUsers (userName, firstName, lastName, city, email, gender,areasOfIntrest, languages) "
            + `VALUES ('${username}', '${firstName}', '${lastName}', '${city}', '${email}', '${gender}',
             '${areasOfIntrest}', '${languages}');`)

        //insert into DB users
        await DButils.execQuery("Insert into users (username, password, organizationName, userRole) "
            + `VALUES ('${username}', '${hash_password}', '${organizationName}', 'Volunteer');`)


        //send result
        res.setHeader('Content-Type', 'application/json');
        res.status(200).send({message: "registration succeeded", success: true});
    }catch (error){
        next(error);
    }
});


// register elderly
router.post('/registerElderly', async (req, res,next) => {
    try {
        const {firstName, lastName, username, password, email, city, gender, areasOfIntrest, languages, organizationName} = req.body;

        // username exists
        let users = []
        users = await DButils.execQuery("SELECT username FROM dbo.users");
        console.log(users)
        if (users.find((x) => x.username === username))
            throw { status: 409, message: "Username taken" };

        // make hash to password
        let hash_password = bcrypt.hashSync(password,parseInt(bcrypt_saltRounds));

        // insert into DB Volunteer
        await DButils.execQuery("Insert into elderlyUsers (username, firstname, lastname, city, email, gender,areaOfIntrest, languages) "
            + `VALUES ('${username}', '${firstName}', '${lastName}', '${city}', '${email}','${gender}, '${areasOfIntrest}', '${languages}'');`)

        //insert into DB users
        await DButils.execQuery("Insert into users (username,password, organizationName, userRole) "
            + `VALUES ('${username}','${hash_password}','${organizationName}', 'Elderly'');`)


        //send result
        res.setHeader('Content-Type', 'application/json');
        res.status(200).send({message: "registration succeeded", success: true});
    }catch (error){
        next(error);
    }
});

module.exports = router


