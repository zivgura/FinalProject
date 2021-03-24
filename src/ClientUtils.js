// HTTPS=true;SSL_CRT_FILE=certificate.crt;SSL_KEY_FILE=privateKey.key
// exports.serverURL = 'http://132.72.23.153:8114';
exports.serverURL = 'http://localhost:3001'

exports.regexes = {
    hebrewEnglishRegex: /^[a-z\u0590-\u05fe]+$/i,
    emailRegex: /[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/,
    passwordRegex: /^.{8,}$/,
    usernameRegex: /^[a-z\d._]+$/,
    phoneNumberRegex: /^\+?\d+(-\d+)*$/
};

exports.convertElderlyDetailsFromDB = function (records){
    records = records.map((dic) => {
        return {
            userName: dic.userName,
            firstName: dic.firstName,
            lastName: dic.lastName,
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
            additionalInformation: dic.additionalInformation,

        }
    })
    return records;
}

exports.convertVolunteerDetailsFromDB = function (records){
    records = records.map((dic) => {
        return {
            userName: dic.userName,
            firstName: dic.firstName,
            lastName: dic.lastName,
            city: dic.city,
            email: dic.email,
            gender: dic.gender,
            areasOfInterest: JSON.parse(dic.areasOfInterest),
            languages: JSON.parse(dic.languages),
            organizationName: dic.organizationName,
            services: JSON.parse(dic.services),
            preferredDays: JSON.parse(dic.preferredDays),
            digitalDevices: JSON.parse(dic.digitalDevices),
            additionalInformation: dic.additionalInformation,
        }
    })
    return records;
}