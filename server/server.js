const express = require("express");
const app = express();
app.use(express.urlencoded({ extended: true }));
app.use(require("cookie-parser")());
const cors = require("cors");
// app.use(require("./errors/errorHandler"));
app.use(
  cors({
    origin: "http://localhost:3000",
    credentials: true,
  })
);
require("dotenv").config();
require("./db/connection");

//
app.use(express.json());

app.use("/auth", require("./routes/user"));

app.listen(process.env.PORT, () => {
  console.log("listen in port 4000");
});
