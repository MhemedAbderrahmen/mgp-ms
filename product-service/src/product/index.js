import crypto from 'crypto'
import Id from '../Id'
import ipRegex from 'ip-regex'
import buildMakeSource from './source'
import buildMakeProduct from "./product";
import buildMakeDescriptions from "./descriptions";

const makeSource = buildMakeSource({isValidIp})
const makeDescriptions = buildMakeDescriptions()
const makeProduct = buildMakeProduct({Id, md5, makeSource, makeDescriptions})

export default makeProduct

function isValidIp(ip) {
    return ipRegex({exact: true}).test(ip)
}

function md5(text) {
    return crypto
        .createHash('md5')
        .update(text, 'utf-8')
        .digest('hex')
}
