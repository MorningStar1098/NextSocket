const mongoose = require("mongoose");
const Schema = new mongoose.Schema({
    integration: { type: String, default: null },
    fname: { type: String, default: null },
    lname: { type: String, default: null },
    uniq_id: { type: String, default: null },
    workflow_id:{type:String,default:null},
    update_at:{type: Date, default: Date.now},
});
module.exports = mongoose.model("custom_session", Schema);