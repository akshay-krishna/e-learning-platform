const { verifyToken } = require("../helpers/token");

/**
 * checks if there is a auth header if yes,
 * verify it.
 * if the sub field of the verified token do not match with the
 * given id parameter return 404
 * it means that the authorized user is not the owner of the requested resource
 */

const auth = async (req, res, next) => {
  const { id } = req.params;
  const { authorization } = req.headers;
  if (!authorization) return res.sendStatus(401);

  const decoded = await verifyToken(authorization);

  if (!decoded) return res.sendStatus(401);

  const { sub } = decoded;
  if (!(sub === id)) return res.sendStatus(401);

  req.uid = sub;
  next();
};

module.exports = auth;
