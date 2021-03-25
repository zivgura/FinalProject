const express = require('express');
const bcrypt = require('bcrypt');
const DButils = require('../DButils.js');
const router = express.Router();

bcrypt_saltRounds = 13;

// register volunteer
router.post('/registerVolunteer', async (req, res, next) => {
	try {
		const {firstName, lastName, username, password, email, additionalInformation} = req.body;
		const organizationName = req.body.organizationName.value;
		const city = req.body.city.value;
		const gender = req.body.gender.value;
		const areasOfInterest = req.body.selectedAreasOfInterest.map((dict) => dict.value);
		const languages = req.body.selectedLanguages.map((dict) => dict.value);
		const services = req.body.services.map((dict) => dict.value);
		const preferredDaysAndHours = req.body.preferredDaysAndHours.map((dict) => dict.value);
		const digitalDevices = req.body.digitalDevices.map((dict) => dict.value);
		console.log(city);
		console.log(areasOfInterest);
		// username exists
		let users = [];
		users = await DButils.execQuery('SELECT username FROM users');
		if (users.find((x) => x.username === username))
			throw {status: 409, message: 'Username taken'};

		// make hash to password
		let hash_password = bcrypt.hashSync(password, parseInt(bcrypt_saltRounds));

		//insert into DB users
		await DButils.execQuery('Insert into users (username, password, userRole, organizationName) '
			+ `VALUES ('${username}', '${hash_password}', 'volunteer', '${organizationName}');`);

		// insert into DB volunteerUsers
		await DButils.execQuery('Insert into volunteerUsers (userName, firstName, lastName, city, email, gender, ' +
			'areasOfInterest, languages, organizationName, services, preferredDays, digitalDevices, additionalInformation) '
			+ `VALUES ('${username}', '${firstName}', '${lastName}', '${city}', '${email}', '${gender}',
             '${JSON.stringify(areasOfInterest)}', '${JSON.stringify(languages)}', '${organizationName}', '${JSON.stringify(services)}', '${JSON.stringify(preferredDaysAndHours)}',
             '${JSON.stringify(digitalDevices)}', '${additionalInformation}');`);

		//changed to JSON!!

		//send result
		res.setHeader('Content-Type', 'application/json');
		res.status(200).send({message: 'registration succeeded', success: true});
	} catch (error) {
		next(error);
	}
});

// register elderly
router.post('/registerElderly', async (req, res, next) => {
	try {
		const {firstName, lastName, username, password, email, additionalInformation} = req.body;
		const organizationName = req.body.organizationName.value;
		const city = req.body.city.value;
		const gender = req.body.gender.value;
		const areasOfInterest = req.body.selectedAreasOfInterest.map((dict) => dict.value);
		const languages = req.body.selectedLanguages.map((dict) => dict.value);
		const wantedServices = req.body.wantedServices.map((dict) => dict.value);
		const preferredDaysAndHours = req.body.preferredDaysAndHours.map((dict) => dict.value);
		const digitalDevices = req.body.digitalDevices.map((dict) => dict.value);
		const genderToMeetWith = req.body.genderToMeetWith.value;

		// username exists
		let users = [];
		users = await DButils.execQuery('SELECT username FROM users');
		console.log(users);
		if (users.find((x) => x.username === username))
			throw {status: 409, message: 'Username taken'};

		// make hash to password
		let hash_password = bcrypt.hashSync(password, parseInt(bcrypt_saltRounds));

		//insert into DB users
		await DButils.execQuery('Insert into users (username, password, userRole, organizationName) '
			+ `VALUES ('${username}', '${hash_password}', 'elderly', '${organizationName}');`);

		// insert into DB Elderly
		await DButils.execQuery('Insert into elderlyUsers (userName, firstName, lastName, city, email, gender, ' +
			'areasOfInterest, languages, organizationName, wantedServices, genderToMeetWith, preferredDays, digitalDevices, additionalInformation) '
			+ `VALUES ('${username}', '${firstName}', '${lastName}', '${city}', '${email}', '${gender}',
             '${JSON.stringify(areasOfInterest)}', '${JSON.stringify(languages)}', '${organizationName}',
              '${JSON.stringify(wantedServices)}','${genderToMeetWith}', '${JSON.stringify(preferredDaysAndHours)}',
              '${JSON.stringify(digitalDevices)}', '${additionalInformation}');`);

		//send result
		res.setHeader('Content-Type', 'application/json');
		res.status(200).send({message: 'registration succeeded', success: true});
	} catch (error) {
		next(error);
	}
});

router.get('/volunteersDetails/:organizationName', async (req, res, next) => {
	try {
		let {organizationName} = req.params;
		organizationName = organizationName.substring(0, organizationName.length - 1);
		let volunteers = await DButils.execQuery(`SELECT * FROM volunteerUsers where organizationName= '${organizationName}'`);
		res.send(JSON.parse(JSON.stringify(volunteers)));

	} catch (error) {
		next(error);
	}
});

router.post('/assign', async (req, res, next) => {
	try {
		const {volunteerUsername, volunteerServices} = req.body;
		let volunteerDetails = await DButils.execQuery(`SELECT * FROM volunteerUsers where userName= '${volunteerUsername}'`);
		volunteerDetails = DButils.convertVolunteerDetailsFromDB(volunteerDetails)[0];

		let elderlyDetails = await DButils.execQuery(`SELECT * FROM elderlyUsers`);
		elderlyDetails = DButils.convertElderlyDetailsFromDB(elderlyDetails);
		let elderlyWithSameServicesAsVolunteer = [];

		//take only the elderly with the same wanted service as the volunteer service
		for (let elderly of elderlyDetails) {
			const foundSameServices = elderly.wantedServices.some(r => volunteerServices.includes(r));
			if (foundSameServices) {
				elderlyWithSameServicesAsVolunteer.push(elderly);
			}
		}

		console.log('elderlyWithSameServicesAsVolunteer');
		console.log(elderlyWithSameServicesAsVolunteer);

		let rankForEachElderly = [];
		if (elderlyWithSameServicesAsVolunteer.length > 0) {
			let elderlyWithSamePreferredDays = [];
			for (let elderly of elderlyWithSameServicesAsVolunteer) {
				//handle preferred days
				for (let preferredDayElderly of elderly.preferredDays) {
					for (let preferredDayVolunteer of volunteerDetails.preferredDays) {
						if (preferredDayElderly === preferredDayVolunteer) {
							elderlyWithSamePreferredDays.push({
								elderly: elderly,
								preferredDayElderly: preferredDayElderly
							});
						}
					}
				}
			}
			console.log('elderlyWithSamePreferredDays');
			console.log(elderlyWithSamePreferredDays);

			if (elderlyWithSamePreferredDays.length > 0) {
				let finalRank = 0;
				let rankForLanguage = 0;
				let rankForGender = 0;
				let rankForInterest = 0;
				for (let elderlyWithDay of elderlyWithSamePreferredDays) {
					//handle languages
					const foundSameLanguage = elderlyWithDay.elderly.languages.some(r => volunteerDetails.languages.includes(r));
					if (foundSameLanguage) {
						rankForLanguage = 1;
					}
					//handle gender
					// const foundSameGender = elderly.genderToMeetWith.some(r => volunteerDetails.gender.includes(r))
					// if (foundSameGender) {
					//     rankForGender=1
					// }
					//handle areaOfInterest
					const foundSameInterest = elderlyWithDay.elderly.areasOfInterest.some(r => volunteerDetails.areasOfInterest.includes(r));
					if (foundSameInterest) {
						rankForInterest = 1;
					}

					finalRank = 0.7 * rankForLanguage + 0.3 * rankForInterest;
					rankForEachElderly.push({
						elderly: elderlyWithDay.elderly,
						preferredDay: elderlyWithDay.preferredDayElderly,
						finalRank: finalRank,
						volunteerUsername: volunteerUsername
					});
				}

				rankForEachElderly.sort(function (a, b) {
					return b.finalRank - a.finalRank;
				});

				res.send(rankForEachElderly);
			}
		}

		res.send();
	} catch (error) {
		next(error);
	}
});

router.post('/addMeeting', async (req, res, next) => {
	try {
		const meetingDayAndHour = req.body.user.actualDate;
		const volunteerUsername = req.body.user.volunteerUsername;
		const elderlyUsername = req.body.user.elderly.userName;
		const channelName = volunteerUsername+elderlyUsername+meetingDayAndHour;
		console.log(meetingDayAndHour);
		console.log(volunteerUsername);
		console.log(elderlyUsername);
		console.log(channelName);

		await DButils.execQuery('Insert into meetings (volunteeruserName, elderlyuserName, meeting, channelName) '
			+ `VALUES ('${volunteerUsername}', '${elderlyUsername}', '${meetingDayAndHour}' ,'${channelName}');`);

	} catch (error) {
		next(error);
	}

});

module.exports = router;


