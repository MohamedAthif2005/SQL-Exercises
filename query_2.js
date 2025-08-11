/**
 * SQL PRACTICE - QUESTION 2
 * Difficulty: Intermediate
 * Concept: GROUP BY + COUNT + HAVING
 *
 * Question:
 * Find all customer IDs who have placed more than 2 orders in total.
 *
 * Table: Orders
 * Columns:
 *  - order_id (INT, Primary Key, Auto Increment)
 *  - customer_id (INT)
 *  - product (VARCHAR)
 *  - quantity (INT)
 *  - price_per_unit (INT)
 *
 * Example Data:
 * (101, 'Laptop', 1, 55000)
 * (102, 'Mouse', 2, 500)
 * (101, 'Keyboard', 1, 1500)
 * ...
 */

const express = require("express");
const mysql = require("mysql");

const app = express();
const port = 3000;

const connection = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "",
    port: "3306"
});

connection.connect((err) => {
    if (err) throw err;
    console.log("Connected to MySQL");

    // Create database if not exists
    connection.query("CREATE DATABASE IF NOT EXISTS queries", (err) => {
        if (err) throw err;
        console.log("Database created / exists");

        // Switch to database
        connection.changeUser({ database: "queries" }, (err) => {
            if (err) throw err;
            console.log("Connected to database");

            // Create Orders table
            const table = `
                CREATE TABLE IF NOT EXISTS Orders (
                    order_id INT AUTO_INCREMENT PRIMARY KEY,
                    customer_id INT,
                    product VARCHAR(255),
                    quantity INT,
                    price_per_unit INT
                )
            `;
            connection.query(table, (err) => {
                if (err) throw err;
                console.log("Orders table created");

                // Clear old data
                connection.query("TRUNCATE TABLE Orders", (err) => {
                    if (err) throw err;
                    console.log("Orders table truncated");

                    // Insert sample data
                    const insert = `
                        INSERT INTO Orders (customer_id, product, quantity, price_per_unit) VALUES
                        (101, 'Laptop', 1, 55000),
                        (102, 'Mouse', 2, 500),
                        (101, 'Keyboard', 1, 1500),
                        (103, 'Laptop', 1, 55000),
                        (101, 'Mouse', 1, 500),
                        (102, 'Monitor', 2, 12000),
                        (101, 'Monitor', 1, 12000),
                        (103, 'Mouse', 3, 500)
                    `;
                    connection.query(insert, (err) => {
                        if (err) throw err;
                        console.log("Sample orders inserted");

                        const output = `
                            SELECT customer_id, COUNT(*) AS all_orders
                            FROM Orders 
                            GROUP BY customer_id
                            HAVING COUNT(*) > 2
                        `;
                        connection.query(output, (err, results) => {
                            if (err) throw err;
                            console.log(`Result:\n`, results);
                        });

                        connection.end();
                    });
                });
            });
        });
    });
});

app.listen(port, () =>
    console.log(`Running on http://localhost:${port}`)
);
