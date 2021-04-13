import React from 'react'
import profilePhoto from '../../../images/avater/1.jpg'

const CommentBox = (props) => {

    console.log(props);

    return (
        <li>
            <div className="comment-box">
                <div className="com-img f-left mr-15">
                    <img src={profilePhoto}  alt="" />
                </div>
                <div className="com-text">
                    <h6> <a href="#"></a></h6>
                    <p><span>{props.comment.comment_sender_name}</span></p>
					<p dangerouslySetInnerHTML={{ __html: props.comment.comment }} ></p>

                </div>
            </div>
        </li>
    )
}


export default CommentBox