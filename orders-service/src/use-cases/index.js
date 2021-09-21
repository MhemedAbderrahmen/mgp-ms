import makeHandleModeration from './handle-moderation'
import ordersDb from '../data-access'
import makeAddOrder from "./add-order";

const handleModeration = makeHandleModeration()
const addOrder = makeAddOrder({ordersDb, handleModeration})

const orderService = Object.freeze({
    addOrder
})

export default orderService
export {addOrder}