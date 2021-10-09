const mongoose = require("mongoose");

const locationSchema = new mongoose.Schema({
    address: String,
    zipCode: String,
    phoneNumber: String
});
const jobsScheme = new mongoose.Schema({
    title: {
        type: String,
        required: true

    },
    salary: {
        type: Number,
        required: false
    },

    description: {
        type: String,
        required: false
    },
    experience: {
        type: Number,
    },
    skill:[String],
    location: locationSchema,

    postDate: {
        type: Date
    }
});

mongoose.model("Job", jobsScheme, "jobs");



