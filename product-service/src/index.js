import express from 'express'
import bodyParser from 'body-parser'
import dotenv from 'dotenv'
import {
    notFound,
    postProduct
} from './controllers'
import makeCallback from './express-callback'
const port = 3001
dotenv.config()

const apiRoot = process.env.DM_API_ROOT
const app = express()
app.use(bodyParser.json())
// TODO: figure out DNT compliance.
app.use((_, res, next) => {
    res.set({Tk: '!'})
    next()
})
app.post(`${apiRoot}/products`, makeCallback(postProduct))
app.use(makeCallback(notFound))

// listen for requests
app.listen(port, () => {
    console.log('Products Service Running on port ' + port)
})

export default app
