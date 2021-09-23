import makeHandleModeration from './handle-moderation'
import productDb from '../data-access'
import makeAddProduct from "./add-product";

const handleModeration = makeHandleModeration()
const addProduct = makeAddProduct({productDb, handleModeration})

const productService = Object.freeze({
    addProduct
})

export default productService
export {addProduct}