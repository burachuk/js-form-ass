import { Button, Container, Typography } from "../components.js";
import { divStyles } from "./styles.js";
// можно импортировать объекты как обычно
import { output } from "./onChangeExample.js";

const buttonsExample = new Container()
    .style( divStyles )
    .append(
        new Typography( { variant: "h4", text: "Кнопки" } ),
        new Button().onClick( () => buttonsExample.append( output ) )
    )

export default buttonsExample;