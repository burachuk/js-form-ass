/*
In progress...
*/
import { CheckBox, div, RadioInput, SubTitle, Select } from "./components.js";

export class FieldSet {
    constructor(key, props) {
        this.key = key
        this.props = props
        this.fields = this.#setFields()
    }

    #setFields() {
        const { label, type } = this.props
        this.label = label
        this.type = type

        this.state = {}

        switch (this.type) {
            case "checkbox":
                return new CheckBox( this.key, null, this.key, this.label ).onChange(
                    (event) => this.setState( event.target.checked )
                )
            case "radio":
                const { options } = this.props
                if (!options || !Array.isArray( options ) || options.length === 0) {
                    throw Error( `В качестве options ожидался непустой список, а получено ${ options }` )
                }
                const d = div()
                options.forEach( option => {
                    const radioOption = new RadioInput( this.key, null, this.key, option.optionLabel, option.value )
                    radioOption.onChange( (event) => this.setState( event.target.value ) )
                    d.add( radioOption )
                } )
                return d.render()
            default:
                throw Error( `Не знаю такой тип элемента ${ this.type }` )
        }
    }

    setState(value) {
        this.state = { [this.key]: value }
        console.log( this.state )
    }

    render() {
        return div( { id: this.key } ).style( {
            "background-color": "rgba(227,227,227,0.5)",
            "padding": "10px"
        } )
            .add(
                SubTitle().text( this.label )
            )
            .add(
                this.fields
            )
    }
}

export class DynamicFormBlock {


    // {and: {k: v}}
    constructor(availableFields = [], formsSet) {
        console.log( this )
        this.availableFields = availableFields
        this.formsSet = formsSet
        // this.selectFieldId = `fields-select-${ this.key }`
        this.initFieldSetKey = availableFields[0][0]
        this.currentFieldSet = new FieldSet( this.initFieldSetKey, this.formsSet[this.initFieldSetKey] )
        // this.handleFieldSelection( this.initFieldSetKey )


        this.root = div()
            .add( this.fieldsSelect ).add(
                div().text( this.initFieldSetKey )
            )
        // .add( this.currentFieldSet.render() )

        console.log( "root", this.root )

    }

    mount() {
        return this.root.render()
    }

    update() {
        this.root.render()
    }

    handleFieldSelection(key) {
        this.currentFieldSet = new FieldSet( key, this.formsSet[key] )
        this.initFieldSetKey = key
        this.update()
    }

    get fieldsSelect() {
        const fieldsSelect = new Select(
            this.selectFieldId,
            null,
            this.selectFieldId,
            "label",
            this.availableFields )
        fieldsSelect.onChange( (event) => this.handleFieldSelection( event.target.value ) )
        return fieldsSelect
    }
}


export class DynamicForm {
    constructor(props = { formTitle: "Сегментация", formsSet: {} }) {
        this.formTitle = props?.formTitle
        this.formsSet = props?.formsSet
        this.fieldsArray = this.getFieldsArray()
        // root в некотором смысле хранит стейт дерева элементов
        this.root = div( { id: "formRoot" } )
        // check if keys are unique

        this.initSelect()

        this.hash = new Map()

        return this.root.render()
    }

    getFieldsArray() {
        if (Object.keys( this.formsSet ).length === 0) {
            throw new Error( "Пустой словарь" )
        }

        const fieldsArray = Object.entries( this.formsSet ).map( ([key, props]) => {
            return [key, props?.label]
        } )
        console.log( "fieldsArray", fieldsArray )
        return fieldsArray
    }


    initSelect() {
        this.root.add( this.fieldsSelect )
    }

    update() {
        this.root.render()
    }

    // render() {
    //     return div().add(
    //         SubTitle().text(this.formTitle)
    //     )
    //         .add(
    //             this.displayFieldsSelect()
    //         )
    // }

}