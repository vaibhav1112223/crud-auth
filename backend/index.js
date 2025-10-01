const express=require("express")

const connectDB = require('./config/db');
const dotenv = require('dotenv');
const authRoutes = require("./routes/auth");
const taskRoutes = require("./routes/task");
const cors=require("cors")


dotenv.config()
connectDB()


const app=express()
app.use(cors())
app.use(express.json());
app.use((req, res, next) => {
  console.log("Headers:", req.headers);
  console.log("Body:", req.body);
  next();
});

app.use("/api/auth", authRoutes);
app.use("/api/tasks", taskRoutes);
const PORT=process.env.PORT || 5000
app.listen(PORT,(req,res)=>{
    console.log(`listening on ${PORT}`)
})