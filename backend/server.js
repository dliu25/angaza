const express = require("express");
const mysql = require("mysql");
const cors = require("cors");

const app = express();
app.use(cors());

const db = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: 'password',
    database: "sys"
});

db.connect((err) => {
    if (err) {
        console.error('Error connecting to MySQL database: ' + err.stack);
        return;
    }
    console.log('Connected to MySQL database as id ' + db.threadId);
});

app.get('/', (req, res) => {
    return res.json("From Backend Server");
});

app.get('/users', (req, res) => {
    const sql = "SELECT * FROM users";
    db.query(sql, (err, data) => {
        if (err) {
            console.error('Error querying database: ' + err.stack);
            return res.json(err);
        }
        return res.json(data);
    });
});

const PORT = process.env.PORT || 5050;
app.listen(PORT, () => {
    console.log(`Server is listening on port ${PORT}`);
});