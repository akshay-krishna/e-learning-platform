const { verifyToken } = require("../helpers/token");

/**
 * checks if there is a auth header if yes,verify it.
 * if the sub field of the verified token do not match with the given id parameter return 404
 * it means that the authorized user is not the owner of the requested resource
 */

const auth = async (req, res, next) => {
  const { authorization } = req.headers;
  if (!authorization) return res.sendStatus(401);

  try {
    const decoded = await verifyToken(authorization);
    if (!decoded) return res.sendStatus(401);

    const { sub } = decoded;
    req.uid = sub;
    next();
  } catch (err) {
    console.error(err.message);
    res.sendStatus(500);
  }
};

module.exports = auth;
