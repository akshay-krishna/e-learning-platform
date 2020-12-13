/**
 *generated a payload for passing to the jwt sign function
 * @param {object} data
 * @param {Date} time
 */

const isAdmin = require("./isAdmin");
const isDeptHead = require("./isDeptHead");
const isHomeroomTeacher = require("./isHomeroomTeacher");

const genPayload = async (data, time = Date.now()) => {
  const { id, name } = data;
  const payload = {
    sub: id,
    name: name,
    iat: time,
    exp: time + 86400000,
    isAdmin: await isAdmin(id),
    isHomeroomTeacher: await isHomeroomTeacher(id),
    isDeptHead: await isDeptHead(id),
  };

  return payload;
};

module.exports = genPayload;
