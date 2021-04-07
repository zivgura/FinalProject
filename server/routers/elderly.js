const express = require('express');
const router = express.Router();
const DButils = require('../DButils.js');

router.get('/channels/:userName', async (req, res, next) => {
	try {
		let {userName} = req.params;
		userName = userName.substring(0, userName.length - 1);
		let channels = await DButils.execQuery(`SELECT channelName FROM meetings WHERE elderlyuserName= '${userName}'`);
		console.log(channels);
		res.send(JSON.parse(JSON.stringify(channels)));

	} catch (error) {
		next(error);
	}
});

router.get('/details/:organizationName', async (req, res, next) => {
	try {
		let {organizationName} = req.params;
		console.log(organizationName);
		organizationName = organizationName.substring(0, organizationName.length - 1);
		let elderlyDetails = await DButils.execQuery(`SELECT * FROM elderlyusers WHERE organizationName= '${organizationName}'`);
		console.log(elderlyDetails);
		elderlyDetails = DButils.convertElderlyDetailsFromDB(elderlyDetails);
		res.send(JSON.stringify(elderlyDetails));
	} catch (error) {
		next(error);
	}
});

module.exports = router;