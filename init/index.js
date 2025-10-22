const initData = require("./data.js");
const Post = require("../model/post.js");
const mongoose = require('mongoose');

const Mongo_URL="mongodb://127.0.0.1:27017/sparkandscribe";
main().then(()=>{
    console.log("Connected to DB");
}).catch((errr)=>{
    console.log(err);
});
async function main(){
    await mongoose.connect(Mongo_URL);
} 
const initDB=async()=>{
   await Post.deleteMany({});
   await Post.insertMany(initData.data);
   console.log("Data was initiallized");
}
initDB();
// async function main(){
//     mongoose.connect('mongodb://127.0.0.1:27017/sparkandscribe', {
//   useNewUrlParser: true, 
//   useUnifiedTopology: true
// });

//     console.log("Connected to DataBase");

//     // Initialise Database
//     await Post.deleteMany({});
//     await Post.insertMany(initData.data);
//     console.log("Data was Initialized");
//     process.exit(); // End the script properly
// } 

// main().catch((err) => {
//     console.log(err);
//     process.exit(1);
// });