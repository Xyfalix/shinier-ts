const jwt = require("jsonwebtoken");
const User = require("../../models/user");
const bcrypt = require("bcrypt");

const create = async (req, res) => {
  const data = req.body;

  const user = await User.create(data);
  const { _id, name, email, role } = user;
  const token = jwt.sign({ _id, name, email, role }, process.env.SECRET, {
    expiresIn: "1d",
  });
  res.status(201).json(token);
};

const login = async (req, res) => {
  const { email, password } = req.body;

  const user = await User.findOne({ email });

  if (user === null) {
    res.status(401).json({ error: "No user" });
    return;
  }

  const match = await bcrypt.compare(password, user.password);
  if (match) {
    const { _id, name, email, role } = user;
    const token = jwt.sign({ _id, name, email, role }, process.env.SECRET, {
      expiresIn: "1d",
    });
    res.status(200).json(token);
  } else {
    res.status(401).json({ error: "No match" });
  }
};

const index = async (req, res) => {
  const users = await User.find({});
  res.json({ users });
};

module.exports = {
  create,
  login,
  index,
  // checkToken
};
