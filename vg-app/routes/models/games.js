const mongoose = require('mongoose');
const moment = require('moment')


const GameSchema = new mongoose.Schema({
  title: { type: String, required: true, lowercase: true },
  description: { type: String,  required: true, lowercase: true },
  yearreleased: { type: String, required: true },
  playtime: { type: String,  required: true, lowercase: true },
  image: { type: String,  required: true, lowercase: true },
  timestamp:{ type: String , default: () => moment().format('dddd,MMMM Do YYYY, h:mm a')}
});

module.exports = mongoose.model('Game', GameSchema);
