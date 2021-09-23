import makePostProduct from './post-product'
import makeDeleteProduct from "./delete-product";
import {addProduct, removeProduct} from '../use-cases'
import notFound from './not-found'

const postProduct = makePostProduct({addProduct})
const deleteProduct = makeDeleteProduct({removeProduct})

const productController = Object.freeze({
    postProduct, deleteProduct, notFound
})

export default productController
export {postProduct, deleteProduct, notFound}