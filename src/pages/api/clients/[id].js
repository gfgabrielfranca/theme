import { MongoClient } from 'mongodb'
import url from 'url'

let cachedDb = null;

async function connectToDatabase(uri) {
  if (cachedDb) return cachedDb

  const client = await MongoClient.connect(uri)

  const dbName = url.parse(uri).pathname.substring(1)
  const db = client.db(dbName)

  cachedDb = db;

  return db
}

export default async function handler(req, res) { 
  const db = await connectToDatabase(process.env.MONGODB_URI)
  const collection = db.collection('theme')

  const query = { id: req.query.id };

  if (req.method === 'POST') {
    await collection.updateOne(query, { $set: { ...req.body } })
    res.status(200).send("Ok")
  } else {
    const result = await collection.findOne(query)
    res.status(200).json(result)
  }
}