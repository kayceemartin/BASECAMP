// import React, { useRef, useState } from 'react';
// import './CommentsBox.css';
// import {useOpenReply} from '../Message/Message'
// import {useMainContext} from '../../Context/Context'

// function CommentBox(props) {
//     const {setMessageUpdate} = useMainContext();

//     const changeOpenReply =  useOpenReply();

//     const message = useRef(null);
//     //Trigger the underline animation
//     const [showCommentLine, setCommentLine] = useState(false);
//     //True on focus. False on CANCEL press
//     const [showButtons, setShowButtons] = useState(false);
//     //True on input data, False when input is blank
//     const [enableBtn, setEnableBtn] = useState(true);

//     //when they click the input. Show the underline and the buttons
//     const commentFocus = () => {
//         setCommentLine(true);
//         setShowButtons(true);
//     }

//     //when they click on the input. hide the underline
//     const commentFocusOut = () => {
//         setCommentLine(false);
//     }

//     //if input value isnt empty then enable the comment btn
//     const commentStroke = event => {
//         let currMessage = event.target.value;
//         if(currMessage) {
//             setEnableBtn(false);
//         } else {
//             setEnableBtn(true);
//         }
//     }

//     //send comment
//     const sendComment = (event) => {
//         event.preventDefault();
//         fetch(`${process.env.SERVER_URL}/comments/new-sub-comment`, {
//             method: "POST",
//             headers: {"Content=Type":"application/json"},
//             body: JSON.stringify({messageId: props.useKey, messageData: message.current.value})
//         }).then(() => {
//             setMessageUpdate([1, props.useKey])
//             //reset everythings so it resets
//             message.current.value = '',
//             setEnableBtn(false);
//         })
//     }

//     return (
//         <form>
//             <section className= 'commentBox'>
//                 <input autoFocus={props.autoFocus}
//                     type="text"
//                     placeholder='comment on the campsite here'
//                     ref={message}
//                     onFocus = {commentFocus}
//                     onBlur = {commentFocusOut}
//                     onKeyUp = {commentStroke}
//                 />
//                 {showCommentLine &&<div className='commentLine'></div>}
//             </section>
//             {showButtons && (
//                 <>
//                 <button className = 'commentButton sendButton' disabled ={enableBtn}onClick={sendComment}>COMMENT</button>
//                 <button className ='commentButton' style={{color: 'gray', backgroundColor: "transparent"}}
//                 onClick={() => {
//                     setShowButtons(false)
//                     changeOpenReply()
//                 }}>CANCEL</button>
//                 </>
                
//             )}
//         </form>
//     )
// }

// export default CommentBox;