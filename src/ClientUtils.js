exports.serverURL = 'http://132.72.23.153:8114';

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