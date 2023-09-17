import { Button, Container, Typography } from "../components.js";
import { divStyles } from "./styles.js";

const someElement = new Typography( { text: "Убери меня" } )
console.log( someElement.element.parentElement )

const heading = new Typography({variant: "h4", text: "Зачем нужен shadow DOM?"})

const addHandler = () => {
    someElement.mount()
    addButton.disable()
    removeButton.enable()
}

const removeHandler = () => {
    someElement.unmount()
    removeButton.disable()
    addButton.enable()
}

const addButton = new Button( { text: "Добавить элемент" } ).onClick( addHandler ).disable()
const removeButton = new Button( { text: "Убрать элемент" } ).onClick( removeHandler )

export const mountExample = new Container().style( divStyles ).append(
    new Container().append(
        heading,
        removeButton,
        addButton,
        new Typography( { text: 1 } ),
        someElement,
        new Typography( { text: 2 } )
    )
)
