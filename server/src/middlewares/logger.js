const express = require("express");
const { v4: uuid } = require("uuid");
const fs = require("fs");
const path = require("path");
const { format } = require("date-fns");

const logEvents = (message, logFileName) => {
  const date = format(new Date(), "dd-MM-yyyy\t HH:mm:ss");
  const logMessage = `${date}\t${uuid()}\t${message}\n`;
  try {
    if (!fs.existsSync(path.join(__dirname, "..", "logs"))) {
      fs.mkdirSync(path.join(__dirname, "..", "logs"));
    }

    fs.appendFileSync(
      path.join(__dirname, "..", "logs", logFileName),
      logMessage,
    );
  } catch (error) {
    console.log(error);
  }
};

const logger = (req, res, next) => {
  logEvents(`${req.method}\t${req.url}\t${req.headers.origin}`, "reqLog.log");

  console.log(`${req.method}\t${req.path}`);
  next();
};

module.exports = { logEvents, logger };
