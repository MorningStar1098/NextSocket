const mongoose = require("mongoose");
Types = mongoose.Schema.Types;
const Schema = new mongoose.Schema({},
    {strict:false }
);

module.exports = mongoose.model("phonemodels", Schema);