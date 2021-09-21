export default function buildMakeOrder({Id, md5, makeSource}) {
    return function makeOrder({
                                  author,
                                  createdOn = Date.now(),
                                  id = Id.makeId(),
                                  source,
                                  modifiedOn = Date.now(),
                                  success = false
                              } = {}) {
        if (!Id.isValidId(id)) {
            throw new Error('Order must have a valid id.')
        }
        if (!author) {
            throw new Error('Order must have an author.')
        }
        if (author.length < 2) {
            throw new Error("Order author's name must be longer than 2 characters.")
        }
        if (!source) {
            throw new Error('Order must have a source.')
        }

        const validSource = makeSource(source)
        const deletedText = '.xX This Order has been deleted Xx.'
        let hash

        return Object.freeze({
            getAuthor: () => author,
            getCreatedOn: () => createdOn,
            getId: () => id,
            getSuccess: () => success,
            getHash: () => hash || (hash = makeHash()),
            getSource: () => validSource,
            getModifiedOn: () => modifiedOn,
        })

        function makeHash() {
            return md5(author)
        }
    }
}
