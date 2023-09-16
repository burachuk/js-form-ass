export class Component {
    #tag;

    constructor({ tag }) {
        this.#tag = tag;
        this.element = document.createElement( this.#tag );

        this.element.addEventListener( "mouseover", () => {
            this.handleHover();
        } );

        this.onHoverCallback = null;
        this.adjacentChildren = new Map();
    }

    set text(string) {
        this.element.innerText = string;
        return this;
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
            this.element.removeAttribute( "class" ); // Use "class" instead of "className"
        } else {
            this.element.setAttribute( "class", className ); // Use "class" instead of "className"
        }
    }

    append(...args) {
        args.forEach( (child, i) => {
            this.adjacentChildren.set( child, child );

            if (child instanceof Component) {
                this.element.appendChild( child.mount() );
            } else {
                this.element.appendChild( child );
            }
        } );
        console.log( "set children", this.adjacentChildren );
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
        const stringStyles = Object.keys( stylesDict ).map( (style) => {
            return style + ":" + stylesDict[style];
        } ).join( ";" );
        this.element.setAttribute( "style", stringStyles );
        return this;
    }

    onHover(callback) {
        this.onHoverCallback = callback;
        return this;
    }

    handleHover() {
        // Call the onHoverCallback if it is set
        if (typeof this.onHoverCallback === "function") {
            this.onHoverCallback();
        }
    }

    mount() {
        return this.element;
    }

    unmount() {
        this.element.remove();
    }
}


export class Container extends Component {
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

export class Input extends Component {
    constructor({ type = "text", value } = {}) {
        super( { tag: "input" } );
        this.type = type
        this.value = value

        this.onChangeCallback = null;
        this.element.addEventListener( "input", this.handleInputChange.bind( this ) )

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