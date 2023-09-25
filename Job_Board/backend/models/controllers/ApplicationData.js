const db = require("../entity")
const Applications = db.Applications;
const Jobs = db.Jobs;
const dotenv = require('dotenv');
const nodemailer = require('nodemailer');
dotenv.config();

const register = async (req, res) => {
  console.log("register rerquest", req.body)
  const { UserId, JobID, UserEmail } = req.body;
  try {
    // Check if a record with the same jobid and mail exists
    const existingRecord = await Applications.findOne({
      where: {
        JobID: JobID,
        UserEmail: UserEmail,
      }
    });

    if (existingRecord) {
      return res.status(200).send({ message: "User already registered" });
    }
    const Job = await Jobs.findOne({
      where: {
        JobID: JobID,
        CreatedBy: UserId,
      }
    });
    if (Job) {
      return res.status(200).send({ message: "created by you" });
    }

    // If no existing record, proceed with registration
    let createEvent = await Applications.create(req.body);
    res.status(200).send({ message: "Event created successfully" });
  } catch (error) {
    console.error(error);
    res.status(500).send({ message: "Internal error" });
  }
}

async function apppliedmail(req, res) {
  console.log("apppliedmail", req.body)
  const { UserName, UserEmail, JobTitle, CompanyName } = req.body
  console.log("datasofappliedmail:", UserName, UserEmail, JobTitle, CompanyName)
  const transporter = await nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: process.env.SMTP_USER,
      pass: process.env.SMTP_PASS,
    },
  });
  const mailOptions = {
    from: process.env.SMTP_FROM,
    to: UserEmail,
    subject: `Successfully Applied for the role ${JobTitle}`,
    html: `
      <p style="color: #000;">Hi ${UserName},</p>
      <p style="color: #000;">You have successfully applied for the Role: <span style="color: #3498db;">${JobTitle}</span> at <span style="color: #3498db;">${CompanyName}</span>.</p>
    `,
  };
  await transporter.sendMail(mailOptions, (err, info) => {
    if (err) {
      console.log(err);
      res.status(500).send({ message: "Unable to send mail" });
    }
    if (info.response) {
      console.log(info.response);
      res.status(200).send({ message: "mail sent" });
    }
  });
}

module.exports = {
  register,
  apppliedmail,
} 