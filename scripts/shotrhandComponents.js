import { Button, Component, Container, SelectField, Typography } from "./components.js";
import { divStyles, placeholderStyles } from "./examples/styles.js";
import { optionsArray } from "./examples/componentsCompositionSelectExample.js";
import { dictToArray, parseKeyValue } from "./utils.js";

export class Box extends Container {
    constructor({ selectField, buttons } = {}) {
        super();
        this.buttons = buttons
        this.selectField = selectField
        this.placeholder = new Container()
    }

    get #select() {
        const select = new SelectField( { options: optionsArray } )
        select.onChange( (e) => console.log( e.target.value ) )
        const selectWrapper = new Container().style( { "min-width": "200px" } )
        selectWrapper.className = "mui-select"
        return selectWrapper.append( select )
    }

    get #buttons() {
        const removeButton = new Button( { text: "X" } ).disable()
        const createButtons = (label) => {
            const button = new Button( { text: label } )
            button.onClick( () => {
                this.placeholder.text = label
                this.placeholder.mount()
                removeButton.enable()
            } )
            return button
        };

        const buttonsGroup = new Container()

        const buttons = ["И", "ИЛИ", "НЕ"].map( createButtons );

        removeButton.onClick( () => {
            this.placeholder.unmount()
            removeButton.disable()
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

export class FieldSet extends Component {
    constructor({ fieldProps } = {}) {
        super( { tag: "div" } );
        this.fieldProps = fieldProps
        this.fieldSet = new Container()
    }

    setProps(props) {

        this.fieldProps = props
        this.fieldSet.render()
    }

    buildSelect() {
        console.log( "buildSelect()", this.fieldProps.options )
        const select = new SelectField()
        console.log( select )
        select.options = dictToArray( this.fieldProps.options, parseKeyValue )
        this.fieldSet.append( select )
    }


    #compose() {
        if (!!this.fieldProps) {
            const { type } = this?.fieldProps
            switch (type) {
                case "select":
                    this.buildSelect()
                    break;
                case "checkbox":
                    this.fieldSet = "Да-да/нет-нет"
                    break;
                default:
                    this.fieldSet = "Ти шо выбрал??"
            }
            this.append(this.fieldSet)
        }
    }

    render() {
        this.#compose()
        return super.render();
    }
}