import { Container, Typography } from "../components.js";
import { divStyles } from "./styles.js";
import inputExample from "./onChangeExample.js";
import buttonsExample from "./buttonsExample.js";
import inputPropsExample from "./inputProps.js";
import componentsSelectExample from "./componentsCompositionSelectExample.js";
import selectFieldComponentExample from "./selectFieldComponentExample.js";
import { mountExample } from "./mountExample.js";

const heading = new Typography( { variant: "h3", text: "Примеры" } )

export let examples = new Container()
examples.style( divStyles )
examples.append( heading )


examples.isMounted = false

examples.append(
    inputExample,
    buttonsExample,
    inputPropsExample,
    componentsSelectExample,
    selectFieldComponentExample,
    mountExample,
)
