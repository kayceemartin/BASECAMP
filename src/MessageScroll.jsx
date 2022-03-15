import React, {useEffect, useState} from "react";
import Message from "./components/Message/Message";
import { useMainContext } from "./Context/Context";


function MessageScroll(props) {

    const{messageReset} = useMainContext
    const[messages, setMessages] = useState([]);
    const [showBottomBar, setShowBottomBar] = useState(true);

    //load up the first ten comments. do this on either app start or when a new comment is posted

    useEffect(() => {
        setShowBottomBar(true);
        fetch("/get-data", {
            method: "POST",
            headers: {"Content-Type" : "application/json"},
            body: JSON.stringify({limitNum:10})
        }).then(res => res.json()).then(comments => {
            setMessages(comments);
        })


    }, [messageReset])


    return (
        <>
        {messages.map(message => (
            <Message  key={message._id} useKey={message._id}
            name={message.name}
            editable={message.editable}
            message = {message.message}
            likes = {message.like}
            replies={message.replies}/>
        ))}
        { messages.length > 9 && showBottomBar ? <div className="bottomBar"><div className="loader"></div></div> : null}
        </>
    )
}

export default MessageScroll;