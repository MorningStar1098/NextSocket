import { Schema, model, models } from 'mongoose';

const userSchema = new Schema({
  
  email: { type: String, unique: true },
  password: { type: String },
  isSupAdmin: { type: String},
  public_key:{type:String},
  private_key:{type:String},
  temp_token:{type:String}

});

const users = models.users || model('users', userSchema);

export default users
