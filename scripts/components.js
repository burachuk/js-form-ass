/**
 * Create and return a div element with the specified id and class.
 *
 * @param {null|string} id - The id attribute for the div element.
 * @param {null|string} className - The class attribute for the div element.
 * @returns {HTMLDivElement} - The created div element.
 */
const div = ({ id=null, className=null }) => {
    // Create a <div> element.
    const divElement = document.createElement('div');
    
    // Set the id and class name attributes.
    divElement.id = id;
    divElement.className = className;

    // Return the created <div> element.
    return divElement;
}

/**
 * Create and return an input element with the specified attributes.
 *
 * @param {string} type - The type attribute for the input element.
 * @param {string} name - The name attribute for the input element.
 * @param {string} id - The id attribute for the input element.
 * @param {string} value - The value attribute for the input element.
 * @returns {HTMLInputElement} - The created input element.
 */
const Input = ({ type, name, id, value }) => {
    // Create an <input> element.
    const inputElement = document.createElement("input");

    // Set the type, name, id, and value attributes.
    inputElement.type = type;
    inputElement.name = name;
    inputElement.id = id;
    inputElement.value = value;

    // Return the created <input> element.
    return inputElement;
}

// Export the div and Input functions as named exports.
export { div, Input };