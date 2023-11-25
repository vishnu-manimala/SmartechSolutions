const mongoose = require('mongoose');



const userSchema = new mongoose.Schema({
    name:{
        type: String,
    },
    username:{
        type: String,
    
    },
    contactNumberPersonal:{
        type:String,
        
    },
    contactNumberOfficial:{
        type:String,
       
    },
    password:{
        type: String,
        
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