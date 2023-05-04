var mongoose = require('mongoose');

var userSchema = mongoose.Schema({
    name:String,
    emailId:String,
    userRole:String,
    hourlyrate:Number,
    totalHour:Number
})

var userModel = mongoose.model('user', userSchema);

var user= new userModel();