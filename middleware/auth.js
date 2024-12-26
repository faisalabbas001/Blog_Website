const {ValidateTokenForUser}=require("../services/authentication");

function checkForAuthentication(cookieName){  
    return (req, res, next) => {  
        const tokenCookieValue = req.cookies[cookieName];  
        if (!tokenCookieValue) {  
            return next();  
        }  
        try {  
         
            const userPayload = ValidateTokenForUser(tokenCookieValue);  
            req.user = userPayload; 
            return next(); 
        } catch (error) {  
            return next(); 
        }  
    }  
}


module.exports=checkForAuthentication