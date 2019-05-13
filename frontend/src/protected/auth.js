import Cookies from "universal-cookie";
const cookies = new Cookies();
class Auth {
    constructor(){
        this.authenticated = false
    };

    login(){
        this.authenticated = true
        console.log("login SS");
        
}
    logout(){
        this.authenticated = false
        console.log("logout SS");
        
    }

    isAuthenticated(){
        if(cookies.get('AuthCookie')){return true;}
        else {return false;}
         //return this.authenticated 
    }

}

export default new Auth();