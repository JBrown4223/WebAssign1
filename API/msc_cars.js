
const mongoose = require("mongoose");

var Schema = mongoose.Schema;

var carsSchema = new Schema({
    Make:String,
    Model: String,
    Year: Number,
    VIN: String,
    Colour: String,
    Package: String,
    MSRP: String,
    Photo: String,
    Purchaser: String,
    Email: String,
    Purchase_Price: String,
    Purchase_Date: Date
});

module.exports = carsSchema;

