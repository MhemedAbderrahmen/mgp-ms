export default function makeRemoveProduct ({ productDb }) {
    return async function removeProduct ({ id } = {}) {

        if (!id) {
            throw new Error('You must supply a product id.')
        }

        const productToDelete = await productDb.findById({ id })

        if (!productToDelete) {
            return deleteNothing()
        }

        return hardDelete(productToDelete)
    }

    function deleteNothing () {
        return {
            deletedCount: 0,
            softDelete: false,
            message: 'Product not found, nothing to delete.'
        }
    }

    async function hardDelete (product) {
        await productDb.remove(product)
        return {
            deletedCount: 1,
            softDelete: false,
            message: 'Product deleted.'
        }
    }
}