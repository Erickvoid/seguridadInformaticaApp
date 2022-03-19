const { Router } = require("express");
const router = Router();
const User = require("../models/User");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const saltRounds = 10;
let passwordEncripted;

router.get("/", (req, res) => {
  res.send("Backend Funcionando ⚙");
});

router.post("/register", async (req, res) => {
  const {
    userName,
    password,
    name,
    apellidoPaterno,
    apellidoMaterno,
    phoneNum,
    addressCalle,
    addressColonia,
    codPostal,
  } = req.body;

  bcrypt.genSalt(saltRounds, function (err, salt) {
    try {
      bcrypt.hash(password, salt, function (err, hash) {
        try {
          passwordEncripted = hash;
          console.log(passwordEncripted);
        } catch (error) {
          console.log(err);
        }
      });
    } catch (error) {
      console.log(err);
    }
  });
  
  const newUser = new User({
    userName,
    passwordEncripted,
    name,
    apellidoPaterno,
    apellidoMaterno,
    phoneNum,
    addressCalle,
    addressColonia,
    codPostal,
  });
  let userInUse = await User.findOne({ userName });
  console.log(`The user in the databse is ${userInUse}`);
  console.log(newUser);
  if (userInUse) {
    return res.status(401).send("El Usuario ya existe");
  } else {
    await newUser.save();
    const token = await jwt.sign({ _id: newUser._id }, "secretkey");
    res.status(200).json({ token });
  }
});

router.post("/login", async (req, res) => {
  const { userName, password } = req.body;
  const user = await User.findOne({ userName });
  console.log(user);

  if (!user) return res.status(401).send("El Usuario no existe");
  console.log(user.passwordEncripted);
  console.log(password);
  const validPassword = await bcrypt.compare(password, user.passwordEncripted);
  console.log(validPassword);
  if (!validPassword) return res.status(400).send("Error en la contraseña.");

  const token = jwt.sign({ _id: user._id }, "secretkey");
  return res.status(200).json({ token });
});

module.exports = router;
