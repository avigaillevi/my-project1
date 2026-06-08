import "dotenv/config";
import connectToDatabase from "./config/db.js";
import app from "./app.js";

const port = process.env.PORT || 5000;

const startServer = async () => {
  await connectToDatabase();
  console.log("Database connection established");

  app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
  });
}

startServer();
