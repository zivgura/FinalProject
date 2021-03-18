const express = require('express');
const bcrypt = require('bcrypt');
const DButils = require('../DButils.js');
const router = express.Router();

bcrypt_saltRounds = 13;

router.post('/login', async (req, res, next) => {
	try {
		let {username, password} = req.body;
		console.log('username ' + username);
		console.log('password ' + password);

		// check that username exists
		let users = await DButils.execQuery('SELECT userName FROM users');
		console.log(users);
		if (!users.find((x) => x.userName === username))
			throw {status: 401, message: 'Username incorrect'};

		// check that the password is correct
		const user = (
			await DButils.execQuery(
				`SELECT * FROM users WHERE username = '${username}'`
			)
		)[0];

		if (!bcrypt.compareSync(password, user.password)) {
			throw {status: 401, message: 'Username or Password incorrect'};
		}
		// Set cookie
		// req.session.user_id = user.user_id;
		//req.session.save();
		res.status(200).send({user: user, message: 'login succeeded', success: true});
	} catch (error) {
		// next(error);
		console.log(error);
		res.status(401).send({message: error.message, success: false});
	}
});

module.exports = router;
