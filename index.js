var express = require('express');
var app = express();
const bodyparser = require("body-parser");
const port = 9999;
var router = require('./routers/router.js')
const path = require('path')
const session = require('express-session')
const db = require('./connect.js')
const MySQLtore = require('express-mysql-session')(session);

//untuk menjalankan req body
app.use(bodyparser.json())
//untuk menjalankan post 
app.use(bodyparser.urlencoded({extended:true}));
const sessionStorage = new MySQLtore({
    expiration : 24 * 60 * 60 * 100,
    clearExpired: true,
    createDatabaseTable: true,
},
db
);
app.use(session({
    secret: "secret-key",
    store: sessionStorage,
    resave: false,
    saveUninitialized: true,
}))

app.set("view engine","ejs");
app.set("views", "view");
// berfungsi untuk menggabungkan folder dengan folder public dan untuk mengakses folder public
app.use(express.static(path.join(__dirname,'public'),{
    setHeaders : (res,path ) => {
        // jika filenya berakhir dengan CSS maka atur headernya dengan contect Type CSS
        if (path.endsWith('.css')) {
            res.setHeader('Contect-Type','text/CSS')
        } else if (path.endsWith('.js')) {
            res.setHeader('Contect-Type','application/javascript')
        }
    }
}))

app.use(router)

//untuk memberi tahu server sudah berjalan 
app.listen(port, () => {
    console.log('server telah dibuat');
});