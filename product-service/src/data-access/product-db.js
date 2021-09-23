import Id from '../Id'

export default function makeProductDb({makeDb}) {
    return Object.freeze({
        findByHash,
        insert,
        findById,
        findAll,
        remove,
        update
    })

    async function insert({id: _id = Id.makeId(), ...orderInfo}) {
        const db = await makeDb()
        const result = await db
            .collection('products')
            .insertOne({_id, ...orderInfo})
        const {_id: id, ...insertedInfo} = result.ops[0]
        return {id, ...insertedInfo}
    }

    async function update({id: _id, ...orderInfo}) {
        const db = await makeDb()
        const result = await db
            .collection('products')
            .updateOne({_id}, {$set: {...orderInfo}})
        return result.modifiedCount > 0 ? {id: _id, ...orderInfo} : null
    }

    async function findByHash(order) {
        const db = await makeDb()
        const result = await db.collection('products').find({hash: order.hash})
        const found = await result.toArray()
        if (found.length === 0) {
            return null
        }
        const {_id: id, ...insertedInfo} = found[0]
        return {id, ...insertedInfo}
    }

    async function findAll() {
        const db = await makeDb()
        const result = await db.collection('products').find()
        return (await result.toArray()).map(({_id: id, ...found}) => ({
            id,
            ...found
        }))
    }

    async function findById({id: _id}) {
        const db = await makeDb()
        const result = await db.collection('products').find({_id})
        const found = await result.toArray()
        if (found.length === 0) {
            return null
        }
        const {_id: id, ...info} = found[0]
        return {id, ...info}
    }
    async function remove ({ id: _id }) {
        const db = await makeDb()
        const result = await db.collection('products').deleteOne({ _id })
        return result.deletedCount
    }
}
