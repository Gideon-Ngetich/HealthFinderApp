const mongoose = require("mongoose");

const facilitySchema = new mongoose.Schema({
  facilityName: { type: String, required: true },
  email: { type: String, required: true },
  password: { type: String, required: true },
  address: { type: String, required: true },
  description: { type: String, required: true },
  location: {
    type: { type: String, default: "Point" },
    coordinates: { type: [Number], required: true },
  },
  services: [
    {
      name: { type: String, required: true },
      price: { type: String, required: true },
    },
  ],
  contacts: { type: String, required: true },
  medical_covers: [{ type: String, required: true }],
  working_hours: {
    open: { type: String, required: true },
    close: { type: String, required: true },
  },
  logo: { type: String },
  images: [{ type: String }],
  rating: {
    average: { type: Number, default: 0 },
    total_reviews: { type: Number, default: 0 },
  },
  category: { type: String, required: true },
  createdAt: { type: String, default: Date.now },
});

facilitySchema.index({ location: "2dsphere" });

const Facility = mongoose.model("medical facility", facilitySchema);

module.exports = { Facility }; 