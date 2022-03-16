import React, {useRef, useState, useContext} from "react";
import SubCommentBox from "../../CommentBox/SubCommentBox/SubCommentBox";
import { useMainContext } from "../../../Context/Context";



const showReply = React.createContext();
export function useOpenReply() {
    return useContext(showReply)
}

function SubMessage (props) {
    const {setMessageUpdate} = useMainContext();
    const likeIcon = useRef();
    const numLikes = useRef();

    const [openReply, setOpenReply] = useState(false);

    //toggled when canceled button and reply button are pressed
    const changeOpenReply = () => {
        setOpenReply(prevState => prevState = !prevState);
    }

    //likes
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
        fetch(`${process.env.SERVER_URL}/comments/update-sub-like`, {
            method:"POST",
            headers: {"Content-Type" :"application/json"},
            body: JSON.stringify({messageId: props.parentKey, subId: props.subId, likes: likes})
        })
    }

    const deleteMessage = () => {
        fetch(`${process.env.SERVER_URL}/comments/delete-sub-comment`, {
            method: "POST",
            headers: {"Content=Type":"application/json"},
            body: JSON.stringify({messageId: props.parentKey, subId: props.subId})
        }).then(() => {
            setMessageUpdate([1, props.parentKey]);
        })
    }


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
                props.user !== "Super User" ? (
                    <div onClick={changeOpenReply}
                    style={{cursor: "pointer"}}>REPLY</div>
                ) : (
                    <div onClick={deleteMessage}
                    style={{cursor: "pointer"}}>DELETE</div>
                )
            }
        </section>
        <showReply.Provider value={changeOpenReply}>
            {openReply && <SubCommentBox parentKey={props.parentKey}
            autoFocus={true}/>}
        </showReply.Provider>
        </section>
        </>
    )
}

export default SubMessage;