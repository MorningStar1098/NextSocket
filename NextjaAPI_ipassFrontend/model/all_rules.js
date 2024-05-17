const mongoose = require('mongoose');

const allrulesSchema = new mongoose.Schema({  
 
    NAME: {
        type: String,
    },
    ID:{type:String},

    ACTION: {
        type: String,                                
         },
         CATEGORY: { type: String },
      
// Date:{type :String},
      
    }, {strict:false }
    );

const Transactions = mongoose.model('allrules', allrulesSchema);

module.exports = Transactions;
  