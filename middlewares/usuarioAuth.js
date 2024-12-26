<<<<<<< HEAD

function auth (req, res, next){
    if (req.session.usuario){
        next(); 
    } else {
        res.redirect("/usuarios/login");
    }
}

=======
function auth(req, res, next){
    if(req.session.email){   
    next();    
    } else{
    res.redirect("/usuarios/login");   
    }  
}
    
>>>>>>> 062ea15592da8532691077109f168ca4bad070df
module.exports = auth;