const mongoose = require('mongoose');



const transactSchema =  new mongoose.Schema({
  
  Date:Date,
  Amount:Number,
  Description: String,
  comment:String

});





const Transaction = mongoose.model("Transaction" , transactSchema);



module.exports = Transaction;
