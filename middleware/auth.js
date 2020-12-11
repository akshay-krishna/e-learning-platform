const { verifyToken } = require("../helpers/token");

const auth = async (req, res, next) => {
  const { id } = req.params;
  const { authorization } = req.headers;

  if (!authorization) return res.sendStatus(401);

  const { sub } = await verifyToken(authorization);

  if (!(sub === id)) return res.sendStatus(401);
  req.uid = sub;
  next();
};

module.exports = auth;
