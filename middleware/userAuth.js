const isLoggedIn = (req,res,next)=>{
    if(req.session.userId){
        next()
    }else{
        res.status(401).redirect("/")
    }
}

const isLoggedOut = (req,res,next) =>{
    if(req.session.userId){
        res.status(400).redirect('/home');
    }else{
        next()
    }
}

module.exports = {
    isLoggedIn,
    isLoggedOut
}