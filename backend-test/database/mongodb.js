const { MongoClient, ServerApiVersion } = require('mongodb');
const uri = "mongodb+srv://sandy4adhi:prabfamily@cluster0.gvikmtt.mongodb.net/?retryWrites=true&w=majority"
// Create a MongoClient with a MongoClientOptions object to set the Stable API version
const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  }
});

const dbconnect = async()=> {
    return (await client.connect()).db("babycare")
}

module.exports = dbconnect