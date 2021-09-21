import makeOrder from '../order'
export default function makeAddOrder ({ ordersDb, handleModeration }) {
    return async function addOrder (orderInfo) {
        console.log(orderInfo)
        const order = makeOrder(orderInfo)
        const exists = await ordersDb.findByHash({ hash: order.getHash() })
        if (exists) {
            return exists
        }

        const moderated = await handleModeration({ order })
        const commentSource = moderated.getSource()
        return ordersDb.insert({
            author: moderated.getAuthor(),
            createdOn: moderated.getCreatedOn(),
            id: moderated.getId(),
            modifiedOn: moderated.getModifiedOn(),
            success:moderated.getSuccess(),
            source: {
                ip: commentSource.getIp(),
                browser: commentSource.getBrowser(),
                referrer: commentSource.getReferrer()
            },
        })
    }
}