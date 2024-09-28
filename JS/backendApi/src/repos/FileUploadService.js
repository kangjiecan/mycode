const multer = require("multer");
const path = require("path");

class FileUploadService {
  constructor(destinationFolder = path.join(process.cwd(), "/public/images")) {
    this.destinationFolder = destinationFolder;
    this.fileName = "";
  }

  upLoader() {
    const storage = multer.diskStorage({
      destination: (req, file, cb) => {
        cb(null, this.destinationFolder);
      },
      filename: (req, file, cb) => {
        this.fileName = `${Date.now()}-${file.originalname}`;
        cb(null, this.fileName);
      },
    });

    return multer({ storage: storage });
  }

  updater() {
    const storage = multer.diskStorage({
      destination: (req, file, cb) => {
        cb(null, this.destinationFolder);
      },
      filename: (req, file, cb) => {
        this.fileName = `${Date.now()}-${Math.floor(Math.random() * 1000)}-${file.originalname}`;
        cb(null, this.fileName);
      },
    });

    return multer({ storage: storage });
  }

  generateFileName(file) {
    const fieldName = file.fieldname || "file";
    const timestamp = Date.now();
    const randomValue = Math.floor(Math.random() * 1000);

    let originalname = file.originalname || "";
    let extension = "";

    extension = this.getExtensionFromMimetype(file.mimetype);

    const fileName = `${timestamp}-${randomValue}-${path.basename(
      originalname,
      extension
    )}${extension}`;
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
    const pathname = path.join(this.destinationFolder, this.fileName);
    return pathname;
  }
}

module.exports = FileUploadService;
