const mongoose = require('mongoose');

const PurchaseOrderSchema = new mongoose.Schema({
  poNumber: { type: String, required: true, unique: true },
  vendor: { type: mongoose.Schema.Types.ObjectId, ref: 'Vendor', required: true },
  orderDate: { type: Date, required: true },
  deliveryDate: { type: Date, required: true },
  items: { type: Array, required: true },
  quantity: { type: Number, required: true },
  status: { type: String, default: 'pending' },
  qualityRating: { type: Number, default: null },
  issueDate: { type: Date, required: true },
  acknowledgmentDate: { type: Date, default: null },
});

module.exports = mongoose.model('PurchaseOrder', PurchaseOrderSchema);
