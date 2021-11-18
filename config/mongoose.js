const mongoose = require('mongoose');
const env = require('./enviornment');
mongoose.connect(`mongodb+srv://${env.db}`);

const db = mongoose.connection;

db.on('error', function () {
  console.log('Error connectng to DataBase :: MongoDB');
});

db.once('open', function () {
  console.log('Sucessfully connected to DataBase :: MongoDB');
});

module.exports = db;
