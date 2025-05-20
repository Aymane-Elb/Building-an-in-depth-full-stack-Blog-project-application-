const express = require("express");
const app = express();
const { MongoClient } = require('mongose');
const uri = 'mongodb://localhost:27017';
const client = new MongoClient(uri);

async function connectDB() 
{

  try 
  {
    await client.connect();
    const db = client.db('myDatabase');
    console.log('Connected');
    // Use `db` here
  } catch (err) 
  {
    console.error(err);
  }
}
connectDB();
const PORT = 8000;

 