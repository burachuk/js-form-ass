import { Container, Input, Typography } from "../components.js";
import { divStyles } from "./styles.js";

export const optionsArray = [["city", "Город"], ["gender", "Пол"]]

const selectedLabel = new Typography()
selectedLabel.text = "Выберите поле"

const selectInput = new Input( {
    tag: "select",
    name: "select"
} )
selectInput.onChange( (e) => {
    const value = e.target.value
    selectedLabel.text = value
    console.log( { [e.target.name]: value } )
} )


const optionElements = optionsArray.map(
    ([key, value]) => {
        const optionElement = new Input( {
            tag: "option",
            value: key
        } )
        optionElement.text = value
        return optionElement
    }
)

const dummyOption = new Input( {
    tag: "option",
    value: undefined
} )
dummyOption.text = "-----"

selectInput.append( dummyOption, ...optionElements )

const componentsSelectExample = new Container()
    .style( divStyles )
    .append(
        new Typography( {
            variant: "h4",
            text: "Реализация на простых компонентах"
        } ),
        selectInput,
        selectedLabel
    )

export default componentsSelectExample;