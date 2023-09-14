/*
Good module begins with docstring
*/

import { CheckBox, div, RadioInput, TextField } from "./components.js";

const root = document.getElementById( "form-root" )


const radio = new RadioInput( "id", "", "name", "Радио", "radio-value" )
const text = new TextField( "id", "", "name", "Название поля", "Какое-то значение" )
const check = new CheckBox( "id", "", "name", "Да/нет", false )

root.appendChild(
    div()
        .add(
            check.onChange( (e) => console.log( e.target.checked ) )
        )
        .add(
            text.onChange( (e) => console.log( e.target.value ) )
        )
        .add(
            radio.onChange( (e) => console.log( e.target.value ) )
        )
        .render()
)

