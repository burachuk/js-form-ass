import { Container, Input, Typography } from "../components.js";
import { divStyles, pStyles } from "./styles.js";

const inputHandler = (event) => {
    const value = event.target.value
    console.log( value )
    output.text = value
}

export const output = new Typography( { text: "Я изменюсь, обещаю" } ).style( pStyles )

const inputExample = new Container()
    .style( divStyles )
    .append(
        new Typography( { variant: "h4", text: "Метод onChange()" } ),
        new Input( { value: "Измени меня" } ).onChange( inputHandler ),
        output
    )

export default inputExample;