import mysql from 'mysql2/promise';

export default async function query(query,values=[])
{
   // console.log('okkk')
    try {
        const connection = await mysql.createConnection({
            host: 'localhost',
            user: 'root',
            password:'',
            database: 'nextapp',
        });
        const [results, fields] = await connection.execute(
            query,
            values
        );
        
        console.log(results); 
        console.log(fields); 
        connection.end()
        return results
    } catch (err) {
        
         console.log(err);
         return err
    }
}
// import mysql from 'mysql2/promise';

// export default async function query(query,values=[])
// {
//    // console.log('okkk')
//     try {
//         const pool =  mysql.createPool({
//             host: 'localhost',
//             user: 'root',
//             database: 'nextapp',
//             password:'',
//             waitForConnections: true,
//             connectionLimit: 10,
//             maxIdle: 10, // max idle connections, the default value is the same as `connectionLimit`
//             idleTimeout: 60000, // idle connections timeout, in milliseconds, the default value 60000
//             queueLimit: 0,
//             enableKeepAlive: true,
//             keepAliveInitialDelay: 0,
//         });
//         const connection = await pool.getConnection();

//         const [results, fields] = await connection.execute(
//             query,
//             values
//         );
        
//         console.log(results); 
//         console.log(fields); 
//         connection.release()
//         return results
//     } catch (err) {
        
//          console.log(err);
//          return err
//     }
// }