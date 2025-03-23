const mongoose = require('mongoose');

const LocationSchema = new mongoose.Schema({
  userId: {
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
      required: true
    },
    longitude: {
      type: Number,
      required: true
    }
  },
  locationName: {
    type: String,
    default: ''
  },
  locationType: {
    type: String,
    default: ''
  },
  device: {
    type: String,
    default: 'Mobile'
  }
}, { 
  collection: "LocationHistory",
  timestamps: true
});

// Create indexes for efficient querying
LocationSchema.index({ userId: 1, timestamp: -1 });

mongoose.model("LocationHistory", LocationSchema);