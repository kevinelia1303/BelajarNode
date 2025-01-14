const mysql2 = require('mysql2');

const dbpool = mysql2.createPool({
    host: process.env.DB_HOST,
    user: process.env.DB_USERNAME,
    database: process.env.DB_NAME
  });



module.exports = dbpool.promise();

// app.use('/', (req, res) => {
//     pool.getConnection((err, connection) => {
//         if(err) throw err
//         console.log('connected as id ' + connection.threadId)
//         connection.query('SELECT * from users', (err, rows) => {
//             connection.release() // return the connection to pool

//             if (!err) {
//                 res.send(rows)
//             } else {
//                 console.log(err)
//             }

//             // if(err) throw err
//             console.log('The data from beer table are: \n', rows)
//         })
//     })
// })