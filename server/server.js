import express from "express";
import { readdirSync } from "fs";
import cors from "cors";
import mongoose from "mongoose";
const morgan = require("morgan");
require("dotenv").config();

const app = express();

app.use(cors());
app.use(morgan("dev"));

const port = process.env.PORT || 8000;
const database = process.env.DATABASE;

mongoose
  .connect(database, {
    useNewUrlParser: true,
    useFindAndModify: true,
    useUnifiedTopology: true,
    useCreateIndex: true,
  })
  .then(() => console.log("DB connected"))
  .catch((err) => console.log(err));

// Router Middleware
readdirSync("./routes").map((route) =>
  app.use("/api", require(`./routes/${route}`))
);

app.listen(port, () => console.log("Server is running"));
