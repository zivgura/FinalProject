const express = require('express');
const router = express.Router();
const DButils = require("../DButils.js");
const bcrypt = require("bcrypt");

bcrypt_saltRounds=13

// register volunteer
router.post('/registerVolunteer', async (req, res,next) => {
    try {
        const {firstName, lastName, username, password, email, additionalInformation} = req.body;
        const organizationName = req.body.organizationName.value;
        const city = req.body.city.value;
        const gender =  req.body.gender.value;
        const areasOfInterest = req.body.selectedAreasOfInterest.map((dict)=>dict.value);
        const languages = req.body.selectedLanguages.map((dict)=>dict.value);
        const services = req.body.services.map((dict)=>dict.value);
        const preferredDaysAndHours = req.body.preferredDaysAndHours.map((dict)=>dict.value);
        const digitalDevices = req.body.digitalDevices.map((dict)=>dict.value);

        console.log(city)
        console.log(areasOfInterest)
        // username exists
        let users = []
        users = await DButils.execQuery("SELECT username FROM dbo.users");
        if (users.find((x) => x.username === username))
            throw { status: 409, message: "Username taken" };

        // make hash to password
        let hash_password = bcrypt.hashSync(password,parseInt(bcrypt_saltRounds));

        //insert into DB users
        await DButils.execQuery("Insert into users (username, password, userRole, organizationName) "
            + `VALUES ('${username}', '${hash_password}', 'volunteer', '${organizationName}');`)

        // insert into DB volunteerUsers
        await DButils.execQuery("Insert into volunteerUsers (userName, firstName, lastName, city, email, gender, " +
            "areasOfInterest, languages, organizationName, services, preferredDays, digitalDevices, additionalInformation) "
            + `VALUES ('${username}', '${firstName}', '${lastName}', '${city}', '${email}', '${gender}',
             '${areasOfInterest}', '${languages}', '${organizationName}', '${services}', '${preferredDaysAndHours}',
             '${digitalDevices}', '${additionalInformation}');`)

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
        const {firstName, lastName, username, password, email, additionalInformation} = req.body;
        const organizationName = req.body.organizationName.value;
        const city = req.body.city.value;
        const gender =  req.body.gender.value;
        const areasOfInterest = req.body.selectedAreasOfInterest.map((dict)=>dict.value);
        const languages = req.body.selectedLanguages.map((dict)=>dict.value);
        const wantedServices = req.body.wantedServices.map((dict)=>dict.value);
        const preferredDaysAndHours = req.body.preferredDaysAndHours.map((dict)=>dict.value);
        const digitalDevices = req.body.digitalDevices.map((dict)=>dict.value);
        const genderToMeetWith= req.body.genderToMeetWith.value;

        // username exists
        let users = []
        users = await DButils.execQuery("SELECT username FROM dbo.users");
        console.log(users)
        if (users.find((x) => x.username === username))
            throw { status: 409, message: "Username taken" };

        // make hash to password
        let hash_password = bcrypt.hashSync(password,parseInt(bcrypt_saltRounds));

        //insert into DB users
        await DButils.execQuery("Insert into users (username, password, userRole, organizationName) "
            + `VALUES ('${username}', '${hash_password}', 'elderly', '${organizationName}');`)

        // insert into DB Elderly
        await DButils.execQuery("Insert into elderlyUsers (userName, firstName, lastName, city, email, gender, " +
            "areasOfInterest, languages, organizationName, wantedServices, genderToMeetWith, preferredDays, digitalDevices, additionalInformation) "
            + `VALUES ('${username}', '${firstName}', '${lastName}', '${city}', '${email}', '${gender}',
             '${areasOfInterest}', '${languages}', '${organizationName}', '${wantedServices}', '${genderToMeetWith}', '${preferredDaysAndHours}',
             '${digitalDevices}', '${additionalInformation}');`)

        //send result
        res.setHeader('Content-Type', 'application/json');
        res.status(200).send({message: "registration succeeded", success: true});
    }catch (error){
        next(error);
    }
});

module.exports = router


