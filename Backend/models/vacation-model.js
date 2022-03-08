const Joi = require("joi");

class VacationModel {

    constructor(vacation) {
        this.id = vacation.id;
        this.destination = vacation.destination;
        this.description = vacation.description;
        this.arrival = vacation.arrival;
        this.departure = vacation.departure;
        this.price = vacation.price;
        this.followersNumber = vacation.followersNumber;
        this.imageName = vacation.imageName;
    }

    // Create post validation schema only once as a private (#) static object:
    static #postValidationSchema = Joi.object({
        id: Joi.forbidden(),
        destination: Joi.string().required().min(5).max(50),
        description: Joi.string().required().min(5).max(250),
        arrival: Joi.string().required().min(2).max(100),
        departure: Joi.string().required().min(2).max(100),
        price: Joi.number().required().min(0).max(10000),
        followersNumber: Joi.number().min(0).max(10000),
        imageName: Joi.string().required().min(2).max(150),
    });

    // Create put validation schema only once as a private (#) static object:
    static #putValidationSchema = Joi.object({
        id: Joi.number().required().positive().integer(),
        // id: Joi.forbidden(),
        destination: Joi.string().required().min(5).max(50),
        description: Joi.string().required().min(5).max(250),
        arrival: Joi.string().required().min(2).max(100),
        departure: Joi.string().required().min(2).max(100),
        price: Joi.number().required().min(0).max(10000),
        followersNumber: Joi.number().min(0).max(10000),
        imageName: Joi.string().required().min(2).max(150),
    });
    
    validatePost() {
        const result = VacationModel.#postValidationSchema.validate(this, { abortEarly: false }); // abortEarly: false --> return all validation errors and not just one.
        return result.error ? result.error.message : null; // null = no errors.
    }

    validatePut() {
        const result = VacationModel.#putValidationSchema.validate(this, { abortEarly: false }); // abortEarly: false --> return all validation errors and not just one.
        return result.error ? result.error.message : null; // null = no errors.
    }
    
}

module.exports = VacationModel;