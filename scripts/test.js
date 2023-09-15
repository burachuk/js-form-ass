import { div } from "./components.js";

export class TestElement {
    constructor() {
        this.state = 1
        this.element = div().text(this.state).text("asd").render()
        // this.element.innerText = this.state
    }
    increment() {
        this.state += 1
        this.element = div().text(this.state).render()
        console.log(this.state)
        // this.mount()
    }
    mount() {
        return this.element
    }
}