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
    },
    longitude: {
      type: Number,
    }
  },
  locationAddress: {
    type: String,
    default: ''
  },
  locationType: {
    type: String,
    default: ''
  },

}, { 
  collection: "LocationHistory",
  timestamps: true
});

// Create indexes for efficient querying
LocationSchema.index({ email: 1, timestamp: -1 });

mongoose.model("LocationHistory", LocationSchema);