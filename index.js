const express = require("express");
const app = express();
const userRouter = require("./routers/userRouter");
require("dotenv").config();
const cors = require("cors");
const helmet = require("helmet");
const compression = require("compression");

app.use(cors());
app.use(helmet());
app.use(express.json());
app.use(compression());
app.use("/", userRouter);

app.listen(process.env.PORT, () => {
  console.log("Server is listening on port 8080");
});
