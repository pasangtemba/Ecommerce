const app = require("./app");

const dotenv = require("dotenv");
const path = require("path");
const { Server } = require("http");
const connectDatabase = require("./config/database");

//handeling uncought exception
process.on(`uncaughtException`, (err) => {
  console.log(`ERROR: ${err.message}`);
  console.log(`Shutting down the server due to uncought exception`);
  process.exit(1);
});

//config

dotenv.config({ path: "backend/config/config.env" });

//connecting database

connectDatabase();
app.listen(process.env.PORT, () => {
  console.log(`Server is working on http://loclhost: ${process.env.PORT}`);
});

//handeled promise Rejection

process.on("unhandledRejection", (err) => {
  console.log(`ERROR: ${err.message}`);
  console.log("Shutting down the server due to Unhandled Promise rejection");
  server.close(() => {
    process.exit(1);
  });
});
