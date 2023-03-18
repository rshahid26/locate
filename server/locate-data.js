const {MongoClient, ServerApiVersion} = require('mongodb');
const request = require("request");
const fs = require("fs");

const URI = "mongodb+srv://rshahid26:6DB2EUxyzwvtTpMK@locate-data.2i4pybo.mongodb.net/data?retryWrites=true&w=majority";

const client = new MongoClient(URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    serverApi: ServerApiVersion.v1
});
module.exports = {loadData, listDatabases};

async function loadData(symbol) {
    try {

        // Connect to the MongoDB cluster
        await client.connect();
        const data = await client.db().collection(symbol).find().toArray();

        console.log(data);

    } catch (e) {
        console.error(e);
    } finally {
        await client.close();
    }
}

async function listDatabases(client) {
    const databasesList = await client.db().admin().listDatabases();

    console.log("Databases:");
    databasesList.databases.forEach(db => console.log(` - ${db.name}`));
}
