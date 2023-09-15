class CustomElement {
    #tagName;

    constructor(id, className, tagName = undefined) {
        this.id = id
        this.className = className
        this.#tagName = tagName
        this.element = document.createElement( this.#tagName )
        !!id && this.element.setAttribute( "id", id )
        !!className && this.element.setAttribute( "class", className )
    }


    add(element) {
        if (element instanceof CustomElement) {
            this.element.appendChild( element.render() )
        } else {
            this.element.appendChild( element )
        }
        // this.element.appendChild( element )
        return this
    }

    text(string) {
        this.element.innerText = string
        return this
    }

    style(stylesDict) {
        const stringStyles = Object.keys( stylesDict ).map( style => {
            return style + ":" + stylesDict[style]
        } ).join( ';' )
        this.element.setAttribute( "style", stringStyles )
        return this
    }

    render() {
        return this.element
    }
}

class P extends CustomElement {
    constructor(id, className, tagName = "p") {
        super( id, className, tagName );
    }

    add(element) {
        throw new Error( "Нельзя" )
    }
}

export class Div extends CustomElement {
    constructor(id, className) {
        super( id, className, "div" );
    }
}

class Input extends CustomElement {
    constructor(id, className, type, name, value) {
        super( id, className, "input" );
        this.type = type
        this.name = name
        this.value = value
        !!type && this.element.setAttribute( "type", this.type )
        !!name && this.element.setAttribute( "name", this.name )
        !!value && this.element.setAttribute( "value", this.value )
    }
}

class InlineText extends P {
    constructor(id, className, tagName) {
        super( id, className, tagName );
    }

}

class FormLabel extends CustomElement {
    constructor(id, className) {
        super( id, className, "label" );
    }

    text(string) {
        this.element.insertAdjacentText( "beforeend", string )
        return this
    }
}

class FormInput extends CustomElement {
    constructor(id, className, name, label, value, type, tagName = "input") {
        super( id, "", tagName );
        this.type = type
        this.label = label
        this.name = name
        this.value = value
        this.className = className
        this.listenToEvent = "input"
        !!type && this.element.setAttribute( "type", type )
        !!name && this.element.setAttribute( "name", name )
        !!value && this.element.setAttribute( "value", value )

        // Instance variable to store the onChange callback
        this.onChangeCallback = null;

        this.element.addEventListener( this.listenToEvent, this.handleInputChange.bind( this ) )
    }

    onChange(callback) {
        this.onChangeCallback = callback;
        return this
    }

    handleInputChange(event) {
        // Call the onChange callback if it is set
        if (typeof this.onChangeCallback === "function") {
            this.onChangeCallback( event );
        }
    }

    render() {
        return super.render()
    }
}

class RadioInput extends FormInput {
    constructor(id, className, name, label, value) {
        super( id, "mui-radio", name, label, value, "radio" );
    }

    render() {
        return div( { className: this.className } )
            .add(
                formLabel()
                    .add( super.render() )
                    .text( this.label )
            ).render()
    }

}

class TextField extends FormInput {
    constructor(id, className, name, label, value = "") {
        super( id, "mui-textfield mui-textfield--float-label", name, label, value, "text" );
    }

    render() {
        return div( { className: this.className } )
            .add( super.render() )
            .add( formLabel().text( this.label ) )
            .render()
    }
}

class CheckBox extends FormInput {
    constructor(id, className, name, label, checked = false) {
        super( id, "mui-checkbox", name, label, null, "checkbox" );
        this.checked = checked
        !!checked && this.element.setAttribute( "checked", checked )
    }

    render() {
        return div( { className: this.className } )
            .add(
                formLabel()
                    .add( super.render() )
                    .text( this.label )
            ).render()
    }
}

class Button extends CustomElement {
    constructor(id, className = "mui-btn") {
        super( id, className, "button" );
        // Instance variable to store the onClick callback
        this.onChangeCallback = null;

        this.element.addEventListener( "click", this.handleClick.bind( this ) )
    }

    onClick(callback) {
        this.onClickCallback = callback;
        return this
    }

    handleClick(event) {
        // Call the onChange callback if it is set
        if (typeof this.onClickCallback === "function") {
            this.onClickCallback( event );
        }
    }


    render() {
        return super.render()
    }
}

class SelectOption extends CustomElement {
    constructor(id, className, value, label) {
        super( id, className, "option" );
        this.value = value
        this.label = label
        this.element.setAttribute( "value", value )
        this.text( label )
    }

    render() {
        return super.render();
    }
}

class Select extends FormInput {
    constructor(id, className, name, label, options = []) {
        super( id, className, name, label, null, null, "select" );
        this.name = name
        this.label = label
        this.options = options
        this.defaultOption = new SelectOption(null, null, null, "-----")
    }

    render() {
        console.log( "Select options", this.options )
        this.add(this.defaultOption)

        this.options.forEach( ([key, value]) => {
            const option = new SelectOption( key, null, key, value )
            this.add(option)
        } )

        return super.render()
    }
}

/**
 * Create and return a div element with the specified id and class.
 *
 * @param {null|string} id - The id attribute for the div element.
 * @param {null|string} className - The class attribute for the div element.
 * @returns {CustomElement} - The created div element.
 */
const div = ({ id = null, className = null } = {}) => {
    return new Div( id, className )
}

const p = ({ id, className } = {}) => {
    return new P( id, className )
}

const SubTitle = ({ id, className } = {}) => {
    return new InlineText( id, className, "h4" )
}

const formLabel = ({ id, className } = {}) => {
    return new FormLabel( id, className )
}

/**
 * Create and return an input element with the specified attributes.
 *
 * @param {string} type - The type attribute for the input element.
 * @param {string} name - The name attribute for the input element.
 * @param {string} id - The id attribute for the input element.
 * @param {string} value - The value attribute for the input element.
 * @returns {CustomElement} - The created input element.
 */
const input = ({ type, name, id, value }) => {
    // Create an <input> element.
    return new Input( id, null, type, name, value )
}

export { div, input, p, SubTitle, FormLabel, RadioInput, TextField, CheckBox, Button, Select };