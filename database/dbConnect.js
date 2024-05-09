const mongoose = require('mongoose');

module.exports = async(req, res)=>{
    try{
        await mongoose.connect('mongodb+srv://chunu1991:02tSF8gKQqbVakNi@cluster0.z6sqxfa.mongodb.net/?retryWrites=true&w=majority',{
            useNewUrlParser: true,
            useUnifiedTopology: true,
        }).then(()=>{
            console.log("Server connected to database...");
        }).catch((err)=>{
            console.log(err)
        })
    } catch(err){
        console.log(err.message);
    }
}
