import mongoose, { Schema } from "mongoose";

const UserSchema = new Schema({
    name: {type: String, required: true},
    username: {type: String, required: true},
    idType: {type: String, required: true},
    phone: {type: Number, required: true},
    date: {type: Date, required: true},
    lastName: {type: String, required: true},
    email: {type: String, required: true},
    idNumber: {type: Number, required: true},
    password: {type: String, required: true}    
});

module.exports = mongoose.model('User', UserSchema);