// import React, {useRef, useState, useContext} from "react";
// import './Message.css'
// import CommentBox from "../CommentBox/CommentBox";
// import SubMessage from "./SubMessage/SubMessage";
// import {useMainContext} from '../../Context/Context'

// const showReply = React.createContext();
// export function useOpenReply() {
//     return useContext(showReply)
// }

// function Message (props) {
//     const {setMessageUpdate} = useMainContext();

//     const likeIcon = useRef();
//     const numLikes = useRef();

//     const [arrowUp, setArrowUp] = useState(false);
//     const [openReply, setOpenReply] = useState(false);

//     //toggled when canceled button and reply button are pressed
//     const changeOpenReply = () => {
//         setOpenReply(prevState => prevState = !prevState);
//     }

//     //toggle arrow up and down
//     let arrow = <i className="fas fa-caret-down"></i>;

//     const changeArrow = () => {
//         setArrowUp(prevState => prevState = !prevState);
//     }

//     if(arrowUp) {
//         arrow = <i className="fas fa-caret-up"></i>;
//     } else {
//         arrow = <i className="fas fa-caret-down"></i>;
//     }

//     //like message
//     let toggleLike = false;
//     let likes = props.likes;
//     const likeComment = () => {
//         toggleLike =!toggleLike;
//         if(toggleLike) {
//             likes++;
//             likeIcon.current.style.color = "orangered";
//         } else {
//             likes--;
//             likeIcon.current.style.color = "gray";
//         }
//         numLikes.current.innerHTML = likes;
//         //store this new value in the db
//         fetch(`${process.env.SERVER_URL}/comments/${props.useKey}`, {
//             method:"PUT",
//             headers: {"Content-Type" :"application/json"},
//             body: JSON.stringify({messageId: props.useKey, likes: likes})
//         })
//     }

//     const deleteMessage = () => {
//         fetch(`${process.env.SERVER_URL}/comments/${props.useKey}`, {
//             method: "DELETE"
//         }).then(() => {
//             setMessageUpdate([2, props.useKey])
//         })
//     }


//     return (
//         <>
//         <section className="messageContainer">
//         <div className="messageUser">{props.user}</div>
//         <i className="fas fa-user-circle"></i>
//         <div className="messageText">{props.message}</div>
//         <section className="messageIconsContainer">
//             <i className="fas fa-thumbs-up" ref={likeIcon} onClick={likeComment}></i>
//             <div ref = {numLikes}>{props.likes}</div>
//             <i className="fas fa-thumbs-down"></i>
//             {
//                 !props.editable ? (
//                     <div onClick={changeOpenReply}
//                     style={{cursor: "pointer"}}>REPLY</div>
//                 ) : (
//                     <div onClick={deleteMessage}
//                     style={{cursor: "pointer"}}>DELETE</div>
//                 )
//             }
//         </section>
//         <showReply.Provider value={changeOpenReply}>
//             {openReply && <CommentBox useKey={props.useKey}
//             autoFocus={true}/>}
//         </showReply.Provider>
//         { props.replies.length > 0 && (
//         <section className="arrowReplies" onClick ={changeArrow}>
//             {arrow}
//             <div>View {props.replies.length} Replies</div>
//         </section>
//         )
//         }
//         { arrowUp && (
//         <section className="subMessages">
//                 {props.replies.map(reply => (
//                     <SubMessage key={Math.random()} parentKey={props.useKey} subId={reply._id} 
//                     name={reply.name} 
//                     message={reply.message} 
//                     likes={reply.likes}/>
//                 ))}
//         </section>
//         )}
//         </section>
//         </>
//     )
// }

// export default Message;