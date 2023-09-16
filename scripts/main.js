/*
Good module begins with docstring
*/

import { Button, Container, Input, Typography } from "./components.js";


const root = document.getElementById( "form-root" )

const divStyles = {
    "padding": "16px",
    "background-color": "rgba(181,181,181,0.3)",
    "margin-top": "16px"
}
const pStyles = {
    "padding-top": "16px"
}

const heading = new Typography( { variant: "h3", text: "Примеры" } )
// or heading.text = "Примеры"

const examples = new Container()
examples.style( divStyles )
examples.append( heading )


const inputHandler = (event) => {
    const value = event.target.value
    console.log( value )
    output.text = value
}

const output = new Typography( { text: "Я изменюсь, обещаю" } ).style( pStyles )
const inputExample = new Container()
    .style( divStyles )
    .append(
        new Typography( { variant: "h4", text: "Метод onChange()" } ),
        new Input( { value: "Измени меня" } ).onChange( inputHandler ),
        output
    )


const buttonsExample = new Container()
    .style( divStyles )
    .append(
        new Typography( { variant: "h4", text: "Кнопки" } ),
        new Button().onClick(() => buttonsExample.append(output))
    )

examples.append( inputExample, buttonsExample )


root.appendChild(
    examples.mount()
)
