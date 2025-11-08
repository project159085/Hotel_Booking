const mongoose = require('mongoose');
const review = require('./review');
const Schema = mongoose.Schema;

const listingSchema = new Schema({
  title: {
    type: String,
    required: true
  },
  description: String,
  image: {
    filename: {
      type: String,
      default: "listingimage"
    },
    url: {
      type: String,
      default: "https://images.unsplash.com/photo-1761405378261-ff90ecf72acf?ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxmZWF0dXJlZC1waG90b3MtZmVlZHw4fHx8ZW58MHx8fHx8&auto=format&fit=crop&q=60&w=600",
      set: (v) => v === "" ? "https://images.unsplash.com/photo-1761405378261-ff90ecf72acf?ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxmZWF0dXJlZC1waG90b3MtZmVlZHw4fHx8ZW58MHx8fHx8&auto=format&fit=crop&q=60&w=600" : v
    }
  },
  price: Number,
  location: String,
  country: String,
  reviews: [{
    type: Schema.Types.ObjectId,
    ref: 'Review'
  }],
  owner: {
    type: Schema.Types.ObjectId,
    ref: 'User',
  },
});

listingSchema.post('findOneAndDelete', async (listing) => {
  if (listing) {
    await review.deleteMany({
      _id: { $in: listing.reviews }
    });
  }
});

const Listing = mongoose.model('Listing', listingSchema);
module.exports = Listing;
