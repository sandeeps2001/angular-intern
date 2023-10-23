const { logincheck, signuppost } = require("../database/crud");
const bcrypt = require("bcrypt");

const signup = async (req, res) => {
  const { email, password } = req.body;
  const saltRounds = 10;
  const myPlaintextPassword = password;
  const salt = bcrypt.genSaltSync(saltRounds);
  const hash = bcrypt.hashSync(myPlaintextPassword, salt);
  const result = await signuppost(email, hash);
  res.status(200).send({ message: result });
};

const superadminlogin = async (req, res) => {
  const { email, password } = req.body;
  const result = await logincheck(email, password);
  res.status(200).send({ message: result });
};

module.exports = { signup, superadminlogin };
