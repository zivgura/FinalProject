const sql = require("mssql");

const config = {
    user: "elderly-server-admin",
    password: "ZivNadav2",
    server: "elderly-server.database.windows.net",
    database: "Elderly",
    connectionTimeout: 1500000,
    options: {
        encrypt: true,
        enableArithAbort: true
    }
};

const pool = new sql.ConnectionPool(config);
const poolConnect = pool
    .connect()
    .then(() => console.log("new connection pool Created"))
    .catch((err) => console.log(err));

exports.execQuery = async function (query) {
    await poolConnect;
    try {
        const result = await pool.request().query(query);
        return result.recordset;
    } catch (err) {
        console.error("SQL error", err);
        throw err;
    }
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
            additionalInformation: dic.additionalInformation
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
            additionalInformation: dic.additionalInformation
        }
    })
    return records;
}















