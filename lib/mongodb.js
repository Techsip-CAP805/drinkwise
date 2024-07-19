import mongoose from 'mongoose';

const uri = 'mongodb+srv://admin:Secret55@clustertechsip.hbuih2a.mongodb.net/techsipDB'; 

let cachedClient = null;
let cachedDb = null;

export async function connectToDatabase() {
  if (cachedDb) {
    return { client: cachedClient, db: cachedDb };
  }

  if (!uri) {
    throw new Error('Define the MONGODB_URI environment variable inside .env.local');
  }

  const client = await mongoose.connect(uri, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  });

  cachedClient = client;
  cachedDb = client.connection.db;

  return { client, db: cachedDb };
}
