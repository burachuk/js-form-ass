import { Button, Container, createRoot } from "./components.js";
import { examples } from "./examples/examples.js";
import { Box } from "./shotrhandComponents.js";

const box = new Container() // Если убрать Container(), то у Box родитель будет не наш компонент, а html элемент.
    // Будет баг - копии этого бокса. Дело, судя по всему, в #compose()
    .append(
        new Box()
    )

const examplesButton = new Button( { text: "Примеры >" } )
const getExamples = () => {
    console.log( "examples", examples.isMounted )
    examples.mount()
    box.unmount()
}
examplesButton.onClick( getExamples )
const formButton = new Button( { text: "< Форма" } )
const getForm = () => {
    console.log( "examples", examples.isMounted )
    box.mount()
    examples.unmount()
}
formButton.onClick( getForm )


const nav = new Container().append( formButton, examplesButton )

const container = document.getElementById( "root" )
const root = createRoot( container )

root.append(
    nav,
    examples,
    box
)

console.log(box.parent)





