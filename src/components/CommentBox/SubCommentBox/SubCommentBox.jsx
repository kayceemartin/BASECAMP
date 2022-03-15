import React, { useRef, useState } from 'react';
import {useOpenReply} from '../../Message/Message'

function SubCommentBox(props) {

    const changeOpenReply =  useOpenReply();

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

    const sendComment = (event) => {
        event.preventDefault();

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
                    setShowButtons(false)
                    changeOpenReply()
                }}>CANCEL</button>
                </>
                
            )}
        </form>
    )
}

export default SubCommentBox;