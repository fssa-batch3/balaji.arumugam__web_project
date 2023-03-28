var mysql = require('mysql');
var con = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "password",
    database: "check"
});
con.connect(function (err) {
    if (err) {
        throw err;
    }
    else {
        console.log("Connected!");
    }
});

let result;
con.query("select * from bitwise_user", function (err,res) {
    if (err) {
        throw err;
    }
    else {
        // result=res;
        console.log(res);
        // console.log(res.exports);
        console.log("executed!")
    }
    result=res;
    // console.log(result)
    // result1();

});

// function result1(){
//     console.log(result)
// }
// console.log(result)

module.exports = exports["default"];

// console.log(result)
