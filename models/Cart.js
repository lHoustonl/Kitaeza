const { Schema, model } = require('mongoose')

const schema = new Schema({
    userId: {
        type: String,
        required: true,
        ref: 'User'
    },
    items: {
        type: Array,
        required: true,
    }
});

module.exports = model('Cart', schema)