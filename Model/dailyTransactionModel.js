const mongoose = require('mongoose');



const transactionSchema = new mongoose.Schema({
    date:{
        type: date,
        required : true
    },
    inOut:{
        type: String,
        required : true
    },
    contactNumberPersonal:{
        type:String,
     
    },
    givenBy:{
        type:String,
        required: true,
        
    },
    receivedBy:{
        type: String,
        required: true
    },
    Amount: {
        type: string,
        required: true
    },
    remarks:{
        type:String,
    },
    agreementIdName:{
        type:String,
        required: true
    },
    tax:{
        type:Boolean,
        required: true
    },
    isApproved:{
        type:Boolean,
        default:false
    }

});

module.exports = mongoose.model('transaction',transactionSchema);