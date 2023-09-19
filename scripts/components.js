import { createOption } from "./utils.js";

export class Component {
    #tag;

    constructor({ tag }) {
        // Private property to store the tag name.
        this.#tag = tag;

        this.parent = null;
        this.adjacentChildren = new Map();

        // Create the root element with the specified tag.
        this.element = document.createElement( this.#tag );
        this.isMounted = true

        // Initialize properties.
        this.onHoverCallback = null;
    }

    setParent(parent) {
        this.parent = parent
    }

    set text(text) {
        this.element.innerText = String( text );
    }

    set id(id) {
        if (!id) {
            this.element.removeAttribute( "id" );
        } else {
            this.element.setAttribute( "id", id );
        }
    }

    set className(className) {
        if (!className) {
            this.element.removeAttribute( "class" );
        } else {
            this.element.setAttribute( "class", className );
        }
    }

    append(...args) {

        let performAppend = (child) => {
            // это значит, что дважды один референс не присоединить
            this.adjacentChildren.set( child, child );

            if (child instanceof Component) {

                child.setParent( this );

                if (child.isMounted) {
                    this.element.appendChild( child.render() );
                }

            } else {
                this.element.appendChild( child );
            }
        };

        args.forEach( performAppend );
        return this;
    }

    remove(...args) {
        args.forEach( (child) => {
            if (child instanceof Component) {
                this.adjacentChildren.get( child ).unmount();
            } else {
                this.adjacentChildren.get( child ).remove();
            }
        } );
        return this;
    }

    style(stylesDict) {
        const stringStyles = Object.keys( stylesDict )
            .map( (style) => style + ":" + stylesDict[style] )
            .join( ";" );
        this.element.setAttribute( "style", stringStyles );
        return this;
    }

    onHover(callback) {
        this.onHoverCallback = callback;
        return this;
    }

    handleHover() {
        if (typeof this.onHoverCallback === "function") {
            this.onHoverCallback();
        }
    }

    mount() {
        const siblings = this.parent.adjacentChildren
        if (siblings.size < 2) {
            this.parent.element.appendChild( this.render() )
        } else {
            // get upper neighbor
            const neighborsArray = Array.from( siblings.keys() )
            const neighborIndex = neighborsArray.indexOf( this ) - 1
            siblings.get( neighborsArray[neighborIndex] ).element.insertAdjacentElement( "afterend", this.render() )
        }
    }

    update() {
        this.mount()
    }

    unmount() {
        // this.isMounted = false
        this.element.remove();
    }

    #compose() {
        // Add a mouseover event listener to trigger handleHover.
        this.element.addEventListener( "mouseover", () => {
            this.handleHover();
        } );
        // в компосе нельзя создавать new через присвоение к переменной
        // только аппенд, создание вынести в конструктор или в геттер
        // иначе маунт неверно поймет с чем работать, тк реф будет другой
    }

    render() {
        this.#compose()
        return this.element
    }
}


/**
 * Represents a specialized container component that extends the base Component class.
 * This class creates a container element with a 'div' tag.
 *
 * @extends Component
 * @see {@link Component}
 */
export class Container extends Component {
    /**
     * Create a new Container instance.
     * This constructor calls the parent constructor with a 'div' tag to create a container element.
     */
    constructor() {
        super( { tag: "div" } );
    }
}


export class Typography extends Component {
    constructor({ variant = "p", text } = {}) {
        super( { tag: variant } );
        this.text = text
    }
}

export class Input extends Component {
    constructor({ tag = "input", type = "text", name, value, ...inputProps } = {}) {
        super( { tag: tag } );
        this.type = type
        this.value = value
        this.name = name

        this.onChangeCallback = null;
        this.element.addEventListener( "input", this.handleInputChange.bind( this ) )
        this.inputProps = inputProps
    }

    disable() {
        this.element.setAttribute( "disabled", "" )
        return this
    }

    enable() {
        this.element.removeAttribute( "disabled" )
        return this
    }

    set inputProps(props) {
        if (!!props) {
            Object.entries( props ).forEach( ([key, value]) => {
                this.element.setAttribute( key, value )
            } )
        }
    }

    set type(type) {
        if (!type) {
            this.element.removeAttribute( "type" );
        } else {
            this.element.setAttribute( "type", type );
        }
    }

    set value(value) {
        this.element.setAttribute( "value", value || "" )
    }

    set name(name) {
        if (!name) {
            this.element.removeAttribute( "name" );
        } else {
            this.element.setAttribute( "name", name );
        }
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
}


export class Button extends Input {
    constructor({ text = "Кнопка" } = {}) {
        super( { tag: "button" } );
        this.text = text
        this.element.addEventListener( "click", this.handleClick.bind( this ) )
        this.className = "mui-btn mui-btn--small mui-btn--primary"
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
}


export class SelectField extends Input {
    constructor({ name, initValue, options, ...inputProps } = {}) {
        super( { tag: "select", name, initValue, ...inputProps } );
        this.dummyOption = new Input( { tag: "option", value: undefined } )
        this.dummyOption.text = "-----"
        this.options = options
    }

    set options(optionsArray) {
        console.log( "optionsArray", optionsArray )
        !!optionsArray && this.append( this.dummyOption, ...optionsArray.map(createOption) )
    }


}

export const createRoot = (element) => {
    const rootComponent = new Component( { tag: "div" } )
    rootComponent.id = "AppRoot"
    rootComponent.setParent( element )
    element.appendChild( rootComponent.render() )
    return rootComponent
}