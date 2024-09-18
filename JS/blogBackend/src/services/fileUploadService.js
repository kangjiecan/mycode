const multer = require('multer');
const path = require('path');


const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, path.join(__dirname, '..', '..','public', 'userImages'));
  },
  filename: function (req, file, cb) {
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
    cb(null, 'photo-' + uniqueSuffix + path.extname(file.originalname));
  }
});

const upload = multer({ 
  storage: storage,
  limits: { fileSize: 5 * 1024 * 1024 } // 5MB limit
});

const uploadMiddleware = upload.single('photo');

function handleUpload(req, res, next) {
  console.log('Handling upload request');
  uploadMiddleware(req, res, function (err) {
    if (err) {
      console.error('Upload error:', err);
      return res.status(500).json({ error: 'An unknown error occurred: ' + err.message });
    }
    
    if (!req.file) {
      console.log('No file uploaded');
      return res.status(400).json({ error: 'No file uploaded.' });
    }
    
    const userId = req.body.userId || 'unknown';
    const filePath = '/userImages/' + req.file.filename;
    
    console.log('File uploaded successfully:', {
      userId: userId,
      filePath: filePath,
      originalName: req.file.originalname,
      size: req.file.size
    });
    
    req.uploadedFile = {
      userId: userId,
      filePath: filePath
    };
    
    next();
  });
}

module.exports = {
  handleUpload
};