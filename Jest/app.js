const crypto = require("crypto");

async function getData() {
    let randomBytes = crypto.randomBytes(20);
    return randomBytes;
}

getData();

module.exports = {
    getData
};