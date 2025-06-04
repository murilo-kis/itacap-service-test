const sql = require('mssql')

sql.on('error', err => {
    console.log(err)
})

const sqlConfig = {
    user: "sa",
    password: "<password>",
    database: "itacqr",
    server: '34.66.246.196',
    pool: {
        max: 10,
        min: 0,
        idleTimeoutMillis: 30000
    },
    options: {
        encrypt: false, // for azure
        trustServerCertificate: true // change to true for local dev / self-signed certs
    }
}
console.log(`sqlConfig: ${JSON.stringify(sqlConfig)}`)


const getUsers = async () => {
    try {
        // make sure that any items are correctly URL encoded in the connection string
        await sql.connect(sqlConfig)
        const result = await sql.query`select * from users`
        console.dir(result)
    } catch (err) {
        console.log(err)
    }
}

getUsers()
