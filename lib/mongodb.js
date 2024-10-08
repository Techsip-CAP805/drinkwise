import mongoose from 'mongoose';

const uri = process.env.DB_URL; 

let cachedClient = null;
let cachedDb = null;

export async function connectToDatabase() {
  if (cachedDb) {
    return { client: cachedClient, db: cachedDb };
  }

  if (!uri) {
    throw new Error('Define the MONGODB_URI environment variable inside .env.local');
  }

  const client = await mongoose.connect(uri);

  cachedClient = client;
  cachedDb = client.connection.db;

  return { client, db: cachedDb };
}
