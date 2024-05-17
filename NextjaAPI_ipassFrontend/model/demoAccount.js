const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  companyname:{type: String},
  firstname:{ type: String},
  lastname:{ type: String},
  email: { type: String, unique: true },
  logo:{type: String},
  monthlybalance:{type: String},
  Threshold:{type: String},
  accountType:{type: String},
  billsEmail:{type: String},
  isSupAdmin: { type: String},
  public_key:{type:String},
  private_key:{type:String},
  sandbox_account:{type:String},
  monthly_limit:{type:String},
  limit_adon:{type:String},
  password:{type :String},
  mothly_transactions:{type:String},
  consumed:{type :String},
  remaining:{type:String},
  creat_at:{ type: String },
  token:{type:String},
  issuspended:{type:String},
  scanLimit:{type:String},
  scanLimitremain:{type:String},
  forgotLinkTime:{type:String},
  update_at:{type: Date, default: Date.now},
  tms_account:{type:String}

});
module.exports = mongoose.model("customeruser", userSchema);