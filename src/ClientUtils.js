import generator from 'generate-password';
// HTTPS=true;SSL_CRT_FILE=certificate.crt;SSL_KEY_FILE=privateKey.key
// exports.serverURL = 'http://132.72.23.153:8114';

const serverURL = 'http://localhost:3001';

const regexes = {
	hebrewEnglishRegex: /^[a-z\u0590-\u05fe -]+$/i,
	englishRegex: /^[a-z -]+$/i,
	emailRegex: /[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/,
	passwordRegex: /^.{8,}$/,
	usernameRegex: /^[0-9]{9}$/,
	phoneNumberRegex: /^[(]?[0-9]{3}[)]?[-\s]?[0-9]{3}[-\s]?[0-9]{4,6}$/i,
	yearRegex: /^(19|20)\d{2}$/
};

const generatePassword = function () {
	const password = generator.generate({
		length: 10,
		numbers: true,
		symbols: true,
		exclude:'/'
	});

	console.log(password);
	return password;
}

const convertElderlyDetailsFromDB = function(records) {
	records = records.map((dic) => {
		return {
			userName: dic.userName,
			firstName: dic.firstName,
			lastName: dic.lastName,
			birthYear: dic.birthYear,
			city: dic.city,
			email: dic.email,
			gender: dic.gender,
			areasOfInterest: JSON.parse(dic.areasOfInterest),
			languages: JSON.parse(dic.languages),
			organizationName: dic.organizationName,
			genderToMeetWith: dic.genderToMeetWith,
			wantedServices: JSON.parse(dic.wantedServices),
			preferredDays: JSON.parse(dic.preferredDays),
			digitalDevices: JSON.parse(dic.digitalDevices),
			additionalInformation: dic.additionalInformation

		};
	});

	return records;
};

const convertVolunteerDetailsFromDB = function (records) {
	records = records.map((dic) => {
		return {
			userName: dic.userName,
			firstName: dic.firstName,
			lastName: dic.lastName,
			birthYear: dic.birthYear,
			city: dic.city,
			email: dic.email,
			gender: dic.gender,
			areasOfInterest: JSON.parse(dic.areasOfInterest),
			languages: JSON.parse(dic.languages),
			organizationName: dic.organizationName,
			services: JSON.parse(dic.services),
			preferredDays: JSON.parse(dic.preferredDays),
			digitalDevices: JSON.parse(dic.digitalDevices),
			additionalInformation: dic.additionalInformation
		};
	});

	return records;
};

export {
	serverURL,
	regexes,
	generatePassword,
	convertElderlyDetailsFromDB,
	convertVolunteerDetailsFromDB
};