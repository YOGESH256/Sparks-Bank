//jshint esversion:6
const express = require("express");
const bodyParser = require("body-parser");
const mongoose= require('mongoose');
const Customer = require("./models/user");
const Transaction = require("./models/Transact");
const AllTransact = require("./models/allpay");
const ejs = require("ejs");
const AppError = require("./views/AppError");




const app = express();

app.set('view engine', 'ejs');

app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static("public"));

mongoose.connect("mongodb+srv://admin-khatri25:Jatin123@cluster0.haoz3.mongodb.net/bankDB" ,  { useUnifiedTopology: true, useNewUrlParser: true, useFindAndModify: false })
.then(() => {
        console.log("connected");
    })
    .catch((err) => {
        console.log("error", err);
    });


function wrapAsync(fn) {
    return function(req, res, next) {
        fn(req, res, next).catch(e => next(e));
    }
};

// app.get("/" , function(req , res) {
//  res.render("bank");
//
// })


app.get("/",  wrapAsync(async(req, res) => {
    const Customers = await Customer.find({});
    if (!Customers) {
         throw new AppError("User Not Found", 401);
    }
    res.render("bank", { Customers });
}));




app.get('/customer/:id/transfer' ,  wrapAsync(async(req , res) => {
  const {id}  =  req.params;
 const AllCustomers =  await Customer.find({});
 const fustomer = await Customer.findById(id);
 console.log(fustomer);

 if(!AllCustomers || !Customer)
{
  throw new AppError("User Not Found", 401);
}



res.render("transfer" , {AllCustomers , fustomer});




}));

app.get('/customer/:id/history' , wrapAsync(async(req , res)=> {
  const {id} = req.params;
  const customer =  await Customer.findById(id);

console.log(customer);
  if(!customer)
  {
    throw new AppError("User Not Found", 401);
  }
    await Customer.findOne({username:customer.username})
          .populate("transactions")
          .exec(function(err , t) {
            t.toObject({getters:true});
            console.log(t);
            res.render("history" , {t});

          })






}));




app.post("/customer" , wrapAsync(async(req , res) =>{
const username = req.body.too;
const from =req.body.from;
const Amount =req.body.amount;
const comment =req.body.comment;
console.log(username , from , Amount , comment);

const giver = await Customer.findOne({username:from}).catch();
const recipient = await  Customer.findOne({username:username}).catch();

console.log(giver.Balance , recipient.Balance);
if(!giver || !recipient)
{
  throw new AppError("User Not Found", 401);
}

if(giver.Balance > 0 && Amount < giver.Balance && Amount > 0)
{
  const a = new Transaction({Date:Date() ,amount:Amount , Description:`Received Rs ${Amount} from ${giver.username}` } );
  await a.save();
  const b = new Transaction({Date:Date() ,amount:Amount , Description:`Paid Rs ${Amount} to ${recipient.username}` } );
  await b.save();
  recipient.transactions.push(a);
  await recipient.save();
  const allTransact = new AllTransact({Date:Date() , payment:`${giver.username} sends  Rs ${Amount} to ${recipient.username}` });

  await allTransact.save();
  giver.transactions.push(b);
  await giver.save();

  const am =parseInt(recipient.Balance) + parseInt(Amount);
  await Customer.findOneAndUpdate({username:from} , {Balance:parseInt(giver.Balance) - parseInt(Amount)});
  await Customer.findOneAndUpdate({username:username} , {Balance:am});
  res.redirect("/");
}
  else if(Amount > giver.Balance) {
   throw new AppError("You Haven't enough Balance to make payment", 500);
  }
  else {
    throw new AppError("Amount should be positive", 500);

  }

}));


app.get("/transactions" , async function(req , res) {
  const ab = await AllTransact.find({});
  res.render("transactions", { ab });


});


app.post("/search" , wrapAsync(async (req , res)=> {

  const searchName =  req.body.search;
if(isNaN(searchName)){

 let Customers = await Customer.find().or([
   { username: searchName}

 ])

 res.render("bank" , {Customers})
}
else {
  let Customers = await Customer.find().or([
    { Balance: searchName}

  ])
  res.render("bank" , {Customers})

}









}));

app.use((err, req, res, next) => {
    const { status = 401, message = "Something wrong Occured" } = err;
    if (!err.message)
        err.message = "Something Wrong";
    res.status(status).render("error", { err });
});

app.listen(process.env.PORT || 3000, function() {
  console.log("Server is Running");

});
