import mongodb from 'mongodb'
import makeOrdersDb from "./orders-db";

const MongoClient = mongodb.MongoClient
const url = process.env.DM_ORDERS_DB_URL
const dbName = process.env.DM_ORDERS__DB_NAME
const client = new MongoClient(url, { useNewUrlParser: true })

export async function makeDb () {
    if (!client.isConnected()) {
        await client.connect()
    }
    return client.db(dbName)
}

const ordersDb = makeOrdersDb({ makeDb })
export default ordersDb