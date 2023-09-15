export const getKeyLabelPairs = (dict) => {

    if (Object.keys( dict ).length === 0) {
        throw new Error( "Пустой словарь" )
    }

    const fieldsArray = Object.entries( dict ).map( ([key, value]) => {
        return [key, value?.label]
    } )
    console.log( "getKeyLabelPairs", fieldsArray )
    return fieldsArray
}