import { Input } from "./components.js";

const checkDictValidity = (dict) => {
    const receivedType = typeof dict
    if (!dict || receivedType !== "object") {
        throw Error( `Ожидался object, а получен ${ receivedType }` )
    }
    if (Object.keys( dict ).length === 0) {
        throw new Error( "Пустой словарь" )
    }
}

export const parseKeyLabel = ([key, value]) => [key, value?.label]


export const parseKeyValue = ({ key, value }) => [key, value]


export const dictToArray = (dict, callback) => {
    checkDictValidity( dict )
    console.log(Object.entries( dict ).map( callback ))
    return Object.entries( dict ).map( callback )
}

export const createOption = ([key, value]) => {
    const optionElement = new Input( { tag: "option", value: key } )
    optionElement.text = value
    return optionElement
}


