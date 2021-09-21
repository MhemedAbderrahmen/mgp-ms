export default function makeHandleModeration({
                                                 isQuestionable
                                             }) {
    return async function handleModeration({order}) {
        const moderated = {...order}
        return moderated
    }
}