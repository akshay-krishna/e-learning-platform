const { verifyToken } = require("../helpers/token");
const Admin = require("../models/Admin");

/**
 * check if auth header is present if yes,
 * check if the specified uid is in the admins collection
 */

const admin = async (req, res, next) => {
  const { authorization } = req.headers;
  if (!authorization) return res.sendStatus(401);

  const decoded = await verifyToken(authorization);
  if (!decoded) return res.sendStatus(401);

  const { sub } = decoded;

  try {
    const isAdmin = await Admin.exists({ staffId: sub });
    if (!isAdmin) return res.sendStatus(401);
  } catch (err) {
    console.error(err.message);
  }

  req.uid = sub;
  next();
};

module.exports = admin;
