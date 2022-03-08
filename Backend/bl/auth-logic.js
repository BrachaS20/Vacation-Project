const auth_dal = require("../dal/auth-dal");
const cryptoHelper = require("../helpers/crypto-helper");

async function registerAsync(user) {
    const new_user = await auth_dal.registerAsync(user);
    return new_user;
}

async function loginAsync(credentials) {

    // Hash the password for security
    credentials.password = cryptoHelper.hash(credentials.password);

    const user = await auth_dal.loginAsync(credentials);

    return user;
}

module.exports = {
    registerAsync,
    loginAsync
};