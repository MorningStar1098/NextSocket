const mongoose = require("mongoose");
Types = mongoose.Schema.Types;
const Schema = new mongoose.Schema({
    // update_at:{type: Date, default: Date.now},
},
    {strict:false }
);

module.exports = mongoose.model("detailpagevalida", Schema);