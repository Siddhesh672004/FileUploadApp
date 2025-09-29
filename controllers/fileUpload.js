const File = require("../models/File");
const cloudinary = require("cloudinary").v2;

//localfileupload ka handler function definition

exports.localFileUpload = async = (req, res) => {
    try {
        //Step 1: File ko fetch kro from req.file.file
        const file = req.files.file;
        console.log("File aagayi : ", file);

        //Step 2: File ka path set kro jaha file store hogi server side 
        let path = __dirname + "/files/" + Date.now() + `.${file.name.split('.')[1]}`;
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


//Jo file format upload kr rhe ho wo supported hai ya nahi
function isFileTypeSupported(type, supportedTypes){
    return supportedTypes.includes(type);
}

//Function to uploade image on cloudinary
async function uploadFileToCloudinary(file, folder){
    const options = {folder};
    options.resource_type = "auto";
    return await cloudinary.uploader.upload(file.tempFilePath, options);
}

exports.imageUpload = async (req, res) => {
    try{    
        //data fetch
        const { name, tags, email } = req.body;
        // console.log(name, tags, email);

        const file = req.files.imageFile;
        // console.log(file);

        //validationfor file supported or not
        const supportedTypes = ["jpg", "jpeg", "png"];
        const fileType = file.name.split('.')[1].toLowerCase();

        if(!isFileTypeSupported(fileType, supportedTypes)){
            return res.status(400).json({
                success: false,
                message: "File format not supported",
            })
        }

        // agar file format supported hai to...
        const response = await uploadFileToCloudinary(file, "FileUploadApp");
        console.log(response);

        //db me entry save krni hai
        const fileData = await File.create({
            name,
            tags,
            email,
            imageUrl: response.secure_url,
        })

        res.json({
            success:true,
            imageurl: response.secure_url,
            message:"Image uploaded successfully",
        })       

    }
    catch(error){
        console.error(error);
        res.status(400).json({
            success: false,
            message: "Something went wrong",
        })
    }
}


//Video Upload Handler
exports.videoUpload = async (req, res) => {
    try{    
        //data fetch
        const { name, tags, email } = req.body;
        // console.log(name, tags, email);

        const file = req.files.videoFile;
        // console.log(file);

        //validation for file supported or not
        const supportedTypes = ["mp4", "mov"];
        const fileType = file.name.split('.')[1].toLowerCase();

        if(!isFileTypeSupported(fileType, supportedTypes)){
            return res.status(400).json({
                success: false,
                message: "File format not supported",
            })
        }

        // agar file format supported hai to...
        const response = await uploadFileToCloudinary(file, "FileUploadApp");
        console.log(response);

        //db me entry save krni hai
        const fileData = await File.create({
            name,
            tags,
            email,
            imageUrl: response.secure_url,
        })

        res.json({
            success:true,
            imageurl: response.secure_url,
            message:"Video uploaded successfully",
        })       

    }
    catch(error){
        console.error(error);
        res.status(400).json({
            success: false,
            message: "Something went wrong",
        })
    }
}