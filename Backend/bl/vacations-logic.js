const vacation_dal = require("../dal/vacation-dal");

async function getAllVacationsAsync() {
    const vacations = await vacation_dal.getAllVacationsAsync();
    return vacations;
}

async function getOneVacationsAsync(id) {
    const vacation = await vacation_dal.getOneVacationsAsync(id);
    return vacation;
}

async function addVacationsAsync(vacation) {
    const new_vacation = await vacation_dal.addVacationsAsync(vacation);
    return new_vacation;
}

async function getAllFollowersAsync() {
    const followers = await vacation_dal.getAllFollowersAsync();
    return followers;
}

async function addFollowVacationAsync(follow) {
    const follow_vacation = await vacation_dal.addFollowVacationAsync(follow);
    return follow_vacation;
}

async function deleteFollowVacationAsync(follow) {
    const follow_vacation = await vacation_dal.deleteFollowVacationAsync(follow);
    return follow_vacation;
}

async function updateVacationAsync(vacation) {
    const updated_vacation = await vacation_dal.updateVacationAsync(vacation);
    return updated_vacation;
}

async function deleteVacationAsync(id) {
    const deleted_vacation = await vacation_dal.deleteVacationAsync(id);
    return deleted_vacation;
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