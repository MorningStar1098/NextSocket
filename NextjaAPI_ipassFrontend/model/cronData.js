const mongoose = require("mongoose");
Types = mongoose.Schema.Types;
const Schema = new mongoose.Schema({
    workflowExecutionid: { type: String, default: null },
    accountid: { type: String, default: null },
    process:{type : Boolean,default : false},
    sid:{type:String,default:null}
});

module.exports = mongoose.model("cronData", Schema);