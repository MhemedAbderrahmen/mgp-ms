import Id from '../Id'

export default function makeOrdersDb({makeDb}) {
    return Object.freeze({
        findByHash,
        insert,
        update
    })

    async function insert({id: _id = Id.makeId(), ...orderInfo}) {
        const db = await makeDb()
        const result = await db
            .collection('orders')
            .insertOne({_id, ...orderInfo})
        const {_id: id, ...insertedInfo} = result.ops[0]
        return {id, ...insertedInfo}
    }

    async function update({id: _id, ...orderInfo}) {
        const db = await makeDb()
        const result = await db
            .collection('orders')
            .updateOne({_id}, {$set: {...orderInfo}})
        return result.modifiedCount > 0 ? {id: _id, ...orderInfo} : null
    }

    async function findByHash(order) {
        const db = await makeDb()
        const result = await db.collection('orders').find({hash: order.hash})
        const found = await result.toArray()
        if (found.length === 0) {
            return null
        }
        const {_id: id, ...insertedInfo} = found[0]
        return {id, ...insertedInfo}
    }
}
