const mysql = require('mysql')

const db = mysql.createConnection({
    host : "localhost",
    user : "root",
    password : "",
    database : "market_ahmad_xiirpl2"

});

db.connect(function (error) {
    if (error) throw error;
    console.log("Sempurna");
    
});

module.exports = db;