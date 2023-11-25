 const writeDailyTransaction = async(transactionData) => {
  console.log(transactionData);
  var currentDate = new Date();
  const data = {
    header: "TimseStamp,Date,IN/OUT,Given By,Received By,Amount,Remarks,AgreementId- AgreementName,TAX,emailid",
    URL: "https://docs.google.com/spreadsheets/d/1et_HFj6JfkYDW4MXK1JARjf_lfZp62r-JXvdNcF_J6s/",
    "wsID":1014547245,
    //SheetName  : "INOUT_TRANSACTIONS",
    "TimseStamp": currentDate,
    "Date": transactionData.transactionDate,
    "IN/OUT": transactionData.transactionType,
    "Given By": transactionData.givenBy,
    "Received By": transactionData.receivedBy,
    "Amount": transactionData.transactionAmount,
    "Remarks": transactionData.remarks,
    "AgreementId- AgreementName": transactionData.agreement,
    "TAX":transactionData.taxBill,
    emailid:transactionData.userName
  };
  
 
    const url =  "https://script.google.com/macros/s/AKfycbz77EemSKxKRebgC1uINtOhuZm-vmt91Nxay-o4KnqcvW3yuR_1B-5J1oX_AaXkfWuYBg/exec";
    const options =  {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    };
    let responseData = await fetch(url,options)
     return responseData.json();
 }
 
 const fetchGoogleUserData = async(username) =>{
    console.log("in fetchGoogleUserData",username);
    const data = {
    header : "username,Personal Number,Official,Name As Per Aadhaar,Department,Company Number,Default_PW",
    URL : "https://docs.google.com/spreadsheets/d/1jw9lfqz19GzzkohlZBnPB6iY3bBeI_RvNMPZdBI4zxI/edit#gid=1895476204",
    wsID : 1895476204,
    keyheader : "username",
    keyvalue : username,
    };


    const url =  "https://script.google.com/macros/s/AKfycbz_2mzARbhXhI-MEKJaKw2NGKRdaEJtkqzsAKyHJxYuoORR6ZTv4-bz0dnJ6axoebj4/exec";
    const options =  {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    };
    let responseData = await fetch(url,options)
     return responseData.json();
}
const fetchAdvanceData = async(username) =>{
  console.log("in fetchGoogleUserData",username);
  const data = {
  header : "username,_CurrentAdvance",
  URL : "https://docs.google.com/spreadsheets/d/1iJZYu2wD0x5Td68GPBfpjYwPwIWUAG8FPWPQLLXIAHg/edit",
  wsID :314400978,
  keyheader : "username",
  keyvalue : username,
  };


  const url =  "https://script.google.com/macros/s/AKfycbz_2mzARbhXhI-MEKJaKw2NGKRdaEJtkqzsAKyHJxYuoORR6ZTv4-bz0dnJ6axoebj4/exec";
  const options =  {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  };
  let responseData = await fetch(url,options)
  console.log("response>>",responseData)
   return responseData.json();
}
// const fetchAdvance = async()=>{
//   const data = {
 
//     URL : "https://docs.google.com/spreadsheets/d/1iJZYu2wD0x5Td68GPBfpjYwPwIWUAG8FPWPQLLXIAHg/edit",
//     wsID :314400978
//     };
  
//     const url =  "https://script.google.com/macros/s/AKfycbx3dpGbLYbbFJEDDUFPsdyNmTSGlZ8dFYpBFHKUpRen_XPWMdSz0u35q7TFnu9immiZPw/exec";
//     const options =  {
//       method: "POST",
//       headers: { "Content-Type": "application/json" },
//       body: JSON.stringify(data),
//     };
//     let responseData = await fetch(url,options)
//     //console.log("response",responseData.arr)
//     //console.log("advance>>",responseData)
//      return responseData.json();
     
// }


const fetchGoogleBulkData = async(username) =>{
  
  const data = {
 
  URL : "https://docs.google.com/spreadsheets/d/1iJZYu2wD0x5Td68GPBfpjYwPwIWUAG8FPWPQLLXIAHg/edit",
  wsID :578471227
  };

  const url =  "https://script.google.com/macros/s/AKfycbx3dpGbLYbbFJEDDUFPsdyNmTSGlZ8dFYpBFHKUpRen_XPWMdSz0u35q7TFnu9immiZPw/exec";
  const options =  {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  };
  let responseData = await fetch(url,options)
  //console.log("response",responseData.arr)
   return responseData.json();
}

const fetchGivenBy = async() =>{
  console.log("in fetch");
  const data = {
 
  URL : "https://docs.google.com/spreadsheets/d/1et_HFj6JfkYDW4MXK1JARjf_lfZp62r-JXvdNcF_J6s/edit",
  wsID :246779895
  };

  const url =  "https://script.google.com/macros/s/AKfycbx3dpGbLYbbFJEDDUFPsdyNmTSGlZ8dFYpBFHKUpRen_XPWMdSz0u35q7TFnu9immiZPw/exec";
  const options =  {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  };
  let responseData = await fetch(url,options)
  console.log("response",responseData)
   return responseData.json();
}

const fetchAgreement = async() =>{
 
  console.log("in fetch");
  const data = {
 
  URL : "https://docs.google.com/spreadsheets/d/1et_HFj6JfkYDW4MXK1JARjf_lfZp62r-JXvdNcF_J6s/edit",
  wsID :1045641137
  };

  const url =  "https://script.google.com/macros/s/AKfycbx3dpGbLYbbFJEDDUFPsdyNmTSGlZ8dFYpBFHKUpRen_XPWMdSz0u35q7TFnu9immiZPw/exec";
  const options =  {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  };
  let responseData = await fetch(url,options)
  console.log("response",responseData)
   return responseData.json();
}

module.exports = {
    fetchGoogleUserData,
    fetchGoogleBulkData,
    fetchAgreement,
    fetchGivenBy,
    writeDailyTransaction,
    fetchAdvanceData
}