const nodemailer = require('nodemailer');

const USER = 'televol.noreply@gmail.com';
const PASSWORD = 'ZivNadav1!';
const DOMAIN = 'http://localhost:3000/Tele-vol';

exports.sendConfirmationEmail = function ({username, email, password, firstName, lastName}) {
	// Return promise in order to use async/await or "then"
	return new Promise((res, rej) => {
		// Create transporter object with gmail service
		const transporter = nodemailer.createTransport({
			service: 'gmail',
			auth: {
				user: USER,
				pass: PASSWORD
			},
			tls: {
				rejectUnauthorized: false
			},
			secure: false
		});

		// Create a message you want to send to a user
		const message = {
			from: USER,
			// to: email // in production uncomment this
			// While we are testing we want to send a message to our selfs
			to: USER,
			subject: 'Tele-Vol - Activate Account',
			html: `
        <h3> שלום ${firstName + ' ' + lastName}</h3>
        <p>Thank you for registering into our Application. Much Appreciated! Just one last step is laying ahead of you...</p>
        <p>To activate your account please follow this link: <a target="_" href="${DOMAIN}/user/activate/${username}/${password}">${DOMAIN}/activate </a></p>
        <p>Cheers</p>
        <p>Your Application Team</p>
      `
		};

		// send an email
		transporter.sendMail(message, function (err, info) {
			if (err) {
				rej(err);
			}
			else {
				res(info);
			}
		});
	});
};