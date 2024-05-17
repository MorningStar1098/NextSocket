const mongoose = require('mongoose');

const transactionsSchema = new mongoose.Schema({  
    label:{type:String},
    date:{type: Date},
    account_type:{type:String},
    createdAt:{type:String},
    complete:{type:String}
},

 {strict:false }
);

const Transactions = mongoose.model('Transactions', transactionsSchema);

module.exports = Transactions;
