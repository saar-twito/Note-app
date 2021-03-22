const cors = require("cors");
const note = require('../routes/note');
const register = require('../routes/register');
const signIn = require('../routes/signIn');
const status = require('../routes/status');
const error = require('../middleware/error');

module.exports = (app, express) => {
    app.use(express.json());
    app.use(cors());
    app.use("/note", note);
    app.use("/signIn", signIn);
    app.use("/register", register);
    app.use("/status", status);
    app.use(error);
}
