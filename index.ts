const express = require('express');
const mysql = require('mysql2');

const app = express();

app.listen('3000', () => {
    console.log('Server started on port 3000');
});

// res = respuestas
// status(500) = numero del error