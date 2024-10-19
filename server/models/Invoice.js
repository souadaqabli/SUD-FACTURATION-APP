const mongoose = require('mongoose');

const invoiceSchema = new mongoose.Schema({
  invoiceNumber: { type: String, required: true },
  invoiceDate: { type: Date, required: true },
  dueDate: { type: Date, required: true },
  billingTo: {
    name: { type: String, required: true },
    email: { type: String, required: true },
    address: { type: String, required: true }
  },
  billingFrom: {
    name: { type: String, required: true },
    email: { type: String, required: true },
    address: { type: String, required: true }
  },
  items: [
    {
      name: { type: String, required: true },
      description: { type: String },
      qty: { type: Number, required: true },
      price: { type: Number, required: true }
    }
  ],
  tax: { type: Number, required: true },
  discount: { type: Number, required: true },
  totalAmount: { type: Number, required: true },
});

module.exports = mongoose.model('Invoice', invoiceSchema);
