const genPayload = (data) => ({
  sub: data.id,
  name: data.name,
  iat: Date.now(),
});

module.exports = genPayload;
