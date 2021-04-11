

// Requires
const chalk = require('chalk');
const express = require('express');
const app = express();


// Configuration
require('dotenv').config();
require('express-async-errors');
require("./configuration/routes")(app, express);
require("./configuration/db")(chalk);


// Port
const port = process.env.PORT;
app.listen(port, () => console.log(chalk.yellow(`Listening on port ${port}...`)));