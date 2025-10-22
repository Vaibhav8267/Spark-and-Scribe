const initData = require("./log.js");
const Login = require("../model/login.js");
const mongoose = require('mongoose');

// --- (Your DB connection code is fine) ---
const Mongo_URL="mongodb://127.0.0.1:27017/userid";
main().then(()=>{
    console.log("Connected to DB");
}).catch((errr)=>{
    console.log(err); // Note: You had a typo here, 'errr' vs 'err'
});
async function main(){
    await mongoose.connect(Mongo_URL);
} 
// ------------------------------------------


const initDB = async () => {
    await Login.deleteMany({}); // 1. Wipe the database
    
    // 2. Clean the data from your file
    const cleanedData = initData.logd.map(user => ({
        ...user, // <-- Keep the other fields (like password)
        email: user.email.trim().toLowerCase() // <-- Clean the email!
    }));

    // 3. Insert the new, cleaned data
    await Login.insertMany(cleanedData); 
    console.log("User Data was initialized (and cleaned!)");
};

initDB();