// song.model.js

const mongoose = require('mongoose');

// Define collection and schema for Song

// Note: unique_name is simply category + "_" + name
let songSchema = new mongoose.Schema({
    name: {
        type: String
    },
    category: {
        type: String
    },
    play_count: {
        type: Number
    },
    add_to_cart_count: {
        type: Number
    },
    checkout_count: {
        type: Number
    },
    purchase_count: {
        type: Number
    }
},{
    collection: 'songs'
});

songSchema.methods.increment_play_count = function() {
    this.play_count = this.play_count + 1
}

songSchema.methods.increment_add_to_cart_count = function() {
    this.add_to_cart_count = this.add_to_cart_count + 1
}

songSchema.methods.increment_checkout_count = function() {
    this.checkout_count = this.checkout_count + 1
}

songSchema.methods.increment_purchase_count = function() {
    this.purchase_count = this.purchase_count + 1
}

module.exports = mongoose.model('Song', songSchema);
