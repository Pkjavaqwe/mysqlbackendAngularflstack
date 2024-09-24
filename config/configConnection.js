var mysql = require('mysql2/promise');
var connection;

async function makeConnection(){
     connection = await mysql.createConnection({
        host: '127.0.0.1',    
        user: 'root', 
        password: 'Admin@123', 
        database: 'products' 
    });

    connection.connect().then((success)=>{

        console.log("connected....");
        
    
    }).catch((err)=>console.log(err));
    return connection;
    }

    makeConnection();

   
    module.exports = makeConnection;