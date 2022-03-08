const path = require("path"); // Node.js package dealing with paths
const dal = require("./dal");
const filesHelper = require("../helpers/files-helper");

async function getAllVacationsAsync() {
    const sql = "SELECT vacationID as id, destination, description, DATE_FORMAT(arrival, '%Y-%m-%d') AS arrival, DATE_FORMAT(departure, '%Y-%m-%d') AS departure, price, followersNumber, imageName FROM vacations";
    const vacations = await dal.executeAsync(sql);
    return vacations;
}

async function getOneVacationsAsync(id) {
    const sql = `SELECT vacationID as id, destination, description, DATE_FORMAT(arrival, '%Y-%m-%d') AS arrival, DATE_FORMAT(departure, '%Y-%m-%d') AS departure, price, followersNumber, imageName FROM vacations
                WHERE vacationID = ${id}`
    const vacation = await dal.executeAsync(sql);
    return vacation[0];
}

async function addVacationsAsync(vacation) {

    const destination = vacation.destination.replace('"','""');
    const description = vacation.description.replace('"','""');

    const sql = `INSERT INTO vacations(destination, description, arrival, departure, price, followersNumber, imageName)
                VALUES("${destination}", "${description}", "${vacation.arrival}", "${vacation.departure}", ${vacation.price}, ${0}, "${vacation.imageName}")`;
    const info = await dal.executeAsync(sql);

    vacation.id = info.insertId; // this is the new created id.
    return vacation;
}

async function getAllFollowersAsync() {
    const sql = `SELECT vacations.followersNumber, followers.vacationID, followers.userID
                FROM vacations INNER JOIN followers
                ON vacations.vacationID = followers.vacationID
                ORDER BY followers.userID`;
    const followers = await dal.executeAsync(sql);
    return followers;
}

async function addFollowVacationAsync(follow) {

    const sql1 = `INSERT INTO followers(vacationID, userID)
                VALUES(${follow.vacationID}, ${follow.userID})`;
    await dal.executeAsync(sql1);

    const sql2 = `UPDATE vacations
                SET followersNumber = (${follow.followersNumber} + 1)
                WHERE vacationID = ${follow.vacationID}`
    await dal.executeAsync(sql2);
    return follow;
}

async function deleteFollowVacationAsync(unfollow) {

    const sql1 = `DELETE FROM followers
                WHERE vacationID = ${unfollow.vacationID}
                AND userID = ${unfollow.userID}`;
    const unfollowVacation = await dal.executeAsync(sql1);

    const sql2 = `UPDATE vacations
                SET followersNumber = (${unfollow.followersNumber} - 1)
                WHERE vacationID = ${unfollow.vacationID}`
    await dal.executeAsync(sql2);
    return unfollowVacation;
}

async function updateVacationAsync(vacation) {

    // Get one vacation info
    const vac = await getOneVacationsAsync(vacation.id);
    const json = JSON.stringify(vac);
    const obj = JSON.parse(json);
    const fileName = obj.imageName;

    const destination = vacation.destination.replace('"','""');
    const description = vacation.description.replace('"','""');

    const sql = `UPDATE vacations SET
                destination = "${destination}",
                description = "${description}",
                arrival = "${vacation.arrival}",
                departure = "${vacation.departure}",
                price = ${vacation.price},
                imageName = "${vacation.imageName}"
                WHERE vacationID = ${vacation.id}`
    const updatedVacation = await dal.executeAsync(sql);

    // Delete the old image from the folder
    const absolutePath = path.join(__dirname, "..", "images", fileName);
    filesHelper.safeDelete(absolutePath);

    return updatedVacation.affectedRows === 0 ? null : vacation;
}

async function deleteVacationAsync(id) {
    
    // Get one vacation info
    const vacation = await getOneVacationsAsync(id);
    const json = JSON.stringify(vacation);
    const obj = JSON.parse(json);
    const fileName = obj.imageName;

    const sql1 = `DELETE FROM followers
                WHERE vacationID = ${id}`;
    await dal.executeAsync(sql1);
    const sql2 = `DELETE FROM vacations
                WHERE vacationID = ${id}`;
    const deletedVacation = await dal.executeAsync(sql2);

    // Delete the image from the folder
    const absolutePath = path.join(__dirname, "..", "images", fileName);
    filesHelper.safeDelete(absolutePath);

    return deletedVacation;
}

module.exports = {
    getAllVacationsAsync,
    getOneVacationsAsync,
    addVacationsAsync,
    getAllFollowersAsync,
    addFollowVacationAsync,
    deleteFollowVacationAsync,
    updateVacationAsync,
    deleteVacationAsync
};