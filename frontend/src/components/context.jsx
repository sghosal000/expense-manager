import { createContext, useState } from "react";

export const Countercontext = createContext(null)

const counterProvider = (props) => {
    const [ count, setCount ] = useState(0)
    return (
        <Countercontext.Provider value={{count, setCount}}>
            {props.children}
        </Countercontext.Provider>
    )
}


// wrap app.jsx with this counterProvider