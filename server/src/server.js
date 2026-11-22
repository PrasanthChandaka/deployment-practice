require("dotenv").config();
const mongoose = require("mongoose");
const express = require("express");
const path = require("path");
const cors = require("cors");
const cookieParser = require("cookie-parser");
const { logger, logEvents } = require("./middlewares/logger");
const errorHandler = require("./middlewares/errorHandler");
const corsOptions = require("./configs/corsConfig");
const connectDb = require("./configs/dbConnect");
const PORT = process.env.PORT || 3001;
const app = express();

connectDb();
app.use(logger);
app.use(cors(corsOptions));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, "public")));
app.use("/", require("./routes/root"));
app.use("/api/auth", require("./routes/authRoutes"));
app.use("/api/users", require("./routes/userRoutes"));
app.use("/api/notes", require("./routes/noteRoutes"));
app.use("/api/messages", require("./routes/messageRoutes"));

app.use((req, res) => {
  res.status(404);

  if (req.accepts("html")) {
    res.sendFile(path.join(__dirname, "views", "404.html"));
  } else if (req.accepts("json")) {
    res.json({ message: "404 Not Found" });
  } else {
    res.type("txt").send("404 Not Found");
  }
});

app.use(errorHandler);

mongoose.connection.once("open", () => {
  console.log("mongodb connected");
  app.listen(PORT, () => {
    console.log(`server is running on port : ${PORT}`);
  });
});

mongoose.connection.on("error", (err) => {
  console.log(err);
  //   logEvents(
  //     `${err.no}:${err.code}\t${err.syscall}\t${err.hostname}`,
  //     "mongoErrorLog.log",
  //   );

  // or we can use like below

  logEvents(`${err.name}: ${err.message}\n${err.stack}`, "mongoErrorLog.log");
});
