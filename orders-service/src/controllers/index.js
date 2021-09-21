import makePostOrder from './post-order'
import {addOrder} from '../use-cases'
import notFound from './not-found'

const postOrder = makePostOrder({addOrder})

const orderController = Object.freeze({
    postOrder, notFound
})

export default orderController
export {postOrder, notFound}