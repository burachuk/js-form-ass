/*
Good module begins with docstring
*/

import { Button, CheckBox, div, RadioInput, TextField, SubTitle, Select } from "./components.js";
import { DynamicForm, DynamicFormBlock, FieldSet } from "./dynamicForm.js";
import {getKeyLabelPairs} from "./utils.js";
import { TestElement } from "./test.js";

const root = document.getElementById( "form-root" )

const formDefaults = {
    city: {
        label: "Город",
        type: "radio",
        options: [
            {
                value: true,
                optionLabel: "Указан"
            },
            {
                value: false,
                optionLabel: "Не указан"
            },
            {
                value: "value",
                optionLabel: "Выбрать город"
            }
        ]
    },
    gender: {
        label: "Пол",
        type: "radio",
        options: [
            {
                value: true,
                optionLabel: "Указан"
            },
            {
                value: false,
                optionLabel: "Не указан"
            },
            {
                value: "value",
                optionLabel: "Выбрать пол"
            }
        ]
    },
    isActive: {
        label: "Активен",
        type: "checkbox"
    }
}


const fb = new DynamicFormBlock(getKeyLabelPairs(formDefaults), formDefaults)

root.appendChild(
    div()
        .add(
            fb.mount()
        )
        .render()
)

const t = new TestElement()

root.appendChild(
    t.mount()
)
const b = document.createElement( "button" )
b.addEventListener( "click", () => t.increment() )
b.innerText = "Increment"
root.appendChild(
    b
)

