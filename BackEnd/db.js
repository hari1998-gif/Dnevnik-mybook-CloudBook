const mongoose = require("mongoose");
const mongoURI = "mongodb://127.0.0.1:27017/dnevnik";
const connectToMongo = async () => {
  await mongoose.connect(mongoURI) 
    try {
    console.log("connected to Mongo successfully")
  }
  catch {
    console.log(e);
  }
};
module.exports = connectToMongo;
