// imageRoute.js
const express = require('express');
const ImageControl = require('../handlers/ImageControl');
const imageControl = new ImageControl();
const router = express.Router();

router.post('/image/saveImage', async(req, res) => {
    await imageControl.postImage(req, res);
});

router.get('/image/imageInfo/:name', async (req, res) => {
    await imageControl.getImage(req, res);
});

router.get('/image/allImages', async (req, res) => {
    await imageControl.getAllImages(req, res);
});   

router.delete('/image/deleteImage/:name', async (req, res) => {
    await imageControl.deleteImage(req, res);
}); 

router.put('/image/updateImage/', async (req, res) => {    
    await imageControl.updateImage(req, res);
});   

module.exports = router;