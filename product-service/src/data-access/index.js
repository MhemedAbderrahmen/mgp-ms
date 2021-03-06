import mongodb from 'mongodb'
import makeProductDb from "./product-db";

const MongoClient = mongodb.MongoClient
const url = process.env.DM_PRODUCTS_DB_URL
const dbName = process.env.DM_PRODUCTS_DB_NAME
const client = new MongoClient(url, { useNewUrlParser: true })

export async function makeDb () {
    if (!client.isConnected()) {
        await client.connect()
    }
    return client.db(dbName)
}

const productDb = makeProductDb({ makeDb })
export default productDb