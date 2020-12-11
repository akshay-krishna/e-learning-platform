const genPayload = (data, time = Date.now()) => ({
  sub: data.id,
  name: data.name,
  iat: time,
  exp: time + 86400000,
});

module.exports = genPayload;
