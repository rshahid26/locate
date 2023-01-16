const {MongoClient, ServerApiVersion} = require('mongodb');

const uri = "mongodb+srv://locate:rs@locate-data.2i4pybo.mongodb.net/?retryWrites=true&w=majority";
const client = new MongoClient(uri, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    serverApi: ServerApiVersion.v1
});
module.exports = {loadData, listDatabases};

//loadData('GME');
async function loadData(symbol) {
    try {
        // Connect to the MongoDB cluster
        await client.connect();
        await listDatabases(client);

        //console.log(client.db().listCollections());

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
