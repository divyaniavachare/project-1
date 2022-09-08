const authorModels = require("../models/authorModel");
const jwt = require("jsonwebtoken");

//----------------------------------------------------------------------------------//
// This is the first api to create an author in database with email validation.
const isValid = function (value) {
  if (typeof value === 'undefined' || value === null) return false
  if (typeof value === 'string' && value.trim().length === 0) return false
  return true;
}
const isValidRequestBody = function (requestBody) {
  return Object.keys(requestBody).length > 0
}
const isValidEmail=function(email){
  return (/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(email))
}
const regexValidator=function(value){
  let regex= /^[a-zA-Z]+([\s][a-zA-Z]+)*$/
  return regex.test(value)
}
const createAuthor = async function (req, res) {
    try {
        let data = req.body
        let savedData = await authorModel.create(data)
        res.status(201).send({ msg: savedData })
    } catch (error) {
        res.status(500).send({ status: false, message: error.message })
    }
}

//----------------------------------------------------------------------------------//
// This is the login api of phase 2 for the authentication.

const doLogin = async function (req, res) {
  try {
    userEmail = req.body.email;
    userPassword = req.body.password;
    let user = await authorModels.findOne({
      email: userEmail,
      password: userPassword,
      isDeleted: false,
    });

    if (user) {
      let fname = user.fname;
      let lname = user.lname;
      let payload = { userId: user._id, email: user.email };
      const generatedToken = jwt.sign(payload, "FunctionUp Plutonium");
      res.status(200).send({
        Message: fname + " " + lname + " you have logged in Succesfully",
        YourId: user._id,
        token: generatedToken,
      });
    } else {
      res.status(400).send({ status: false, message: "Oops...Invalid credentials" });
    }
  } catch (error) {
    res.status(500).send({ status: false, msg: error.message });
  }
};

//---------------------------------------------------------------------------------//

module.exports.createAuthor = createAuthor;
module.exports.doLogin = doLogin;
