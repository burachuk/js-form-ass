import { Button, Component, Container, SelectField, Typography } from "./components.js";
import { divStyles, placeholderStyles } from "./examples/styles.js";
import { optionsArray } from "./examples/componentsCompositionSelectExample.js";

export class Box extends Container {
    constructor({ selectField, buttons } = {}) {
        super();
        this.buttons = buttons
        this.selectField = selectField
        this.placeholder = new Container()
    }

    get #select() {
        const select = new SelectField( { options: optionsArray } )
        const selectWrapper = new Container().style( { "min-width": "180px" } )
        selectWrapper.className = "mui-select"
        return selectWrapper.append( select )
    }

    get #buttons() {
        const createButtons = (label) => {
            const button = new Button( { text: label } )
            button.onClick( () => {
                this.placeholder.text = label
                this.placeholder.mount()
            } )
            return button
        };
        const buttonsGroup = new Container()
        let buttons;
        buttons = ["И", "ИЛИ", "НЕ"].map( createButtons );
        const removeButton = new Button( { text: "X" } )
        removeButton.onClick( () => {
            this.placeholder.unmount()
        } )

        return buttonsGroup.append( ...buttons ).append( removeButton )
    }

    get #form() {
        return new Container().append(
            new Typography( { text: "Здесь будет форма" } )
        )
    }

    #compose() {
        this.placeholder.style( placeholderStyles )
        this.placeholder.isMounted = false

        this.style( {
            "display": "flex",
            "flex-direction": "column",
            ...divStyles
        } )
        const header = new Container()
            .append(
                this.#select,
                this.#buttons
            )
            .style( {
                "display": "flex",
                "justify-content": "space-between"
            } )

        this.append(
            header,
            this.#form,
            this.placeholder
        )
    }

    render() {
        this.#compose()
        return super.render();
    }
}
