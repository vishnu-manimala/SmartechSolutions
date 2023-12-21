const { Redirect } = require("twilio/lib/twiml/VoiceResponse");
const User = require("../Model/userModel");
const bcrypt = require("bcrypt");
const { LocalStorage } = require("node-localstorage");
const localStorage = new LocalStorage("./scratch");

const { floor, ceil, constant } = require("lodash");

const userModel = require("../Model/userModel");
const fetchData = require("../utils/sharedFunctions");

// Login with Password

const loadPasswordLogin = (req, res) => {
  
  try {
    res.status(200);
    res.render("userLogin");
  } catch (err) {
    console.log("in load passwordlogin", err.message);
    res.render("loginUser", { message: `${err.message}` });
  }
};

const userLoginPassword = async (req, res) => {
 
  if (!req.body) {
    return res.status(400).render("userLogin", { message: "NO Data" });
  }
  try {
    console.log("in login")
    const userData = await User.findOne({ username: req.body.username });
    if (!userData) {
      const gData = await fetchData.fetchGoogleUserData(req.body.username);
    
      // const advance = await fetchData.fetchAdvance();
      if (!gData) {
        return res.status(400).render("userLogin", { message: "No Data" });
      }
      console.log("gData",gData)
      const parseData = JSON.parse(gData).data;
      if (parseData.username !== req.body.username) {
        return res
          .status(401)
          .render("userLogin", { message: "Not registered" });
      }
      const employee = await User({
        name: parseData["Official Name As Per Aadhaar"] || "user",
        username: parseData.username,
        contactNumberPersonal: parseData["Personal Number"] || "000",
        contactNumberOfficial: parseData["Company Number"],
        password: parseData.username,
        department: parseData.Department,
        Default_PW: parseData.Default_PW,
      });
      const savedEmp = await employee.save();
      console.log("session")
      if (!savedEmp) {
        return res
          .status(400)
          .render("userLogin", { message: "Something went wrong" });
      }
      req.session.userId = savedEmp._id;
      req.session.username = savedEmp.username;
      console.log("session",req.session.username)
      return res.status(200).redirect("/home");
    } else {
      console.log(userData)
      if (req.body.username.match(userData.username)) {
        req.session.userId = userData._id;
        req.session.username = userData.username;
        // const advance = await fetchData.fetchAdvance();
        // console.log("advance",advance)
        console.log("session",req.session.username)
        return res.status(200).redirect("/home");
      }
    }
  } catch (err) {
    console.log("userLoginPassword", err);
    return res
      .status(500)
      .render("userLogin", { message: "Something went wrong!!" });
  }
};

//@@@@@@@@@@@@@@@@@@@@ logout @@@@@@@@@@@@@@@@@@@@@@@@@@@@@
const logoutUser = (req, res) => {
  try {
    req.session.userId = "";
    res.redirect("/");
  } catch (err) {
    console.log(err.message);
  }
};

const loadHome = (req, res) => {
  if (req.session.userId) {
    return res.status(200).render("home");
  } else {
    return res.status(401).redirect("/");
  }
};

const loadBulk = async (req, res) => {
  const bulkData = await fetchData.fetchGoogleBulkData(req.body.username);
  const fetchAdvance = await fetchData.fetchAdvanceData(req.session.username);
  const advance = JSON.parse(fetchAdvance).data;
  console.log("advance",advance)
  data = JSON.parse(bulkData).arr;
  //console.log("responded", data);
  let transactiondata = [];
  for (const rowKey in data) {
    let details={};
   
    if (data.hasOwnProperty(rowKey)) {
      const rowData = data[rowKey];
    
      if (
         rowData.GivenBy === req.session.username ||
        rowData.ReceivedBy === req.session.username
      ) {
       console.log("in if", rowData.GivenBy,req.session.username,rowData.ReceivedBy )
        const givenByReceivedBy = rowData["GivenBy,ReceivedBy"];
        const givenBy = rowData.GivenBy;
        const date = rowData.Date;
        const amount = rowData.Amount;

       
        details = {
          givenBy: givenBy,
          date: rowData.Date,
          amount: rowData.Amount,
          ReceivedBy: rowData.ReceivedBy,
          Remarks: rowData.Remarks,
          FullApproval: rowData.FullApproval,
          Agreement: rowData["Agreementid-Agreementname"],
        };
      }
    }
    if(Object.keys(details).length !== 0){
      transactiondata.push(details);
    }
    
  }
  // console.log("transactiondata",transactiondata)
  console.log("advance",advance)
  res.status(200).render("latestTransactions", {transactionData:transactiondata,advance:advance});
};



const loadDailyTransaction = async(req,res) =>{
  console.log("responded");

  try{
    return res.status(200).render("dailyTransaction",{username:req.session.username});
  }
  catch(err){
    console.log(err);
    return res.status(500).redirect("/");
  }
}

const fetchDatas = async(req,res)=>{
  try{
    const givenBy = await fetchData.fetchGivenBy();
    const AgreementdBy = await fetchData.fetchAgreement();
    givenBy_data = JSON.parse(givenBy).arr;
    agreementdBy_Data = JSON.parse(AgreementdBy).arr;
   // console.log("responded", agreementdBy_Data);
    let givenByData = [];
    let agreementdByData = [];
    let agreementData = []
    for (const rowKey in agreementdBy_Data) {
      if (givenBy_data.hasOwnProperty(rowKey)) {
        const rowData = agreementdBy_Data[rowKey];
       
        agreementdByData.push(rowData);
        
      }
    }
    agreementdByData.forEach(item => {
      // Access the value without curly braces using Object.values()
      const value = Object.values(item)[0];
      agreementData.push(value)
      console.log(value);
    });
   console.log("agreement", agreementData)

    for (const rowKey in givenBy_data) {
      if (givenBy_data.hasOwnProperty(rowKey)) {
        const rowData = givenBy_data[rowKey];
        givenByData.push(rowData.FULLSTACK);
      }
    }
    console.log("given by", agreementData)
    res.status(200).json({status:"Success",message:"Data fetched",data:{agreement:agreementData,givenBy:givenByData}})
  }catch(err){
    console.log(error);
    res.status(500).json({status:"Error",message:"Something went wrong"})
  }
}

const saveDailyTransaction = async(req,res)=>{
  console.log("body>>",req.body.data);
  try{
    const formData = req.body.data;
    formData.userName = req.session.username;
    console.log("req.session.username",req.session.username)
    const writeResponse = await fetchData.writeDailyTransaction(req.body.data);
    console.log(writeResponse);
    if(writeResponse.message !== "success"){
     return res.json("Error");
    }
    return res.json("success");
  }catch(err){
    console.log(err);
  }
  
}

const getAccounts = async(req,res)=>{
  try{
    res.status(200).render('accounts');
  }catch(err){
    console.log(err);
  }
}
module.exports = {
  logoutUser,
  loadPasswordLogin,
  userLoginPassword,
  loadHome,
  loadBulk,
  loadDailyTransaction,
  saveDailyTransaction,
  fetchDatas,
  getAccounts
};
