function auth(req, res, next){
    if(req.session.email){   
    next();    
    } else{
    res.redirect("/usuarios/login");   
    }  
}
    
module.exports = auth;