const path = require('path');
const express = require('express');
const morgan = require('morgan');
const routes = require('./routes/index.js');
const ApiError = require('./util/ApiError');
const httpStatus = require('http-status');
const cors = require('cors');
const app = express();
const port = 8080;

const db = require('./config/db');
// const methodOverride = require('method-override');

// Connect to DB
db.connect();

// app.use(bodyParser.urlencoded({extended: false}));
// app.use(bodyParser.json());

app.use(express.json()) // for parsing application/json
app.use(express.urlencoded({ extended: true })) // for parsing application/x-www-form-urlencoded

// HTTP logger
app.use(morgan('combined'));

app.use(cors())

app.use(routes);

app.use((req, res, next) => {
    next(new ApiError(httpStatus.NOT_FOUND, 'Not found'))
})

app.listen(port, () => {
    console.log(`Listening at http://localhost:${port}`);
})
