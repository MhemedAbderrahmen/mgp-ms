export default function makeHandleModeration() {
    return async function handleModeration({order}) {
        const moderated = {...order}
        return moderated
    }
}