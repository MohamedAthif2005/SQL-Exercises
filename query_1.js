const express = require("express");
const { appendFile } = require("fs");
const { connect } = require("http2");
const mysql = require("mysql");


const app = express();
const port = 3000;

const connection = mysql.createConnection({
    "host":"localhost",
    "user":"root",
    "password":"",
    "port":"3306"
})

connection.connect((err)=>
{
    if(err) throw err;
    console.log("Connected to mysql");

    connection.query("CREATE DATABASE IF NOT EXISTS queries",(err)=>
    {
        if(err) throw err;
        console.log("Database created");

        connection.changeUser({database:"queries"},(err)=>
        {
            if(err) throw err;
            console.log("Connected to database");

            const table=`CREATE TABLE IF NOT EXISTS Employees (
            id INT AUTO_INCREMENT PRIMARY KEY,
            name VARCHAR(255),
            department VARCHAR(255),
            salary INT
            )`;

            connection.query(table,(err)=>
            {
                if (err) throw err;
                console.log("Table created");

                connection.query("TRUNCATE TABLE employees",(err)=>
                {
                    if (err) throw err;
                    console.log("Table truncated");
                    
                    const insert = `INSERT INTO Employees (name,department,salary) VALUES 
                ('Alice','HR',40000),('Bob','IT',55000),('Charlie','Finance','60000'),('Diana','IT','52000'),('Ethan','Finance','45000')`;

                    connection.query(insert,(err)=>
                    {
                        if (err) throw err;
                        console.log("Values inserted");

                        connection.query("SELECT name , salary FROM employees WHERE department=? AND salary>?",['IT',50000],(err,results)=>{
                            if(err) throw err;
                            console.log(`Result : \n`,results);
                            connection.end();
                        });
                    });
                })

                
            });
        });
    });
});

//Query Running



app.listen(port,()=>
console.log("Runnign on https://localhost/3000"));