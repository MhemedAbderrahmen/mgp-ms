export default function makePostProduct({addProduct}) {
    return async function postProduct(httpRequest) {
        try {
            console.log('Post Product')
            const {source = {}, ...productInfo} = httpRequest.body
            console.log(productInfo)
            source.ip = httpRequest.ip
            source.browser = httpRequest.headers['User-Agent']
            if (httpRequest.headers['Referer']) {
                source.referrer = httpRequest.headers['Referer']
            }
            const created = await addProduct({
                ...productInfo,
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