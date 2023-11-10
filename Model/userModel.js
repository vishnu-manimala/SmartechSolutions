const mongoose = require('mongoose');



const userSchema = new mongoose.Schema({
    name:{
        type: String,
    },
    username:{
        type: String,
        required : true
    },
    contactNumberPersonal:{
        type:String,
        unique:true
    },
    contactNumberOfficial:{
        type:String,
        required: true,
        unique:true
    },
    password:{
        type: String,
        required: true
    },
    isBlocked: {
        type: Boolean,
        default: false
    },
    department:{
        type:String,
    },
    Default_PW:{
        type:String
    }
});

module.exports = mongoose.model('user',userSchema);