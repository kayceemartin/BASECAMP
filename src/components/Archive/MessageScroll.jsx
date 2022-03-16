import React, { useEffect, useState, useRef } from "react";
import Message from "./components/Message/Message";
import { useMainContext } from "./Context/Context";



function MessageScroll(props) {

    //when boolean from main context changes we re-render message list.
    const { messageReset, commentIncrement, setCommentIncrement, messageUpdate } = useMainContext();

    //make sure increment value in callback function for Intersection Observer is up to date
    const commentIncrementRef = useRef(commentIncrement);


    const [messages, setMessages] = useState([]);
    const [showBottomBar, setShowBottomBar] = useState(true);

    //load up the first ten comments. do this on either app start or when a new comment is posted
    useEffect(() => {
        setShowBottomBar(true);
        fetch(`${process.env.SERVER_URL}/comments/get-data`).then(res => res.json()).then(comments => {
            setMessages(comments);
        })
    }, [messageReset])

    //either update or delete an individual comment
    useEffect(() => {
        if(messageUpdate) {
            //if messageUpdate[0] is 1 then that means we update. Else we delete
            if(messageUpdate[0] === 1){
                fetch(`${process.env.SERVER_URL}/comments/update-comment`, {
                    method: "POST",
                    headers: {"Content-type": "application/json"},
                    body: JSON.stringify({commentId: messageUpdate[1]})
                }).then(res => res.json()).then(commentData => {
                    updateComment(commentData);
                })
            }else if (messageUpdate[0] === 2){
                deleteComment();
            }
        }
    },[messageUpdate])

    function updateComment(commentData) {
        let currentMessage = [...messages];
        if(commentData) {
            let currentMessageIndex = currentMessage.findIndex(message => message._id === commentData._id)
            currentMessage.splice(currentMessageIndex, 1, commentData);
            setMessages(currentMessage);
        }
    }

    function deleteComment() {
        let currentMessage = [...messages];
        let currentMessageIndex = currentMessage.findIndex(message => message._id === messageUpdate[1]);
        currentMessage.splice(currentMessageIndex, 1);
        setMessages(currentMessage);
    }

    //intersection observer
    const observer = React.useRef(new IntersectionObserver(entries => {
        const first = entries[0];
        if (first.isIntersecting) {
            fetch(`${process.env.SERVER_URL}/comments/get-more-data`, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ commentIncrement: commentIncrementRef.current })
            }).then(res => res.json()).then(comments => {
                if (comments.length > 0) {
                    setTimeout(() => {
                        setMessages(prevState => [...prevState, ...comments]);
                    }, 3000)
                } else {
                    setTimeout(() => {
                        setShowBottomBar(false);
                    }, 3000)
                }
                //we use comments.legnth just incase there are not 10 comments left
                setCommentIncrement(prevState => prevState+= comments.length);
            })
        }
    }), { threshhold: 1 })

    //ensure comment increment is up to date
    useEffect(() => {
        commentIncrementRef.current = commentIncrement;
    }, [commentIncrement])

    //bottomBar will contain the bottomBar JSX element
    const [bottomBar, seBottomBar] = useState(null);

    useEffect(() => {
        const currentBottomBar = bottomBar;
        const currentObserver = observer.current;
        if(currentBottomBar){
            currentObserver.observe(currentBottomBar);
        }

        return() => {
            if(currentBottomBar) {
                currentObserver.observe(currentBottomBar);
            }
        }
    }, [bottomBar])


    return (
        <>
            {messages.map(message => (
                <Message key={message._id} useKey={message._id}
                    name={message.name}
                    editable={message.editable}
                    message={message.message}
                    likes={message.like}
                    replies={message.replies} />
            ))}
            {messages.length > 9 && showBottomBar ? <div className="bottomBar" ref={seBottomBar}><div className="loader"></div></div> : null}
        </>
    )
}

export default MessageScroll;