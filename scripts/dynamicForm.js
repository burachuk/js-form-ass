/*
In progress...
*/
import { div } from "./components.js";

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
    }
}

class DynamicForm {
    constructor(title = "Сегментация пользователей") {
        this.className = "dynamicForm"
        this.title = title
    }

    render(root) {
        const formWrapper = div( { id: this.className } )
        const formHeading = document.createElement( "h4" )
        formHeading.innerText = this.title
        formWrapper.appendChild( formHeading )
        root.appendChild(
            formWrapper
        )
    }
}


// for (const [key, props] of Object.entries(formDefaults)) {
//     root.appendChild(
//         renderRadioSelect(key, props)
//     )
// }