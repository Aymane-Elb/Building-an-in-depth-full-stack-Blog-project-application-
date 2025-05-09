const express = require("express");
const app = express();
const { MongoClient } = require('mongodb');
const uri = 'mongodb://localhost:27017';
const client = new MongoClient(uri);

async function connectDB() {
  try {
    await client.connect();
    const db = client.db('yourDBName');
    console.log('Connected');
    // Use `db` here
  } catch (err) {
    console.error(err);
  }
}
connectDB();
const PORT = 8000;

app.get("/", (req, res) => {
  res.send("Server is running!");
});

app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});
 