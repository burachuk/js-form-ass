/**
 * Represents a reusable component for creating and managing DOM elements.
 */
export class Component {
    #tag;

    /**
     * Create a new Component instance.
     * @param {Object} options - Component options.
     * @param {string} options.tag - The HTML tag name for the root element.
     * @method {void} text - aasd
     */
    constructor({ tag }) {
        // Private property to store the tag name.
        this.#tag = tag;

        // Create the root element with the specified tag.
        this.element = document.createElement( this.#tag );

        // Add a mouseover event listener to trigger handleHover.
        this.element.addEventListener( "mouseover", () => {
            this.handleHover();
        } );

        // Initialize properties.
        this.onHoverCallback = null;
        this.adjacentChildren = new Map();
    }

    /**
     * Set the text content of the component's root element.
     * @param {string} string - The text content to set.
     * @returns {Component} - The Component instance for method chaining.
     */
    set text(string) {
        this.element.innerText = string;
        return this;
    }

    /**
     * Set the id attribute of the component's root element.
     * @param {string} id - The id value to set (or remove if empty).
     */
    set id(id) {
        if (!id) {
            this.element.removeAttribute( "id" );
        } else {
            this.element.setAttribute( "id", id );
        }
    }

    /**
     * Set the class attribute of the component's root element.
     * @param {string} className - The class name to set (or remove if empty).
     */
    set className(className) {
        if (!className) {
            this.element.removeAttribute( "class" );
        } else {
            this.element.setAttribute( "class", className );
        }
    }

    /**
     * Append child elements to the component's root element.
     * @param {...(Component|HTMLElement)} args - Child elements to append.
     * @returns {Component} - The Component instance for method chaining.
     */
    append(...args) {
        args.forEach( (child, i) => {
            this.adjacentChildren.set( child, child );

            if (child instanceof Component) {
                this.element.appendChild( child.mount() );
            } else {
                this.element.appendChild( child );
            }
        } );
        return this;
    }

    /**
     * Remove child elements from the component's root element.
     * @param {...(Component|HTMLElement)} args - Child elements to remove.
     * @returns {Component} - The Component instance for method chaining.
     */
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

    /**
     * Apply inline CSS styles to the component's root element.
     * @param {Object} stylesDict - A dictionary of CSS styles.
     * @returns {Component} - The Component instance for method chaining.
     */
    style(stylesDict) {
        const stringStyles = Object.keys( stylesDict )
            .map( (style) => style + ":" + stylesDict[style] )
            .join( ";" );
        this.element.setAttribute( "style", stringStyles );
        return this;
    }

    /**
     * Set a callback function to be called on mouseover.
     * @param {Function} callback - The callback function to set.
     * @returns {Component} - The Component instance for method chaining.
     */
    onHover(callback) {
        this.onHoverCallback = callback;
        return this;
    }

    /**
     * Handle the mouseover event by calling the onHoverCallback if it is set.
     */
    handleHover() {
        if (typeof this.onHoverCallback === "function") {
            this.onHoverCallback();
        }
    }

    /**
     * Mount the component by returning its root element.
     * @returns {HTMLElement} - The root element of the component.
     */
    mount() {
        return this.element;
    }

    /**
     * Unmount the component by removing its root element from the DOM.
     */
    unmount() {
        this.element.remove();
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
    constructor({ variant = "p", text = "" } = {}) {
        super( { tag: variant } );
        this.text = text
    }
}

export class Button extends Component {
    constructor({ text = "Кнопка" } = {}) {
        super( { tag: "button" } );
        this.text = text
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

export class SelectField extends Input {
    constructor({ name, value, options, ...inputProps }) {
        super( { tag: "select", name, value, ...inputProps } );
        this.dummyOption = new Input( { tag: "option", value: undefined } )
        this.dummyOption.text = "-----"
        this.options = options
    }

    set options(optionsArray) {
        this.append( this.dummyOption )
        optionsArray.forEach( ([key, value]) => {
            const optionElement = new Input( { tag: "option", value: key } )
            optionElement.text = value
            this.append( optionElement )
        } )
    }

}