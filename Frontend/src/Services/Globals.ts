// General globals for development and production: 
abstract class Globals {

    public isAdmin(): boolean {
        const admin = JSON.parse(localStorage.getItem("user"));

        if(!admin) {
            return;
        }
        
        if (admin.username === "admin"){
            return true;
        }
    };

}



// General globals only for development:
class DevelopmentGlobals extends Globals {
    public vacationsUrl = "http://localhost:3010/api/vacations/";
    public registerUrl = "http://localhost:3010/api/auth/register/";
    public loginUrl = "http://localhost:3010/api/auth/login/";
}

// General globals only for production:
class ProductionGlobals extends Globals {
    public vacationsUrl = "http://www.mysite.com/api/products/";
    public registerUrl = "http://www.mysite/api/auth/register/";
    public loginUrl = "http://www.mysite/api/auth/login/";
}

const globals = process.env.NODE_ENV === "production" ? new ProductionGlobals() : new DevelopmentGlobals();

export default globals;