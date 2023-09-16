/*
Good module begins with docstring
*/

import { Container, Typography } from "./components.js";
import componentsSelectExample from "./examples/componentsCompositionSelectExample.js"
import { divStyles } from "./examples/styles.js";
import inputExample from "./examples/onChangeExample.js";
import buttonsExample from "./examples/buttonsExample.js";
import inputPropsExample from "./examples/inputProps.js";
import selectFieldComponentExample from "./examples/selectFieldComponentExample.js";
import { Box, box } from "./shotrhandComponents.js";

const root = document.getElementById( "form-root" )


const heading = new Typography( { variant: "h3", text: "Примеры" } )
// or heading.text = "Примеры"

const examples = new Container()
examples.style( divStyles )
examples.append( heading )



examples.append(
    inputExample,
    buttonsExample,
    inputPropsExample,
    componentsSelectExample,
    selectFieldComponentExample,
    new Box(),
)


root.appendChild(
    examples.mount()
)
