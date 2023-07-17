require("dotenv").config();
const express = require("express");
const app = express();
const authMiddleware = require("./middlewares/auth");
app.use(authMiddleware);

app.use(express.json());

const userRouter = require("./routes/user");
const articleRouter = require("./routes/article");

const mongoose = require("mongoose");

mongoose.connect(`mongodb://localhost:27017/${process.env.DB_NAME}`, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

mongoose.connection.on("error", (error) => {
  console.error(`Error connecting to DATABASE: ${error}`);
});

mongoose.connection.on("open", () => {
  console.log(
    `Establishing connected to DATABASE [${process.env.DATABASE_NAME}] -> 💾`
  );
});

app.listen(process.env.SERVER_PORT, () => {
  console.log(`App listening on port [${process.env.SERVER_PORT}] ... 🐳`);
});

app.use("/user", userRouter);
app.use("article", articleRouter);
