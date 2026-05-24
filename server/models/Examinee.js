const mongoose = require('mongoose');

const examineeSchema = new mongoose.Schema({

    name: {
        type: String,
        required: true,
    },

    email: {
        type: String,
        required: true,
    },

    number: {
        type: String,
        default: "",
    },

    address: {
        type: String,
        default: "",
    },

    password: {
        type: String,
        required: true,
    },

    college: {
        type: String,
        default: "",
    },

    qualification: {
        type: String,
        default: "",
    },

    session: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Session'
    },

    profileImage: {
        type: String,
        default: ""
    },

    status: {
        type: String,
        enum: ['active', 'inactive', 'delete'],
        default: "active"
    }

}, {
    timestamps: true
});

module.exports = mongoose.model('Examinee', examineeSchema);