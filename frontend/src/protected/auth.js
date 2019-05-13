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
         return this.authenticated 
    }

}

export default new Auth();