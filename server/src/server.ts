import mongoose from "mongoose";
import * as dotenv from "dotenv";
dotenv.config({ path: "config.env" });
import app from "./app";

const { DATABASE, SERVER_PORT } = process.env;

if (!DATABASE) {
  throw new Error(
    "Database connection string not provided in environment variables."
  );
}

mongoose.connect(DATABASE).then(() => {
  console.log("database is connected");
});

const port = SERVER_PORT || 6000;
app.listen(port, () => {
  console.log(`server is running on port ${port}`);
});
