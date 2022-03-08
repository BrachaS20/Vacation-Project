const uuid = require("uuid"); // npm i uuid
const dal = require("./dal");
const jwtHelper = require("../helpers/jwt-helper");
const cryptoHelper = require("../helpers/crypto-helper");

async function registerAsync(user) {

    // Get all username equal to the new username
    const checkUsername = `SELECT * from users WHERE username = "${user.username}"`;
    const result = await dal.executeAsync(checkUsername);
    
    // If the username is already exist, return 0(will send error), else- continue
    if (result.length > 0) {
        return 0;
    } else {

        // Hash password: 
        user.password = cryptoHelper.hash(user.password);

        // Create uuid:
        user.uuid = uuid.v4();

        const firstName = user.firstName.replace('"','""');
        const lastName = user.lastName.replace('"','""');
        const username = user.username.replace('"','""');

        const sql = `INSERT INTO users VALUES(DEFAULT, "${user.uuid}", "${firstName}", "${lastName}", "${username}", "${user.password}")`;
        const new_user = await dal.executeAsync(sql);

        user.userID = new_user.insertId; // this is the new created id.

        // Delete password so it won't returned to the frontend:
        delete user.password;
    
        // Generate new token:
        user.token = jwtHelper.getNewToken(user);
    
       return user;
    }

}

async function loginAsync(credentials) {

    // Get back all columns without password:
    const sql = `SELECT userID, uuid, firstName, lastName, username FROM users WHERE username = "${credentials.username}" AND password = "${credentials.password}"`;
    const users = await dal.executeAsync(sql);
    if (users.length === 0) return null;
    const user = users[0];

    // Generate new token:
    user.token = jwtHelper.getNewToken(user);

    return user;
}

module.exports = {
    registerAsync,
    loginAsync
};
