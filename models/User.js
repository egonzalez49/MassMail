//mongoose model class for user collection
const mongoose = require('mongoose');
//const Schema = mongoose.Schema;
const { Schema } = mongoose;

//properties of records in collection
const userSchema = new Schema({
  googleId: String,
  credits: { type: Number, default: 0 }
});

//creates new collection called users
mongoose.model('users', userSchema);
