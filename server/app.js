

// Requires
const chalk = require('chalk');
const express = require('express');
const app = express();


// StartUp
require('dotenv').config();
require('express-async-errors');
require("./startup/routes")(app, express);
require("./startup/db")(chalk);


// Port
const port = process.env.PORT;
app.listen(port, () => console.log(chalk.yellow(`Listening on port ${port}...`)));