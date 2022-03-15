import React, {useContext, useState} from "react";

const MainContext = React.createContext();

export function useMainContext() {
    return useContext(MainContext)
}

export function ContextProvider(props) {
    const[messageReset, setMessageReset] = useState(false);
    const value = {
        messageReset,
        setMessageReset
    }
    return(
        <MainContext.Provider value={value}>
            {props.children}
        </MainContext.Provider>
    )
}