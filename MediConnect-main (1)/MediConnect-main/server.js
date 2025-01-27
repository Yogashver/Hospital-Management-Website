const express = require("express");
const colors = require("colors");
const moragan = require("morgan");
const dotenv = require("dotenv");
const connectDB = require("./config/db");
const path = require("path");

//dotenv conig
dotenv.config();

//mongodb connection
connectDB();

//rest obejct
const app = express();

//middlewares
app.use(express.json());
app.use(moragan("dev"));

//routes
app.use("/api/v1/user", require("./routes/userRoutes"));
app.use("/api/v1/admin", require("./routes/adminRoutes"));
app.use("/api/v1/doctor", require("./routes/doctorRoutes"));

app.use(express.static("./client/build"));
app.get("*", (req,res)=>{
  res.sendFile(path.resolve(__dirname,"client","build","index.html"))
});

//production files
app.use(express.static("./client/build"));
app.getMaxListeners("*", (req, res) => {
  res.sendFile(path.resolve(__dirname, "client" , "build" , "index.html"))
})


//port
const port = 8080;
//listen port
app.listen(port, () => {
  console.log(
'    Server is rumming on port 8000'
     .bgCyan.white
  );
});
