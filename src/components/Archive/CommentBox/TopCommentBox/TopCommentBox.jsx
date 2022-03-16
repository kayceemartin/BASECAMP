import React, { useRef, useState } from 'react';
import '../CommentsBox.css';
import {useMainContext} from '../../../Context/Context';


function TopCommentBox(props) {

    const{setMessageReset, setCommentIncrement} = useMainContext();

    const message = useRef(null);
    //Trigger the underline animation
    const [showCommentLine, setCommentLine] = useState(false);
    //True on focus. False on CANCEL press
    const [showButtons, setShowButtons] = useState(false);
    //True on input data, False when input is blank
    const [enableBtn, setEnableBtn] = useState(true);

    //when they click the input. Show the underline and the buttons
    const commentFocus = () => {
        setCommentLine(true);
        setShowButtons(true);
    }

    //when they click on the input. hide the underline
    const commentFocusOut = () => {
        setCommentLine(false);
    }

    //if input value isnt empty then enable the comment btn
    const commentStroke = event => {
        let currMessage = event.target.value;
        if(currMessage) {
            setEnableBtn(false);
        } else {
            setEnableBtn(true);
        }
    }

    //send comment
    const sendComment = (event) => {
        event.preventDefault();
        fetch(`${process.env.SERVER_URL}/comments/new-comment`, {
            methond: "POST",
            headers: {"Content-Type" : "application/JSON"},
            body: JSON.stringify({messageData: message.current.value})
        }).then(() => {
            //resent entire comments and matching increment counter
            setMessageReset (prevState => !prevState);
            setCommentIncrement(10)
            //delete text input, update comments, and disable comment btn
            message.current.value='';
            setEnableBtn(true);
        })

    }

    return (
        <form>
            <section className= 'commentBox'>
                <input autoFocus={props.autoFocus}
                    type="text"
                    placeholder='comment on the campsite here'
                    ref={message}
                    onFocus = {commentFocus}
                    onBlur = {commentFocusOut}
                    onKeyUp = {commentStroke}
                />
                {showCommentLine &&<div className='commentLine'></div>}
            </section>
            {showButtons && (
                <>
                <button className = 'commentButton sendButton' disabled ={enableBtn}onClick={sendComment}>COMMENT</button>
                <button className ='commentButton' style={{color: 'gray', backgroundColor: "transparent"}}
                onClick={() => {
                    setShowButtons(false);
                    message.current.value =''
                }}>CANCEL</button>
                </>
                
            )}
        </form>
    )
}

export default TopCommentBox;