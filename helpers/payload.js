/**
 *generated a payload for passing to the jwt sign function
 * @param {object} data
 * @param {Date} time
 */

const genPayload = (data, time = Date.now()) => ({
  sub: data.id,
  name: data.name,
  iat: time,
  exp: time + 86400000,
});

module.exports = genPayload;
