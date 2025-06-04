async function example1() {
    const mysql = require('mysql2/promise');
    // const conn = await mysql.createConnection({
    //     "host": "localhost",
    //     "port": "3333",
    //     "user": "root",
    //     "database": "itac_ap",
    //     "waitForConnections": true,
    //     "connectionLimit": 10,
    //     "maxIdle": 2,
    //     "idleTimeout": 60000,
    //     "queueLimit": 0,
    //     "enableKeepAlive": true,
    //     "keepAliveInitialDelay": 0
    // });
    const pool = await mysql.createPool({
        "port": "3333",
        "user": "root",
        "database": "itac_ap",
        "waitForConnections": true,
        "connectionLimit": 10,
        "maxIdle": 2,
        "idleTimeout": 60000,
        "queueLimit": 0,
        "enableKeepAlive": true,
        "keepAliveInitialDelay": 0
    });

    // await
    try {
        // For pool initialization, see above
        const [rows, fields] = await pool.query('select * from itac_ap.users');
        console.log(`rows: ${JSON.stringify(rows)}`);
        // Connection is automatically released when query resolves
    } catch (err) {
        console.log(err);
    }

    pool.end()

}

example1()

//     const [rows, fields] = await conn.execute('select * from itac_ap.users');
//     console.log(`rows: ${JSON.stringify(rows)}`);
//     await conn.end();
// }
//
// try {
//     example1().catch(e=>console.error("KABOOM!", e))
// } catch (e) {
//     console.error("KABOOM2!", e)
// }