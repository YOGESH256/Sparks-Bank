const mongoose = require('mongoose');




const allTransactSchema = new mongoose.Schema({
  Date:Date,
  payment:String

});






const AllTransact = mongoose.model("AllTransact" , allTransactSchema);

module.exports = AllTransact;
