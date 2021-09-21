import makeHandleModeration from './handle-moderation'
import ordersDb from '../data-access'
import isQuestionable from '../is-questionable'
import makeAddOrder from "./add-order";

const handleModeration = makeHandleModeration({
    isQuestionable
})
const addOrder = makeAddOrder({ordersDb, handleModeration})

const orderService = Object.freeze({
    addOrder
})

export default orderService
export {addOrder}