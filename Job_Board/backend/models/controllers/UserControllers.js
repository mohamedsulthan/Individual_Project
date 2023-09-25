
const db = require("../entity")
const User = db.Users;
const { Op } = require('sequelize');
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const nodemailer = require('nodemailer');
const url = require('node:url');
const dotenv = require('dotenv');
const { log } = require("node:console");
dotenv.config();

// User Registration
async function userExists(data) {
  try {
    const user = await User.findOne({ where: { [Op.or]: [{ Email: data.Email }] } });
    if (user) {
      return true;
    } else {
      return false;
    }
  } catch (error) {
      throw error;
  }
}

async function registerUser(req, res) {
  const { fullName, email, password, mobileNumber, dob, expectedLPA, skills, experience, interestedRole } = req.body;
  try {
    if (fullName && email && password && mobileNumber && dob && expectedLPA && skills && experience && interestedRole) {
      var userData = {
        FullName: fullName,
        MobileNumber: mobileNumber,
        Email: email,
        Password: password,
        InterestedRole: interestedRole,
        DOB: dob,
        ExpectedLPA: expectedLPA,
        Skills: skills,
        Experience: experience,
      };
      const userAlreadyExist = await userExists(userData);
      if (userAlreadyExist) {
        res.status(200).json({ message: "User Already Registered" });
      }
      else {
        bcrypt.hash(userData.Password, 10, async (err, hash) => {
          if (err) {
            res.status(500).json({ message: "Server Error" });
          }
          if (hash) {
            const hashUser = {
              FullName: fullName,
              MobileNumber: mobileNumber,
              Email: email,
              Password: hash,
              InterestedRole: interestedRole,
              DOB: dob,
              ExpectedLPA: expectedLPA,
              Skills: skills,
              Experience: experience,
            };
            const token = await createJwtToken(hashUser);
            await emailVerificationLink(token, hashUser).then(async () => {
              await User.create(hashUser).then(() => {
                res.status(200).json({ message: "email sent" });
              }).catch((error) => {
                console.log(error);
              });
            });
          }
        });
      }
    } else {
      res.json({ message: "empty data" });
    }
  } catch (error) {
    res.status(500).json({ error: 'An error occurred' });
  }
}

async function emailVerificationLink(token, hashUser) {
  const transporter = await nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: process.env.SMTP_USER,
      pass: process.env.SMTP_PASS,
    },
  });
  const mailOptions = {
    from: process.env.SMTP_FROM,
    to: hashUser.Email,
    subject: process.env.SMTP_SUBJECT,
    text: `Please click the following link to verify your email: ${process.env.url}/users/verify?token=${token}`,
  };
  await transporter.sendMail(mailOptions, (err, info) => {
    if (err) {
      console.log(err);
    }
    if (info.response) {
      console.log(info.response);
    }
  });
}


async function createJwtToken(userExist) {
  const secretkey = process.env.secretkey;
  const token = await jwt.sign({ userExist }, secretkey, { expiresIn: '1h' });
  return token;
}

async function verify(req, res) {
  const parsedUrl = await url.parse(req.url, true);
  await verifyToken(parsedUrl.query.token).then(() => {
    res.send("<h1>Verification success</h1>");
  });
}


async function verifyToken(token) {
  const secretkey = process.env.secretkey;
  await jwt.verify(token, secretkey, async (err, decoded) => {
    if (err) {
      if (err.name === 'TokenExpiredError') {
        return false;
      }
    }
    if (decoded) {
      if (decoded.userExist) {
        const userVerification = await User.findOne({
          where: { Email: decoded.userExist.Email }
        });
        if (userVerification) {
          await User.update({ isActivated: true }, { where: { Email: decoded.userExist.Email } });
        }
        
      }
    }
  });
}

// User Login
async function loginUser(req, res) {
  const { email, password } = req.body;

  try {
    var loginData = {
      email: email,
      password: password
    };
    const userExist = await User.findOne({ where: { Email: loginData.email } });
    if (userExist) {
      if (userExist.dataValues.isActivated) {
        bcrypt.compare(loginData.password, userExist.dataValues.Password, async (err, result) => {
          if (err) {
            res.status(500).json({ message: "Server Error" });
          }
          if (result) {
            const token = await createJwtToken(userExist);
            if (userExist.dataValues.isAdmin) {
              res.status(200).json({ message: "Login-admin", data: userExist, token });
            } else {
              res.status(200).json({ message: "Login", data: userExist, token });
            }
          } else {
            res.status(200).json({ message: "password not matching" });
          }
        });
      } else {
        res.status(200).json({ message: "Activation Required" });
      }
    } else {
      res.status(200).json({ message: "User Not Found" });
    }
  } catch (error) {
    res.status(500).json({ error: 'An error occurred' });
  }
}

module.exports = {
  userExists,
  emailVerificationLink,
  registerUser,
  verifyToken,
  verify,
  createJwtToken,
  loginUser,
  
};
