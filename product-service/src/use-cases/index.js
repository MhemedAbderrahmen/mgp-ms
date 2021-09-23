import makeHandleModeration from './handle-moderation'
import productDb from '../data-access'
import makeAddProduct from "./add-product";
import makeRemoveProduct from "./remove-product";

const handleModeration = makeHandleModeration()
const addProduct = makeAddProduct({productDb, handleModeration})
const removeProduct = makeRemoveProduct({productDb})

const productService = Object.freeze({
    addProduct, removeProduct
})

export default productService
export {addProduct,removeProduct}