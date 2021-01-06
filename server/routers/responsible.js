import servicesList from "../../src/resources/servicesList";
const express = require('express');
const router = express.Router();
const DButils = require("../DButils.js");
const bcrypt = require("bcrypt");

const bcrypt_saltRounds=13

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



router.get('/volunteersDetails', async (req, res,next) => {
    try {
        const {organizationName} = req.body;
        let volunteers = await DButils.execQuery(`SELECT * FROM volunteerUsers where organizationName= '${organizationName}'`);
        console.log(volunteers)
        res.send(volunteers);
    }catch (error){
        next(error);
    }
});



router.get('/assign', async (req, res,next) => {
    try {
        const {volunteerUsername,volunteerService} = req.body;
        let volunteersDetails = await DButils.execQuery(`SELECT * FROM volunteerUsers where userName= '${volunteerUsername}'`);
        console.log(volunteersDetails)

        let elderlyDetails = await DButils.execQuery(`SELECT * FROM elderlyUsers`);

        let elderlyWithSameServicesAsVolunteer = [];

        //take only the elderly with the same wanted service as the volunteer service
        for (let elderly in elderlyDetails){
            for (let service in elderly.wantedServices){
                if(service === volunteerService)
                    elderlyWithSameServicesAsVolunteer.push(elderly);
            }
        }

        let rankForEachElderly = [];
        if(elderlyWithSameServicesAsVolunteer.length > 0) {
            let elderlyWithSamePreferredDays = [];
            for (let elderly in elderlyWithSameServicesAsVolunteer) {
                //handle preferred days
                for (let preferredDayElderly in elderlyDetails.preferredDays) {
                    for (let preferredDayVolunteer in volunteersDetails.preferredDays) {
                        if (preferredDayElderly === preferredDayVolunteer)
                            elderlyWithSamePreferredDays.push({
                                elderly: elderly,
                                preferredDayElderly: preferredDayElderly
                            })
                    }
                }
            }

            if (elderlyWithSamePreferredDays.length > 0) {
                let finalRank = 0;
                let rankForLanguage = 0;
                let rankForGender = 0;
                let rankForInterest = 0;
                for (let elderly in elderlyWithSamePreferredDays.map(value => value.key)){
                    //handle languages
                    const foundSameLanguage = elderly.languages.some(r => volunteersDetails.languages.includes(r))
                    if (foundSameLanguage) {
                        rankForLanguage=1
                    }
                    //handle gender
                    const foundSameGender = elderly.genderToMeetWith.some(r => volunteersDetails.gender.includes(r))
                    if (foundSameGender) {
                        rankForGender=1
                    }
                    //handle areaOfInterest
                    const foundSameInterest = elderly.areasOfInterest.some(r => volunteersDetails.areasOfInterest.includes(r))
                    if (foundSameInterest) {
                        rankForInterest=1
                    }

                    finalRank = 0.7*rankForLanguage + 0.2*rankForGender + 0.1*rankForInterest;
                    rankForEachElderly.push({elderly: elderly,finalRank: finalRank})

                }

                rankForEachElderly.sort(function(a, b) {
                    return a.finalRank - b.finalRank;
                });
                console.log("elderly to assign: ")
                console.log(rankForEachElderly[rankForEachElderly.length -1].elderly)

                const elderlyAndPreferredDays = elderlyWithSamePreferredDays.find((x) => x.elderly = rankForEachElderly[rankForEachElderly.length -1].elderly)
                res.send(elderlyAndPreferredDays);

            }


        }

        res.send()

    }catch (error){
        next(error);
    }
});


module.exports = router


