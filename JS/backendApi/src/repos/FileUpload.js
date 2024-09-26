const multer = require("multer");
const path = require("path");

class FileService {
  constructor(destinationFolder = path.join(process.cwd(), "/public/images")) {
    this.destinationFolder = destinationFolder;
    this.fileName = "";
    this.storage = multer.diskStorage({
      destination: (req, file, cb) => {
        cb(null, this.destinationFolder);
      },
      filename: (req, file, cb) => {
        const fileName = this.generateFileName(file);
        this.fileName = fileName;
        cb(null, fileName);
      },
    });
    this.upload = multer({ storage: this.storage });
  }

  generateFileName(file) {
    const fieldName = file.fieldname || "file";
    const timestamp = Date.now();
    const randomValue = Math.floor(Math.random() * 1000);

    let originalname = file.originalname || "";
    let extension = "";

    extension = this.getExtensionFromMimetype(file.mimetype);

    console.log("Field name:", fieldName);
    console.log("Original filename:", originalname);
    console.log("File extension:", extension);

    const fileName = `${timestamp}-${randomValue}-${path.basename(originalname, extension)}${extension}`;
    console.log("Generated file name:", fileName);
    return fileName;
  }

  getExtensionFromMimetype(mimetype) {
    const mimetypeExtMap = {
      "image/jpeg": ".jpg",
      "image/png": ".png",
      "image/gif": ".gif",
      "application/pdf": ".pdf",
      // Add more as needed
    };
    return mimetypeExtMap[mimetype] || ".bin";
  }

  getStoredFileName() {
    return this.fileName;
  }

  getFilePath() {
    const pathname=path.join(this.destinationFolder,this.fileName);
    console.log("Pathname:",pathname);
    return pathname
    
  }
  
}

module.exports = FileService;
