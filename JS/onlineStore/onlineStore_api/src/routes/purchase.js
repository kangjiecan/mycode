const express = require('express');
const { PrismaClient } = require('@prisma/client');
const router = express.Router();
const prisma = new PrismaClient();

router.post('/purchase', async (req, res) => {
  const { 
    street, 
    city, 
    province, 
    country, 
    postal_code, 
    credit_card, 
    credit_expire, 
    credit_cvv, 
    cart, 
    invoice_amt, 
    invoice_tax, 
    invoice_total 
  } = req.body;

  if (!req.session || !req.session.user) {
    return res.status(401).json({ error: "Unauthorized. Please log in to complete the purchase." });
  }

  const customerId = req.session.user.customer_id;

  if (!street || !city || !province || !country || !postal_code || !credit_card || 
      !credit_expire || !credit_cvv || !cart || !invoice_amt || !invoice_tax || !invoice_total) {
    return res.status(400).json({ error: "All fields are required." });
  }

  try {
    const cartItems = cart.split(',').reduce((acc, productId) => {
      acc[productId] = (acc[productId] || 0) + 1;
      return acc;
    }, {});
    //for nothing or all stratagy
    const result = await prisma.$transaction(async (tx) => {
      const purchase = await tx.purchase.create({
        data: {
          customer_id: customerId,
          street,
          city,
          province,
          country,
          postal_code,
          credit_card,
          credit_expire,
          credit_cvv,
          invoice_amt,
          invoice_tax,
          invoice_total,
          order_date: new Date(),
        },
      });

      const purchaseItemsData = Object.entries(cartItems).map(([productId, quantity]) => ({
        purchase_id: purchase.purchase_id,
        product_id: parseInt(productId, 10),
        quantity,
      }));

      await tx.purchaseItem.createMany({
        data: purchaseItemsData,
      });

      return purchase;
    });

    res.status(201).json({ message: "Purchase completed successfully", purchaseId: result.purchase_id });
  } catch (error) {
    console.error("Error during purchase:", error);
    res.status(500).json({ error: "Internal server error" });
  }
});

module.exports = router;