import { div, Input } from "./components.js";

/**
 * Renders an HTML input element wrapped in a label and a div with specific classes.
 *
 * @param {string} type - The type of input element (e.g., 'radio', 'text', 'checkbox').
 * @param {string} name - The name attribute for the input element.
 * @param {string} id - The id attribute for the input element.
 * @param {string} value - The value attribute for the input element.
 * @param {string} label - The text content of the label associated with the input.
 * @returns {HTMLElement} - The rendered HTML element.
 */
export const renderInput = (type, name, id, value, label) => {
    // Create a div element with the class "mui-radio" to wrap the input and label.
    const inputWrapper = div( { className: "mui-radio" } )

    // Create a label element.
    const labelEl = document.createElement( "label" );

    // Create an input element and set its attributes.
    const input = Input( { type, name, id, value, label } );

    // Append the input element to the label.
    labelEl.appendChild( input );

    // Insert the label text after the input element.
    labelEl.insertAdjacentText( "beforeend", label );

    // Append the label to the div wrapper.
    inputWrapper.appendChild( labelEl );

    // Return the rendered input wrapper element.
    return inputWrapper;
}

/**
 * Renders a radio select input group.
 *
 * @param {string} id - The id attribute for the radio select group.
 * @param {object} props - The properties for rendering the radio select group.
 * @param {string} props.label - The label for the radio select group.
 * @param {Array<{ value: string, optionLabel: string }>} props.options - An array of options.
 * @returns {HTMLDivElement} - The rendered radio select group element.
 */
export const renderRadioSelect = (id, props) => {
    // Validate props to ensure label and options are provided.
    if (!props || !props.label || !props.options || !Array.isArray(props.options)) {
        throw new Error("Invalid props for renderRadioSelect");
    }

    const { label, options } = props;

    // Create the wrapper div for the radio select group.
    const radioWrapper = div({id: id});

    // Create a subtitle element with the provided label.
    const subTitle = document.createElement("h4");
    subTitle.innerText = label;
    radioWrapper.appendChild(subTitle);

    // Create an array of input elements based on the options.
    const inputElements = options.map(({ value, optionLabel }) =>
        renderInput("radio", id, value, value, optionLabel)
    );

    // Append the input elements to the radio select group.
    inputElements.forEach((inputElement) => {
        radioWrapper.appendChild(inputElement);
    });

    return radioWrapper;
};


const renderSelectFiled = () => {
    // to be implemented
}

const renderFormElement = () => {
// to be implemented
}