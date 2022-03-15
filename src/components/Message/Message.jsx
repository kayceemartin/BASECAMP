import React, {useRef, useState, useContext} from "react";
import './Message.css'
import CommentBox from "../CommentBox/CommentBox";
import SubMessage from "./SubMessage/SubMessage";

const showReply = React.createContext();
export function useOpenReply() {
    return useContext(showReply)
}

function Message (props) {

    const likeIcon = useRef();
    const numLikes = useRef();

    const [arrowUp, setArrowUp] = useState(false);
    const [openReply, setOpenReply] = useState(false);

    //toggled when canceled button and reply button are pressed
    const changeOpenReply = () => {
        setOpenReply(prevState => prevState = !prevState);
    }

    //toggle arrow up and down
    let arrow = <i className="fas fa-caret-down"></i>;

    const changeArrow = () => {
        setArrowUp(prevState => prevState = !prevState);
    }

    if(arrowUp) {
        arrow = <i className="fas fa-caret-up"></i>;
    } else {
        arrow = <i className="fas fa-caret-down"></i>;
    }

    let toggleLike = false;
    let likes = props.likes;
    const likeComment = () => {
        toggleLike =!toggleLike;
        if(toggleLike) {
            likes++;
            likeIcon.current.style.color = "orangered";
        } else {
            likes--;
            likeIcon.current.style.color = "gray";
        }
        numLikes.current.innerHTML = likes;
    }

    const deleteMessage = () => {}


    return (
        <>
        <section className="messageContainer">
        <div className="messageUser">{props.user}</div>
        <i className="fas fa-user-circle"></i>
        <div className="messageText">{props.message}</div>
        <section className="messageIconsContains">
            <i className="fas fa-thumbs-up" ref={likeIcon} onClick={likeComment}></i>
            <div ref = {numLikes}>{props.likes}</div>
            <i className="fas fa-thumbs-down"></i>
            {
                !props.editable ? (
                    <div onClick={changeOpenReply}
                    style={{cursor: "pointer"}}>REPLY</div>
                ) : (
                    <div onClick={deleteMessage}
                    style={{cursor: "pointer"}}>DELETE</div>
                )
            }
        </section>
        <showReply.Provider value={changeOpenReply}>
            {openReply && <CommentBox 
            autoFocus={true}/>}
        </showReply.Provider>
        { props.replies.length > 0 && (
        <section className="arrowReplies" onClick ={changeArrow}>
            {arrow}
            <div>View {props.replies.length} Replies</div>
        </section>
        )
        }
        { arrowUp && (
        <section className="subMessages">
                {props.replies.map(reply => (
                    <SubMessage key={Math.random()} parentKey={props.useKey} subId={reply._id} 
                    name={reply.name} 
                    message={reply.message} 
                    likes={reply.likes}/>
                ))}
        </section>
        )}
        </section>
        </>
    )
}

export default Message;