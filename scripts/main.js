/*
Good module begins with docstring
*/

import { Container, Typography } from "./components.js";


const root = document.getElementById( "form-root" )

let kek = 1
const b = document.createElement( "button" )
b.innerText = "Delete 2"
b.addEventListener( "click", () => {
    d.remove( p )
} )

root.appendChild(
    b
)

const divStyles = {
    "padding": "16px",
    "background-color": "rgba(181,181,181,0.3)"
}

const c = new Container()
c.style( divStyles )

const d = new Container()
d.style( divStyles )

const e = new Container()
e.style( divStyles )

const p = new Typography({variant: "h3",content: "Lorem"})
p.onHover(() => console.log("c hover"))

c.append( p )

root.appendChild(
    c.mount()
)
