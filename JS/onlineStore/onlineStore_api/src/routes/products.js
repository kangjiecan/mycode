const express = require('express');
const router = express.Router();

router.get('/all', async (req, res) => {
  res.send("All products data");
});

router.get('/:id', async (req, res) => {
  const productId = req.params.id;
  res.send(`Product data for product ID: ${productId}`);
});

router.post('/purchase', async (req, res) => {
  res.send("Product purchased");
});

module.exports = router;