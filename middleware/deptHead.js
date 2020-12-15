const { sign } = require("jsonwebtoken");
const { verifyToken } = require("../helpers/token");

/**
 * check if auth header is present if yes,
 * check if the specified uid is in the admins collection
 */

const deptHead = async (req, res, next) => {
  const { authorization } = req.headers;
  if (!authorization) return res.sendStatus(401);

  try {
    const decoded = await verifyToken(authorization);
    if (!decoded) return res.sendStatus(401);

    const { sub, isAdmin, isDeptHead } = decoded;
    if (isAdmin || isDeptHead) {
      req.uid = sub;
      next();
    } else {
      return res.sendStatus(401);
    }
  } catch (err) {
    console.error(err.message);
    res.sendStatus(500);
  }
};

module.exports = deptHead;
