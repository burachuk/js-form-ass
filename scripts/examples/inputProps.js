import { Container, Input, Typography } from "../components.js";
import { divStyles } from "./styles.js";

const inputPropsExample = new Container()
    .style( divStyles )
    .append(
        new Typography( { variant: "h4", text: "Свойства инпутов" } ),
        new Input( {
            name: "myInput",
            placeholder: "Плейсхолдер",
            maxlength: 5
        } )
    )

export default inputPropsExample;

