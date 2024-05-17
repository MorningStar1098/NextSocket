const mongoose = require("mongoose");
Types = mongoose.Schema.Types;
const Schema = new mongoose.Schema({
    // created_at:{type: Date, default: Date.now},
},
   
    {strict:false }
);

module.exports = mongoose.model("decision_models", Schema);