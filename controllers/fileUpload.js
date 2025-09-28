const File = require("../models/File");

//localfileupload ka handler function definition

exports.localFileUpload = async = (req, res) => {
    try {
        //Step 1: File ko fetch kro from req.file.file
        const file = req.files.file;
        console.log("File aagayi : ", file);

        //Step 2: File ka path set kro jaha file store hogi server side 
        let path = __dirname + "/files/" + Date.now();
        console.log("Path: ", path);

        //Step 3: Mujhe "path" is path pe move/store krna hai apni file ko
        file.mv(path, (err) => {
            console.log(err);
        });

        res.json({
            success: true,
            message: "Local file uploaded successfully..",
        });
    }
    catch(error){
        console.log(error);
    }
}