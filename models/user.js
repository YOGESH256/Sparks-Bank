const mongoose = require('mongoose');



const customerSchema = new mongoose.Schema({
  username:{
    type:String,
    required:true
  },
email:{
  type:String,
  required:true
},
transactions:[{
        type: mongoose.Schema.Types.ObjectId, ref:"Transaction"}],
Balance:Number,
contact:Number,
about: String



});


const Customer = mongoose.model("Customer" , customerSchema);

module.exports = Customer;
