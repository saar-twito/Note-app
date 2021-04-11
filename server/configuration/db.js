const mongoose = require('mongoose');

module.exports = (chalk) => {
    mongoose.connect(process.env.DB,
        {
            useNewUrlParser: true,
            useUnifiedTopology: true,
            useCreateIndex: true
        })
        .then(() => chalk.yellow(`Connected to NoteApp...`))
        .catch(() => chalk.red(`Could not connect to NoteApp`))
}
