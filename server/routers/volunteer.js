const express = require('express');
const router = express.Router();
const DButils = require('../DButils.js');

router.get('/meetings/:userName', async (req, res, next) => {
	try {
		let {userName} = req.params;
		userName = userName.substring(0, userName.length - 1);
		let meetingsPerElderly = await DButils.execQuery(`SELECT meeting,elderlyuserName FROM meetings WHERE volunteeruserName= '${userName}'`);
		console.log(meetingsPerElderly);
		res.send(JSON.parse(JSON.stringify(meetingsPerElderly)));

	} catch (error) {
		next(error);
	}
});

module.exports = router;