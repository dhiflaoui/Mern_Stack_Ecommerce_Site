const express = require("express");
require("dotenv").config();
const mongoose = require("mongoose");
const morgan = require("morgan");
const bodyParser = require("body-parser");
const cookieParser = require("cookie-parser");
const expressValidator = require("express-validator");
const cors = require("cors");
//import routes
const authRoutes = require("./routes/auth");
const userRoutes = require("./routes/user");

//app
const app = express();
//db connection
mongoose
  .connect(process.env.DATABASE, {
    useNewUrlParser: true,
  })
  .then(() => console.log("DB Connected"));

mongoose.connection.on("error", (err) => {
  console.log(`DB connection error: ${err.message}`);
});

//routes middleware
app.use("/api", authRoutes);
app.use("/api", userRoutes);

//middleware
app.use(morgan("dev"));
app.use(bodyParser.json);
app.use(cookieParser());
app.use(expressValidator());
app.use(cors());

const port = process.env.PORT || 8000;

app.listen(port, () => {
  console.log(`Listening on port ${port}`);
});
