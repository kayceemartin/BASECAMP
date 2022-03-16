import React, {useContext, useState} from "react";

const MainContext = React.createContext();

export function useMainContext() {
    return useContext(MainContext)
}

export function ContextProvider(props) {
    //the state that allows me to trigger either an undate or delete request of an individual comments
    const [messageUpdate, setMessageUpdate] = useState();
    //the sata boolean will be changed when someone posts a new comment to refresh the first 10 messages
    const[messageReset, setMessageReset] = useState(false);
    //the state that holds the current increment value this isused by the intersection observer when we fetch new comments.
    const [commentIncrement, setCommentIncrement] = useState(10);



    const value = {
        messageReset,
        setMessageReset,
        messageUpdate,
        setMessageUpdate,
        commentIncrement,
        setCommentIncrement
    }
    return(
        <MainContext.Provider value={value}>
            {props.children}
        </MainContext.Provider>
    )
}