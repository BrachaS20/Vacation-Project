const express = require("express");
const authLogic = require("../bl/auth-logic");
const errorsHelper = require("../helpers/errors-helper");
const CredentialsModel = require("../models/credentials-model");
const UserModel = require("../models/user-model");
const router = express.Router();

// Post "http://localhost:3010/api/auth/register"
router.post("/register", async (request, response) => {
    try {
        const user = new UserModel(request.body);

        // Joi validation
        const errors = user.validatePost();
        if (errors) return response.status(400).send(errors); // Always return validation errors to the front.

        const addedUser = await authLogic.registerAsync(user);
        
        // Validation to prevent username duplication
        if (addedUser === 0) {
            response.status(401).send("User Nsme is already taken.");
        } else {
            response.status(201).json(addedUser);
        }
    }
    catch (err) {
        response.status(500).send(errorsHelper.getError(err));
    }
});

// Post "http://localhost:3010/api/auth/login"
router.post("/login", async (request, response) => {
    try {
        const user = new CredentialsModel(request.body);

        // Joi validation
        const errors = user.validatePost();
        if (errors) return response.status(400).send(errors); // Always return validation errors to the front.

        const loggedInUser = await authLogic.loginAsync(user);

        // If username/password not exist, send error
        if (!loggedInUser) return response.status(401).send("Incorrect username or password.");
        response.json(loggedInUser);
    }
    catch (err) {
        response.status(500).send(errorsHelper.getError(err));
    }
});

module.exports = router;