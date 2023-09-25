const db = require("../entity")
const User = db.Users;
const Jobs = db.Jobs;
const jwt = require("jsonwebtoken");
const dotenv = require('dotenv');
dotenv.config();


const getjobdata = async (req, res) => {
  const { userID } = req.query;
  try {
    const alljobs = await Jobs.findAll({
      where: {
        CreatedBy: userID
      }
    });
    if (alljobs) {
      res.send({ statusCode: 200, alljobs });
    } else {
      res.status(400).send({ statusCode: 400, message: "No data" });
    }
  } catch (error) {
    res.status(500).send({ statusCode: 400, message: "Internal error" });
  }


};

const getalljobdata = async (req, res) => {
  console.log("requets getalljobdata", req.body)
  try {
    const alljobs = await Jobs.findAll();
    if (alljobs) {
      res.send({ statusCode: 200, alljobs });
    } else {
      res.status(400).send({ statusCode: 400, message: "No data" });
    }
  } catch (error) {
    res.status(500).send({ statusCode: 400, message: "Internal error" });
  }
};

const Deletedata = async (req, res) => {
  console.log("Deletedata", req.body)
  const { JobID } = req.body
  try {
    const userToDelete = await Jobs.findOne({
      where: { JobID: JobID }
    });

    if (userToDelete) {
      await userToDelete.destroy();
      res.status(200).send('Record deleted successfully');
    } else {
      console.log('Record not found');
    }
  } catch (error) {
    console.error('Error deleting user:', error);
  }
}

const authentication = async (req, res) => {
  try {
    const { token } = req.body;
    console.log("token", token)
    const secretkey = process.env.secretkey;
    const result = await jwt.verify(token, secretkey, async (err, decoded) => {
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
            const UserID = decoded.userExist.UserID;
            const UserName = decoded.userExist.FullName;
            const UserEmail = decoded.userExist.Email;
            return ({ UserID, UserName, UserEmail })
          }
        }

      }
    });
    if (result) {
      console.log("result backend:", result)
      res.send({ result: result, message: "authenticated user" })
    }
    else {
      res.send({ message: "invalid user" })
    }
  }
  catch (err) {
    res.send(res)
  }
}

const registerjob = async (req, res) => {
  console.log(req.body)
  const formData = req.body.formData;
  const UserID = req.body.UserID;

  formData.CreatedBy = UserID;

  console.log(formData);
  try {
    let createJob = await Jobs.create(formData);
    if (createJob) {
      res.send({ statusCode: 200, message: 'job created' })
    }
  }
  catch (err) {
    console.log("errr", err)
  }


}

module.exports = {
  getjobdata,
  registerjob,
  authentication,
  getalljobdata,
  Deletedata,
};