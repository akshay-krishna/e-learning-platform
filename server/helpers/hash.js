const { compare, hash } = require("bcrypt");

/**
 * hash the given string and return it
 * @param {string} plainText
 */

const genHash = async (plainText) => {
  try {
    return await hash(plainText, 10);
  } catch (err) {
    console.error(err.message);
    throw Error("Failed to hash the password");
  }
};

/**
 * Compare the passed in plainText with the hash and return it
 * @param {string} plainText
 * @param {string} hash
 */

const compareHash = async (plainText, hash) => {
  try {
    return await compare(plainText, hash);
  } catch (err) {
    console.error(err.message);
    throw Error("Failed to compare the password to give hash");
  }
};

module.exports = { genHash, compareHash };
