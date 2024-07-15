const { Pool } = require('pg')

const pool = new Pool({
    user: process.env.DB_USER,
    host: process.env.DB_HOST,
    database: process.env.DB_NAME,
    password: process.env.DB_PASSWORD,
    port: process.env.DB_PORT,
})

const insertDataIntoDb = async (data) => {
    const client = await pool.connect()
    try {
        await client.query('DROP TABLE IF EXISTS test_table')
        await client.query('CREATE TABLE test_table (timestamp TIMESTAMP, value FLOAT, category VARCHAR)')

        const insertPromises = data.map(row => {
            return client.query('INSERT INTO test_table (timestamp, value, category) VALUES ($1, $2, $3)', [row.timestamp, row.value, row.category])
        })

        await Promise.all(insertPromises)
    } finally {
        client.release()
    }
}

module.exports = {
    insertDataIntoDb
}