
const multer = require('multer');
const path = require('path');  

class FileService {
  constructor(destinationFolder = path.join(process.cwd(),'/public/images')) {
    this.destinationFolder = destinationFolder;
    this.fileName = '';
    
    this.storage = multer.diskStorage({
      destination: (req, file, cb) => {
        cb(null, this.destinationFolder);
      },
      filename: (req, file, cb) => {
        const fileName = this.generateFileName(file.fieldname, file.originalname);
        this.fileName = fileName;
        cb(null, fileName);
      }
    });

    this.upload = multer({ storage: this.storage });
  }

  generateFileName(fieldName, originalname) {
    return `${fieldName}-${Date.now()}-${Math.floor(Math.random() * 1000)}-${originalname}`;
  }

  getStoredFileName() {
    return this.fileName;
  }

  getFilePath() {
    return path.join(__dirname, this.destinationFolder, this.fileName);
  }
}

module.exports = FileService;