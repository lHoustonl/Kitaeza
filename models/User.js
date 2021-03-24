const { Schema, model } = require('mongoose')

const schema = new Schema({
    login: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true,
        default: "password123"
    }
})

module.exports = model('User', schema)