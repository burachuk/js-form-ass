import { Button, Component, Container, SelectField, Typography } from "./components.js";
import { divStyles, placeholderStyles } from "./examples/styles.js";
import { optionsArray } from "./examples/componentsCompositionSelectExample.js";

export class Box extends Container {
    constructor({ selectField, buttons } = {}) {
        super();
        this.buttons = buttons
        this.selectField = selectField
        this.placeholder = new Container()
        this.#compose()
        this.style( {
            "display": "flex",
            "flex-direction": "column",
            ...divStyles
        } )
    }



    get #select() {
        const select = new SelectField( { options: optionsArray } )
        const selectWrapper = new Container().style( { "min-width": "180px" } )
        selectWrapper.className = "mui-select"
        return selectWrapper.append( select )
    }

    get #buttons() {
        const buttonsGroup = new Container()
        buttonsGroup.id = "buttonsGroup"
        const buttons = ["И", "ИЛИ", "НЕ", "X"].map( label => {
            const button = new Button( { text: label } )
            button.className = "mui-btn mui-btn--small mui-btn--primary"
            button.onClick( () => this.placeholder.text = label )
            return button
        } )

        return buttonsGroup.append( ...buttons )

    }

    get #form() {
        return new Container().append(
            new Typography( { text: "Здесь будет форма" } )
        )
    }

    get #logicOperationPlaceHolder() {
        return this.placeholder.style( placeholderStyles )
    }

    #compose() {

        const header = new Container()
            .append(
                this.#select,
                this.#buttons
            )
            .style( {
                "display": "flex",
                "justify-content": "space-between"
            } )
        header.className = "box-header"

        this.append(
            header,
            this.#form,
            this.#logicOperationPlaceHolder
        )

    }
}

export const
    box = new Box()

console
    .log( box

        instanceof
        Component
    )