# 📚 SQL Practice with Node.js

This repository contains my **daily SQL practice**, solved using **Node.js** with MySQL.  
Each question is saved in its own JavaScript file with a **clear format**:
1. Question details at the top (difficulty, concept, table, and task)
2. Node.js code that creates the database, inserts sample data, and runs the query

---

## 📂 Repository Structure

sql-practice-nodejs/
│
├── question1.js # Beginner - SELECT + WHERE
├── question2.js # Intermediate - GROUP BY + COUNT + HAVING
├── summary.md # Progress tracker of all solved questions
└── README.md # This file

---

## 📌 My File Format

Every program follows this format:

```javascript
/**
 * SQL PRACTICE - QUESTION X
 * Difficulty: Beginner / Intermediate / Advanced
 * Concept: Main SQL concept tested
 *
 * Question:
 * [Clear problem statement here]
 *
 * Table: [table name]
 * Columns:
 *  - column_name (type)
 *  - ...
 *
 * Example Data:
 * (value1, value2, ...)
 * ...
 */

const express = require("express");
const mysql = require("mysql");

// Node.js + MySQL code here
How to Run a Question File
Install dependencies:
   npm install express mysql
Make sure MySQL is running locally and you have access with:
   
   user: root
   
   password: `` (empty, or update in code)
   
   port: 3306

Run any question file:
   node question2.js
