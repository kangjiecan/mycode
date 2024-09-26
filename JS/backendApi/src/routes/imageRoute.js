// imageRoute.js
const express = require('express');
const ImageControl = require('../handlers/ImageControl');
const imageControl = new ImageControl();
const router = express.Router();
const FileHandler = require('../handlers/FileUploadControler');
const fileHandler = new FileHandler();  // Instantiate correctly

/*router.post('/api/photo/create', async(req, res) => {
    await imageControl.postImage(req, res);
});
*/
router.get('/api/photo/read/', async (req, res) => {
    await imageControl.getImage(req, res);
});

router.get('/api/photo/all', async (req, res) => {
    await imageControl.getAllImages(req, res);
});   

router.delete('/api/photo/delete/', async (req, res) => {
    await imageControl.deleteImage(req, res);
}); 

router.put('/api/photo/update/', async (req, res) => {    
    await fileHandler.fileUpdate(req, res);
});   

//router.put('/api/photo/upload', async (req, res) => {
   // await imageControl.uploadImage(req, res);
//}
//);

router.post('/api/photo/create', async (req, res) => {
    await fileHandler.fileUpload(req, res);
});

module.exports = router;