const express = require("express");
const app = express();

//load config from .env file
const PORT = process.env.PORT || 3000;

//Middleware to parse json request body
app.use(express.json());
const fileupload = require("express-fileupload");
app.use(fileupload());


//connect to the database
require("./config/database").connect();

//cloudinary connection
const cloudinary = require("./config/cloudinary");
cloudinary.cloudinaryConnect();

//Api routes mounting
const Upload = require("./routes/FileUpload");
app.use('/api/v1/upload', Upload);

//start server
app.listen(PORT, () => {
    console.log(`Server started successfully at ${PORT}`);
})

//Default route
app.get("/", (req, res) => {
    res.send(`<h1> This is HOMEPAGE </h1>`);
} )