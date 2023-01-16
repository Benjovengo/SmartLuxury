require('dotenv').config({ path: "../../.env" })
let mysql      = require('mysql');


function insert_data() {
  let connection = mysql.createConnection({
    port     : 3306,
    host     : '127.0.0.1',
    user     : process.env.MYSQL_USERNAME,
    password : process.env.PASSWORD,
    database : 'products'
  });
  connection.connect();

var sql = "INSERT INTO product_description (title, product_id) \
    VALUES ('Test', 9)";
connection.query(sql, function (err, result) {
  if (err) throw err;
    console.log("1 record inserted");
  });
  
  console.log('Item included in DB.');
  
  connection.end();
}

/* connection.query('SELECT * from product_description', function(err, rows, fields) {
  if (err) throw err; */