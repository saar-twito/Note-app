const cors = require("cors");
const note = require('../routes/note');
const auth = require('../routes/auth');
const status = require('../routes/status');
const error = require('../middleware/error');

module.exports = (app, express) => {
    app.use(express.json());
    app.use(cors());
    app.use("/auth", auth);
    app.use("/note", note);
    app.use("/status", status);
    app.use(error);
}
