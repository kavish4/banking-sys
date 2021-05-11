const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");

const app = express();
app.set('view engine','ejs');
app.use(bodyParser.urlencoded({extended:true}));
app.use(express.static("public"));

mongoose.connect("mongodb://localhost:27017/customerdb",{useNewUrlParser:true});

const customerSchema = {
  name:String,
  email:String,
  balance:Number
};

const Customer = mongoose.model("Customer",customerSchema);

module.exports = Customer;

const customer1 = new Customer({
  name:"Tanya",
  email:"tanya@gmail.com",
  balance:50000
});

const customer2 = new Customer({
  name:"Rucha",
  email:"RuchaS@gmail.com",
  balance:5500
});

const customer3 = new Customer({
  name:"Shinde",
  email:"ShindeAm@gmail.com",
  balance:65700
});

const customer4 = new Customer({
  name:"Kirti Sai",
  email:"SaiK@gmail.com",
  balance:5009
});

const customer5 = new Customer({
  name:"Jaya Himalya",
  email:"JayaH@gmail.com",
  balance:599900
});

const customer6 = new Customer({
  name:"Rishabh Srivastava",
  email:"srivasR@gmail.com",
  balance:1000
});

const customer7 = new Customer({
  name:"Devansh Srivastava",
  email:"sridevansh@gmail.com",
  balance:30000
});
const customer8 = new Customer({
  name:"Sahil",
  email:"sahil@reddif.com",
  balance:1500
});
const customer9 = new Customer({
  name:"Harsha bhogle",
  email:"harhsa@gmail.com",
  balance:10050
});
const customer10 = new Customer({
  name:"Rishabh Sahu",
  email:"sahuR@gmail.com",
  balance:1000
});

const defaultcust = [customer1,customer2,customer3,customer4,customer5,customer6,customer7,customer8,customer9,customer10];

Customer.insertMany(defaultcust,function(err){
  if (err) {
    console.log(err);
  }
  else {
    console.log("Successfully saved items to database");
  }
})

app.get("/",function(req,res){
  // res.render("index");
  res.render("index",{ customers: null });
})
app.get("/customer",async function(req,res){
  const customer = await
  Customer.find({});
  if(!customer){
    throw new AppError("No user exist",401);
  }
  res.render("customer",{customer});
  // Customer.find({},function(err,foundCustomers){
  //   res.render("customer",{newListCustomers:foundCustomers});
  });
  // res.render("customer");
// });
app.get("/history",function(req,res){
  res.render("history");
})
app.get("/transfer",function(req,res){
  res.render("transfer");
})

// app.post("")

app.listen(2000,function(){
  console.log("Server started on port 2000");
});
