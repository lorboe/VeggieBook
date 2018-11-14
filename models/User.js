"use strict";

const mongoose = require('mongoose');
const Schema   = mongoose.Schema;

const userSchema = new Schema({
  username: {type: String, unique: true, required:true},
  password: String,
  email: {type: String, unique: true, required: true, match: /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/},
  //Kind of vegetable
  status: {type: String, enum: ["active", "inactive"], default: "inactive"},
  kind: String,
  age: Number,
  phoneNumber: String,
  hobbies: String,
  fears: String,
  //favorite foods to be in
  favFoods: String,
  darkSecret: String,
  confirmationCode: String,
  googleID: String,
  invitersId: [ String ],
  inviteesId: [ String ],
  friendsId: [ String ],
  imgName: {type: String, required: true, default:""},
  imgPath: {type: String, required: true, default:""},
  public_id: {type: String, required: true, default:""},
  resetPasswordToken: String,
  resetPasswordExpires: Date
}, {
  timestamps: {
    createdAt: 'created_at',
    updatedAt: 'updated_at'
  }
});

const User = mongoose.model('User', userSchema);
module.exports = User;
