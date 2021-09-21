import crypto from 'crypto'
import Id from '../Id'
import ipRegex from 'ip-regex'
import buildMakeSource from './source'
import buildMakeOrder from "./order";

const makeSource = buildMakeSource({ isValidIp })
const makeOrder = buildMakeOrder({ Id, md5, makeSource })

export default makeOrder

function isValidIp (ip) {
    return ipRegex({ exact: true }).test(ip)
}

function md5 (text) {
    return crypto
        .createHash('md5')
        .update(text, 'utf-8')
        .digest('hex')
}
