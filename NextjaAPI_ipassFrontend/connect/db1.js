import mongoose from 'mongoose';
const secret=process.env.MONO_URL
console.log(secret);
const connectMongo = async () => mongoose.connect(secret,{
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })

export default connectMongo;