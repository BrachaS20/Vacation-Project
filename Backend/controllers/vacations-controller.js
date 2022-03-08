const express = require("express");
const fs = require("fs");
const path = require("path"); // Node.js package dealing with paths
const uuid = require("uuid"); // npm i uuid
const vacationsLogic = require("../bl/vacations-logic");
const errorsHelper = require("../helpers/errors-helper");
const verifyLoggedIn = require("../middleware/verify-logged-in");
const FollowModel = require("../models/follow-model");
const VacationModel = require("../models/vacation-model");
const router = express.Router();

// Get "http://localhost:3010/api/vacations/followers"
router.get("/followers", async (request, response) => {
    try {
        const followers = await vacationsLogic.getAllFollowersAsync();
        response.json(followers);
    }
    catch (err) {
        response.status(500).send(errorsHelper.getError(err));
    }
});

// Get "http://localhost:3010/api/vacations"
router.get("/", verifyLoggedIn, async (request, response) => {
    try {
        const vacations = await vacationsLogic.getAllVacationsAsync();
        response.json(vacations);
    }
    catch (err) {
        console.log(err);
        response.status(500).send(errorsHelper.getError(err));
    }
});

// Get "http://localhost:3010/api/vacations/5" ==> 5 is a vacation id
router.get("/:id", async (request, response) => {
    try {
        const vacation_id = +request.params.id;
        const vacation = await vacationsLogic.getOneVacationsAsync(vacation_id);
        response.json(vacation);
    }
    catch (err) {
        response.status(500).send(errorsHelper.getError(err));
    }
});

// Post "http://localhost:3010/api/vacations"
router.post("/", verifyLoggedIn, async (request, response) => {
    try {
        const vacation = new VacationModel(request.body);

        // if user didn't sent any file to this route:
        if (!request.files) return response.status(400).send("No image sent!");

        // Take the sent image:
        const image = request.files.image; // coolPicture is the name given to the <input> tag
        
        // If user sent some other name = send back 400 status:
        if (!image) return response.status(400).send("No image sent!");

        // Find the image extention:
        const extension = image.name.substr(image.name.lastIndexOf(".")); // .jpg / .png / .gif
        
        // Create new file name:
        const newFileName = uuid.v4() + extension;

        // Replace the exist image name with the new file name:
        vacation.imageName = newFileName;

        // Validations:
        const errors = vacation.validatePost();
        if (errors) return response.status(400).send(errors); // Always return validation errors to the front.

        const addedVacation = await vacationsLogic.addVacationsAsync(vacation);

        // Save the image file to the disk:
        await image.mv("./images/" + newFileName); // mv = move

        response.status(201).json(addedVacation);
    }
    catch (err) {
        response.status(500).send(errorsHelper.getError(err));
    }
});

// Post "http://localhost:3010/api/vacations/follow"
router.post("/follow", async (request, response) => {
    try {
        const follower = new FollowModel(request.body);
        const followVacation = await vacationsLogic.addFollowVacationAsync(follower);
        response.status(201).json(followVacation);
    }
    catch (err) {
        response.status(500).send(errorsHelper.getError(err));
    }
});

// Post "http://localhost:3010/api/vacations/unfollow"
router.post("/unfollow", async (request, response) => {
    try {
        const follower = new FollowModel(request.body);
        const unfollowVacation = await vacationsLogic.deleteFollowVacationAsync(follower);
        response.status(201).json(unfollowVacation);
    }
    catch (err) {
        response.status(500).send(errorsHelper.getError(err));
    }
});

// Put "http://localhost:3010/api/vacations/5" ==> 5 is a vacation id
router.put("/:id", verifyLoggedIn, async (request, response) => {
    try {
        const vacation_id = +request.params.id;
        const vacation = new VacationModel(request.body);
        vacation.id = vacation_id;

        // if user didn't sent any file to this route:
        if (!request.files) return response.status(400).send("No image sent!");

        // Take the sent image:
        const image = request.files.image; // coolPicture is the name given to the <input> tag
        
        // If user sent some other name = send back 400 status:
        if (!image) return response.status(400).send("No image sent!");

        // Find the image extention:
        const extension = image.name.substr(image.name.lastIndexOf(".")); // .jpg / .png / .gif
        
        // Create new file name:
        const newFileName = uuid.v4() + extension;

        // Replace the exist image name with the new file name:
        vacation.imageName = newFileName;
        
        // Validations:
        const errors = vacation.validatePut();
        if (errors) return response.status(400).send(errors); // Always return validation errors to the front.

        const updatedVacation = await vacationsLogic.updateVacationAsync(vacation);
        if (!updatedVacation) return response.status(404).send(`ID ${vacation_id} not found.`);
        
        // Save the image file to the disk:
        await image.mv("./images/" + newFileName); // mv = move
        response.json(updatedVacation);
    }
    catch (err) {
        response.status(500).send(errorsHelper.getError(err));
    }
});

// Delete "http://localhost:3010/api/vacations/5" ==> 5 is a vacation id
router.delete("/:id", verifyLoggedIn, async (request, response) => {
    try {
        const vacation_id = +request.params.id;
        const deletedVacation = await vacationsLogic.deleteVacationAsync(vacation_id);
        response.status(204).json(deletedVacation);
    }
    catch (err) {
        response.status(500).send(errorsHelper.getError(err));
    }
});

// Get "http://localhost:3010/api/vacations/images/12345.jpg" ==>  12345.jpg is a image name 
router.get("/images/:name", (request, response) => {
    try {
        const name = request.params.name;

        // Get the image from disk
        let absolutePath = path.join(__dirname, "..", "images", name);

        // If image not found, get 'not-found' image
        if(!fs.existsSync(absolutePath)) {
            absolutePath = path.join(__dirname, "..", "images", "not-found.jpg");
        }

        // Send the image file and show in the page
        response.sendFile(absolutePath);    
    }
    catch (err) {
        response.status(500).send(errorsHelper.getError(err));
    }
});

module.exports = router;