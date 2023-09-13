/*
Good module begins with docstring
*/
import {renderRadioSelect} from "./renderers.js";

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
    }
}

root.appendChild(
    renderRadioSelect( "city", { ...formDefaults.city } )
)
