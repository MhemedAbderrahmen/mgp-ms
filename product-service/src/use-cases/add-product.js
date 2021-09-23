import makeProduct from '../product'

export default function makeAddProduct({productDb, handleModeration}) {
    return async function addOrder(productInfo) {

        console.log(productInfo)

        const product = makeProduct(productInfo)
        const exists = await productDb.findByHash({hash: product.getHash()})
        if (exists) {
            return exists
        }

        const moderated = await handleModeration({product})
        const productSource = moderated.getSource()
        const productDescriptions = moderated.getDescriptions()
        console.log(productDescriptions)
        return productDb.insert({
            id: moderated.getId(),
            name: moderated.getName(),
            sku: moderated.getSku(),
            descriptions: {
                short: productDescriptions.getShort(),
                medium: productDescriptions.getMedium(),
                long: productDescriptions.getLong()
            },
            media: moderated.getMedia(),
            modifiedOn: moderated.getModifiedOn(),
            createdOn: moderated.getCreatedOn(),
            source: {
                ip: productSource.getIp(),
                browser: productSource.getBrowser(),
                referrer: productSource.getReferrer()
            },
        })
    }
}