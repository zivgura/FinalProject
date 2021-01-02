const sql = require("mssql");

const config = {
    user: "elderlyserveradmin",
    password: "erancH99",
    server: "elderlyserver.database.windows.net",
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


















