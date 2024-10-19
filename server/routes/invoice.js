const express = require('express');
const router = express.Router();
const Invoice = require('../models/Invoice');

// Create a new invoice
router.post('/', async (req, res) => {
  const { invoiceNumber, invoiceDate, dueDate, billingTo, billingFrom, items, tax, discount } = req.body;

  try {
    const subtotal = items.reduce((acc, item) => acc + item.qty * item.price, 0);
    const totalAmount = subtotal - discount + tax;

    const newInvoice = new Invoice({
      invoiceNumber,
      invoiceDate,
      dueDate,
      billingTo,
      billingFrom,
      items,
      tax,
      discount,
      totalAmount
    });

    const savedInvoice = await newInvoice.save();
    res.json(savedInvoice);
  } catch (error) {
    res.status(500).json({ error: 'Unable to create invoice' });
  }
});

// Get all invoices
router.get('/', async (req, res) => {
  try {
    const invoices = await Invoice.find();
    res.json(invoices);
  } catch (error) {
    res.status(500).json({ error: 'Unable to retrieve invoices' });
  }
});

module.exports = router;
