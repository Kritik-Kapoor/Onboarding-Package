const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const bodyParser = require("body-parser");

const app = express();
port = 3001;
app.use(cors());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

const { ObjectId } = require("mongodb");

app.listen(port, () => {
  console.log(`listening on port ${port}`);
});

async function main() {
  await mongoose.connect("mongodb://127.0.0.1:27017/Onboarding-Package");
  if (mongoose.connection.readyState) console.log("DB connected");
}

main().catch((err) => console.log(err));
