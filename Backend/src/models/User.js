const { Schema, model, Number } = require('mongoose');

const userSchema = new Schema({
    userName: String,
    name: String,
    lastnamePaterno: String,
    lastnameMaterno: String,
    password: String,
    phoneNumber: Number,
    addressCalle: String,
    addressColonia: String,
    codPostal: Number
}, {
    timestamps: true
});

module.exports = model('User', userSchema, 'users');