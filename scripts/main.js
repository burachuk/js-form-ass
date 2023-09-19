import { Button, Container, createRoot, SelectField } from "./components.js";
import { examples } from "./examples/examples.js";
import { Box, FieldSet } from "./shotrhandComponents.js";
import { formSet } from "./formSet.js";
import { divStyles } from "./examples/styles.js";
import { dictToArray, parseKeyLabel } from "./utils.js";

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

console.log( formSet.gender )
const set = new FieldSet( { fieldProps: null } )

const genderButton = new Button( { text: "Пол" } ).onClick( () => set.setProps( formSet.gender ) )
const cityButton = new Button( { text: "Город" } ).onClick( () => set.setProps( formSet.city ) )
const select = new SelectField( { options: dictToArray( formSet,  parseKeyLabel) } )
select.onChange( (e) => {
    const value = e.target.value
    console.log( "select.onChange value", value )
    console.log( "select.onChange formSet[value]", formSet[value] )
    set.setProps( formSet[value] )
    console.log( "set.fieldProps", set.fieldProps )
} )

const setContainer = new Container().append(
    // genderButton,
    // cityButton,
    select,
    set
)
    .style( divStyles )

const container = document.getElementById( "root" )
const root = createRoot( container )

root.append(
    nav,
    examples,
    box,
    setContainer,
)






