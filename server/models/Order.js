const mongoose = require('mongoose');

const orderSchema = new mongoose.Schema({
  orderNumber: {
    type: String,
    required: true,
    unique: true,
    index: true,
    default: function() {
      // ✅ Générer un orderNumber par défaut
      return `ANGELS-${Date.now()}-${Math.random().toString(36).substr(2, 6).toUpperCase()}`;
    }
  },
  userId: {
    type: String,
    required: true,
    index: true
  },
  userEmail: {
    type: String,
    required: true,
    index: true
  },
  customerInfo: {
    fullName: { 
      type: String, 
      required: true,
      trim: true
    },
    phone: { 
      type: String, 
      required: true,
      trim: true
    },
    email: { 
      type: String, 
      required: true,
      trim: true,
      lowercase: true
    }
  },
  deliveryInfo: {
    method: { 
      type: String, 
      enum: ['delivery', 'pickup'], 
      required: true 
    },
    address: {
      type: {
        address: {
          type: String,
          trim: true
        },
        city: {
          type: String,
          trim: true
        },
        postalCode: {
          type: String,
          trim: true
        }
      },
      default: null
    }
  },
  paymentInfo: {
    method: { 
      type: String, 
      enum: ['whatsapp', 'online', 'cash'], 
      required: true 
    },
    total: { 
      type: Number, 
      required: true,
      min: 0
    },
    currency: { 
      type: String, 
      default: 'TND' 
    },
    status: {
      type: String,
      enum: ['pending', 'paid', 'failed', 'refunded'],
      default: 'pending'
    }
  },
  items: [{
    productId: {
      type: String,
      required: true
    },
    productName: {
      type: String,
      required: true,
      trim: true
    },
    quantity: {
      type: Number,
      required: true,
      min: 1
    },
    price: {
      type: Number,
      required: true,
      min: 0
    },
    selectedColor: {
      type: String,
      trim: true
    },
    selectedSize: {
      type: String,
      trim: true
    },
    personalization: {
      type: String,
      trim: true
    },
    subtotal: {
      type: Number,
      required: true,
      min: 0
    }
  }],
  status: {
    type: String,
    enum: ['pending', 'confirmed', 'in_production', 'shipped', 'delivered', 'cancelled'],
    default: 'pending',
    index: true
  },
  notes: {
    type: String,
    trim: true,
    maxlength: 500
  },
  adminNotes: {
    type: String,
    trim: true,
    maxlength: 1000
  },
  estimatedDelivery: {
    type: Date
  },
  trackingNumber: {
    type: String,
    trim: true
  },
  createdAt: {
    type: Date,
    default: Date.now,
    index: true
  },
  updatedAt: {
    type: Date,
    default: Date.now
  }
});

// ✅ CORRECTION : Middleware amélioré
orderSchema.pre('save', function(next) {
  this.updatedAt = Date.now();
  
  // Générer orderNumber seulement s'il n'existe pas
  if (!this.orderNumber) {
    this.orderNumber = `ANGELS-${Date.now()}-${Math.random().toString(36).substr(2, 6).toUpperCase()}`;
  }
  
  // S'assurer que chaque item a un subtotal
  if (this.items && Array.isArray(this.items)) {
    this.items.forEach(item => {
      if (!item.subtotal && item.price && item.quantity) {
        item.subtotal = item.price * item.quantity;
      }
    });
  }
  
  next();
});

// ✅ Ajout d'une méthode statique pour générer un orderNumber
orderSchema.statics.generateOrderNumber = function() {
  return `ANGELS-${Date.now()}-${Math.random().toString(36).substr(2, 6).toUpperCase()}`;
};

module.exports = mongoose.model('Order', orderSchema);