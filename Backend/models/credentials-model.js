const Joi = require("joi");

class CredentialsModel {

    constructor(user) {
        this.username = user.username;
        this.password = user.password;
    }

    // Create post validation schema only once as a private (#) static object:
    static #postValidationSchema = Joi.object({
        username: Joi.string().required().min(2).max(50),
        password: Joi.string().required().min(2).max(128),
    });

    
    validatePost() {
        const result = CredentialsModel.#postValidationSchema.validate(this, { abortEarly: false }); // abortEarly: false --> return all validation errors and not just one.
        return result.error ? result.error.message : null; // null = no errors.
    }
        
}

module.exports = CredentialsModel;