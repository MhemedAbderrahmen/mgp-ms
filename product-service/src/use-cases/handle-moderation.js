export default function makeHandleModeration() {
    return async function handleModeration({product}) {
        const moderated = {...product}
        return moderated
    }
}