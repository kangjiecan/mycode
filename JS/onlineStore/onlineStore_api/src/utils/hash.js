const bcrypt = require('bcrypt');

async function hashPassword(password) {
  const saltRounds = 10;
  const hashedPassword = await bcrypt.hash(password, saltRounds);
  return hashedPassword;
}

async function comparePasswords(password, hashedPassword) {
  const isPasswordValid = await bcrypt.compare(password, hashedPassword);
  return isPasswordValid;
}

module.exports = { hashPassword };
module.exports = { comparePasswords };