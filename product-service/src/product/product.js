export default function buildMakeProduct({Id, md5, makeSource, makeDescriptions}) {
    return function makeProduct({
                                    id = Id.makeId(),
                                    name,
                                    sku,
                                    descriptions,
                                    media,
                                    source,
                                    createdOn = Date.now(),
                                    modifiedOn = Date.now(),
                                } = {}) {

        if (!Id.isValidId(id)) {
            throw new Error('Order must have a valid id.')
        }
        if (!name) {
            throw new Error('Product must have a name.')
        }
        if (!sku) {
            throw new Error("Product must have an sku.")
        }
        if (!descriptions) {
            throw new Error("Product must have a description")
        }
        if (!source) {
            throw new Error('Order must have a source.')
        }

        const validSource = makeSource(source)
        const validDescriptions = makeDescriptions(descriptions)

        let hash

        return Object.freeze({
            getId: () => id,
            getHash: () => hash || (hash = makeHash()),
            getName: () => name,
            getSku: () => sku,
            getDescriptions: () => validDescriptions,
            getMedia: () => media,
            getSource: () => validSource,
            getCreatedOn: () => createdOn,
            getModifiedOn: () => modifiedOn,
        })

        function makeHash() {
            return md5(id)
        }
    }
}
