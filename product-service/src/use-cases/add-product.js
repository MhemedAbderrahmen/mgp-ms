import makeProduct from '../product'
export default function makeAddProduct ({ productDb, handleModeration }) {
    return async function addOrder (productInfo) {
        console.log(productInfo)
        const product = makeProduct(productInfo)
        const exists = await productDb.findByHash({ hash: product.getHash() })
        if (exists) {
            return exists
        }

        const moderated = await handleModeration({ product })
        const commentSource = moderated.getSource()
        return productDb.insert({
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