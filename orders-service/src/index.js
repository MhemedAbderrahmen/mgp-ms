import express from 'express'
import bodyParser from 'body-parser'
import dotenv from 'dotenv'
import {
    notFound,
    postOrder
} from './controllers'
import makeCallback from './express-callback'

dotenv.config()

const apiRoot = process.env.DM_API_ROOT
const app = express()
app.use(bodyParser.json())
// TODO: figure out DNT compliance.
app.use((_, res, next) => {
    res.set({Tk: '!'})
    next()
})
app.post(`${apiRoot}/orders`, makeCallback(postOrder))
app.use(makeCallback(notFound))

// listen for requests
app.listen(3000, () => {
    console.log('Orders Service Running on port 3000')
})

export default app
