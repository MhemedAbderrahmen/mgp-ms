export default function makePostOrder({addOrder}) {
    return async function postOrder(httpRequest) {
        try {
            console.log('Post Order')
            const {source = {}, ...orderInfo} = httpRequest.body
            console.log(orderInfo)
            source.ip = httpRequest.ip
            source.browser = httpRequest.headers['User-Agent']
            if (httpRequest.headers['Referer']) {
                source.referrer = httpRequest.headers['Referer']
            }
            const created = await addOrder({
                ...orderInfo,
                source
            })
            return {
                headers: {
                    'Content-Type': 'application/json',
                    'Last-Modified': new Date(created.modifiedOn).toUTCString()
                },
                statusCode: 201,
                body: {created}
            }
        } catch (e) {
            // TODO: Error logging
            console.log(e)

            return {
                headers: {
                    'Content-Type': 'application/json'
                },
                statusCode: 400,
                body: {
                    error: e.message
                }
            }
        }
    }
}