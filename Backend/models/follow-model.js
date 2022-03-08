const Joi = require("joi");

class FollowModel {

    constructor(follower) {
        this.vacationID = follower.vacationID;
        this.followersNumber = follower.followersNumber;
        this.userID = follower.userID;
    }

    // Create post validation schema only once as a private (#) static object:
    static #postValidationSchema = Joi.object({
        vacationID: Joi.number().required().positive().integer(),
        followersNumber: Joi.number().required().min(0).max(10000),
        userID: Joi.number().required().positive().integer(),
    });

    
    validatePost() {
        const result = FollowModel.#postValidationSchema.validate(this, { abortEarly: false }); // abortEarly: false --> return all validation errors and not just one.
        return result.error ? result.error.message : null; // null = no errors.
    }
        
}

module.exports = FollowModel;