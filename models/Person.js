const mongoose = require("mongoose");


const Person = mongoose.mongoose.model("Person", {
    name: String,
    salary: Number,
    approved: Boolean,
});

module.exports = Person