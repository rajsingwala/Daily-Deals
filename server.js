const express = require("express");
const mongoose = require("mongoose");
// const cors = require("cors");
const bodyParser = require("body-parser");
// const morgan = require("morgan");
const fs = require("fs");
// require("dotenv").config();
const { MONGOURI } = require("./config/keys");

// app
const app = express();

// db
console.log("prod : ",process.env.NODE_ENV);
console.log("mongo : ",MONGOURI);
mongoose
  .connect(MONGOURI, {
    useNewUrlParser: true,
    useCreateIndex: true,
    useFindAndModify: false,
    useUnifiedTopology: true,
  })
  .then(() => console.log(`DB Connected`))
  .catch((err) => console.log(`DB Connection Error ${err}`));

// middlewares
// app.use(morgan("dev"));
app.use(bodyParser.json({ limit: "50mb" }));
// app.use(cors());

// routes
fs.readdirSync("./routes").map((r) => app.use(require("./routes/" + r)));

if (process.env.NODE_ENV === "production") {
  app.use(express.static("client/build"));
  const path = require("path");
  app.get("*", (req, res) => {
    res.sendFile(path.resolve(__dirname, "client", "build", "index.html"));
  });
}

// port
const port = process.env.PORT || 5000;

app.listen(port, () => console.log(`Server is running on ${port}`));
