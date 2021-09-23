import makePostProduct from './post-product'
import {addProduct} from '../use-cases'
import notFound from './not-found'

const postProduct = makePostProduct({addProduct})

const productController = Object.freeze({
    postProduct, notFound
})

export default productController
export {postProduct, notFound}