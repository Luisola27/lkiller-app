const express = require("express");
const mysql = require('mysql');

const bodyParser = require('body-parser');

const PORT = process.env.PORT || 3050;

const app = express();

app.use(bodyParser.json());

const connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'america',
    database: 'lkiller'
});

// Route
app.get('/', (req, res) => {
    res.send('Welcom to my API!');
});

//all custumers
app.get('/customers', (req, res) => {
    const sql = 'SELECT * FROM customers';

    connection.query(sql, (error, results) => {
        if (error) throw console.log("[mysql error]", error);;
        if (results.length > 0) {
            res.json(results);
        } else {
            res.send('Not Result');
        }
    });

});

app.get('/customers/:id', (req, res) => {
    const { id } = req.params
    const sql = `SELECT * FROM customers WHERE id  = ${id}`
    connection.query(sql, (error, results) => {
        if (error) throw error;
        if (results.length > 0) {
            res.json(result);
        } else {
            res.send('Not Result');

        }
    });
})

app.post('/add', (req, res) => {
    const sql = 'INSERT INTO customers SET ?';

    const customerObj = {
        nombre: req.body.nombre,
        telefono: req.body.telefono
    }

    connection.query(sql, customerObj, error => {
        if (error) throw error;
        res.send('Customer created!');
    })

})

app.put('/update/:id', (req, res) => {
    const { id } = req.params;
    const { nombre, telefono } = req.body;
    const sql = `UPDATE customers SET nombre = '${nombre}', telefono='${telefono}' WHERE id = ${id}`;

    connection.query(sql, error => {
        if (error) throw error;
        res.send('Customer update!');
    });
});

app.delete('/delete/:id', (req, res) => {
    const { id } = req.params;
    const sql = `DELETE FROM customers WHERE id = ${id}`;

    connection.query(sql, error => {
        if (error) throw error;
        res.send('Delete costumer!');
    });
})

//Check connect}
connection.connect(error => {
    if (error) throw error;
    console.log('Database server running!');
});

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));