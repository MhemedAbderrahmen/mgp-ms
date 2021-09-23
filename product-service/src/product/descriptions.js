export default function buildMakeDescriptions() {

    return function makeDescriptions({short, medium, long} = {}) {
        if (!short) {
            throw new Error('Product description must contain a long description.')
        }
        if (!medium) {
            throw new Error('Product description must contain a medium description.')
        }
        if (!long) {
            throw new Error('Product description must contain a long description.')
        }


        return Object.freeze({
            getShort: () => short,
            getMedium: () => medium,
            getLong: () => long
        })
    }
}