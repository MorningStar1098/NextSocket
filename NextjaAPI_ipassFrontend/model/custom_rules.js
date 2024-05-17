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
      
         created_at: { type: Date, default: Date.now },

      
    }, {strict:false }
    );

const Transactions = mongoose.model('custom_rules', allrulesSchema);

module.exports = Transactions;
  