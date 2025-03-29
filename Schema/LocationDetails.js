const mongoose = require('mongoose');

const LocationSchema = new mongoose.Schema({
  email: {
    type: String,
    required: true,
    index: true
  },
  timestamp: {
    type: Date,
    default: Date.now
  },
  coordinates: {
    latitude: {
      type: Number,
      required: true,
    },
    longitude: {
      type: Number,
      required: true,
    },
    x_coor: {
      type: Number,
      required: true,
    },
    y_coor: {
      type: Number,
      required: true,
    }
  },
  locationAddress: {
    type: String,
    required: true,
  },
  locationType: {
    type: String,
  },

}, { 
  collection: "LocationHistory",
  timestamps: true
});

// Create indexes for efficient querying
LocationSchema.index({ email: 1, timestamp: -1 });

mongoose.model("LocationHistory", LocationSchema);