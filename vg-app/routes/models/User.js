const mongoose = require('mongoose');
const moment = require('moment')



const UserSchema = new mongoose.Schema({
  name: { type: String, required: true, lowercase: true },
  username: { type: String, unique: true, required: true, lowercase: true },
  email: { type: String, unique: true, required: true, lowercase: true },
  password: { type: String, required: true, min: 3 },
  admin: { type: Boolean , default: false },
  favorite: [{type: mongoose.Schema.Types.ObjectId , ref: 'Game'}],
  timestamp:{ type: String , default: () => moment().format('dddd,MMMM Do YYYY, h:mm a')}
});

module.exports = mongoose.model('user', UserSchema);
