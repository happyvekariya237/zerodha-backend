require("dotenv").config();
const express = require("express");
const app = express();

const mongoose = require("mongoose");
const holdingModel = require("./models/holdingModel.js");
const positionModel  = require("./models/positionModel.js");
const bodyParser= require("body-parser");
const cors=require("cors");
const orderModel = require("./models/orderModel.js");
const cookieParser = require("cookie-parser");
const authRoute = require("./Routes/authRoute.js");

const PORT = process.env.PORT || 8080;
const uri = process.env.MONGO_URL;

// -------------------- FIXED CORS (PLACE ON TOP) --------------------
const allowedOrigins = ["http://localhost:5173", "http://localhost:5174","https://zerodha-dashboard-rh4a.onrender.com","https://zerodha-frontend-ddlu.onrender.com"];

app.use(cors({
  origin: function(origin, callback){
    if(!origin) return callback(null, true); // allow non-browser requests
    if(allowedOrigins.indexOf(origin) === -1){
      const msg = 'The CORS policy for this site does not allow access from the specified Origin.';
      return callback(new Error(msg), false);
    }
    return callback(null, true);
  },
  credentials: true
}));



app.use(express.json());
app.use(bodyParser.json());
app.use(cookieParser());
app.use(express.urlencoded({ extended: true }));

// Routes
app.use("/", authRoute);

app.get("/",(req,res)=>{
  res.send("hellow")
})

app.get("/allHolding", async (req, res) => {
  let allholding = await holdingModel.find({});
  res.json(allholding);
});

app.get("/allposition", async (req, res) => {
  let allpos = await positionModel.find({});
  res.json(allpos);
});

app.post("/newOrder", (req, res) => {
  let newOrder = new orderModel({
    name: req.body.name,
    qty: req.body.qty,
    price: req.body.price,
    mode: req.body.mode,
  });

  newOrder.save();

  holdingModel.create({
    name: req.body.name,
    qty: req.body.qty,
    price: req.body.price,
    isLoss: false
  });

  res.send("done");
});

mongoose
  .connect(uri)
  .then(() => {
    console.log("MongoDB Connected");

    app.listen(PORT, () => {
      console.log("Server running on port", PORT);
    });
  })
  .catch((err) => {
    console.log("MongoDB Error:", err);
  });
