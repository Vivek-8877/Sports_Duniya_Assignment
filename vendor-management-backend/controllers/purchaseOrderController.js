const PurchaseOrder = require('../models/purchaseOrder');
const Vendor = require('../models/vendor');

exports.createPurchaseOrder = async (req, res) => {
  try {
    const purchaseOrder = new PurchaseOrder(req.body);
    await purchaseOrder.save();
    res.status(201).json(purchaseOrder);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

exports.getAllPurchaseOrders = async (req, res) => {
  try {
    const purchaseOrders = await PurchaseOrder.find().populate('vendor');
    res.status(200).json(purchaseOrders);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.getPurchaseOrderById = async (req, res) => {
  try {
    const purchaseOrder = await PurchaseOrder.findById(req.params.id).populate('vendor');
    if (!purchaseOrder) {
      return res.status(404).json({ error: 'Purchase Order not found' });
    }
    res.status(200).json(purchaseOrder);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.updatePurchaseOrder = async (req, res) => {
  try {
    const purchaseOrder = await PurchaseOrder.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!purchaseOrder) {
      return res.status(404).json({ error: 'Purchase Order not found' });
    }

    // Recalculate and update vendor metrics if the order is completed
    if (purchaseOrder.status === 'completed') {
        await updateVendorMetrics(purchaseOrder.vendor);
    }

    res.status(200).json(purchaseOrder);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

exports.deletePurchaseOrder = async (req, res) => {
  try {
    const purchaseOrder = await PurchaseOrder.findByIdAndDelete(req.params.id);
    if (!purchaseOrder) {
      return res.status(404).json({ error: 'Purchase Order not found' });
    }
    res.status(204).json({ message: 'Purchase Order deleted' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

async function updateVendorMetrics(vendorId) {
    // Find all completed purchase orders for the vendor
    const orders = await PurchaseOrder.find({ vendor: vendorId, status: 'completed' });
  
    if (orders.length === 0) return;
  
    // Initialize metrics
    let onTimeDeliveries = 0;
    let totalQualityRating = 0;
    let totalResponseTime = 0;
    let fulfilledOrders = 0;
  
    orders.forEach(order => {
      // On-Time Delivery Rate
      if (order.deliveryDate && order.expectedDeliveryDate && order.deliveryDate <= order.expectedDeliveryDate) {
        onTimeDeliveries++;
      }
  
      // Quality Rating Average
      if (order.qualityRating) {
        totalQualityRating += order.qualityRating;
      }
  
      // Average Response Time
      if (order.acknowledgmentDate) {
        const responseTime = new Date(order.acknowledgmentDate) - new Date(order.issueDate);
        totalResponseTime += responseTime;
      }
  
      // Fulfillment Rate
      if (!order.issues) {
        fulfilledOrders++;
      }
    });
  
    const vendor = await Vendor.findById(vendorId);
  
    // Update vendor metrics
    vendor.onTimeDeliveryRate = (onTimeDeliveries / orders.length) * 100;
    vendor.qualityRatingAvg = orders.length > 0 ? totalQualityRating / orders.length : 0;
    vendor.averageResponseTime = orders.length > 0 ? totalResponseTime / orders.length : 0;
    vendor.fulfillmentRate = (fulfilledOrders / orders.length) * 100;
  
    await vendor.save();
  }
  