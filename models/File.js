//import mongoose
const mongoose = require("mongoose");
const nodemailer = require("nodemailer");

//route handler
const fileSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  imageUrl: {
    type: String,
  },
  tags: {
    type: String,
  },
  email: {
    type: String,
  },
});

//post middleware
fileSchema.post("save", async function (doc) {
  try {
    console.log("Doc", doc);

    //Transporter
    //Todo: shifting nodemailer config into config file
    let transporter = nodemailer.createTransport({
      host: process.env.MAIL_HOST,
      auth: {
        user: process.env.MAIL_USER,
        pass: process.env.MAIL_PASS,
      },
    });

    //send email
    let info = await transporter.sendMail({
      from: `Siddhesh Chaudhari: Nodemailer Functionality`,
      to: doc.email,
      subject: "New File Uploaded on Cloudinary",
      html: `<h2>Hello Dev</h2>
             <p>File Uploaded. View here: 
             <a href="${doc.imageUrl}">${doc.imageUrl}</a></p>`,
    });

    console.log("Info", info);
  } catch (error) {
    console.log(error);
  }
});

//export
module.exports = mongoose.model("user", fileSchema);
