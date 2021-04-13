import React, { useEffect, useState } from 'react'
import CommentBox from '../Box/CommentBox'
import CommonSpinner from '../Spinner/CommonSpinner'
import api from '../../../services/api'
import FormComment from '../Form/FormComment'

const CommentField = (props) => {

    const [state, setState] = useState({
        comments:[],
        is_comments_loaded: false
    })

    useEffect(()=>{
        getPostComments()
    },[])


    const getPostComments = async () => {
        const postComments = await api.get('/comment/list/', { headers: { 'auth-token': localStorage.getItem('auth-token') }, params: { 'comment_post_id': props.post._id } })
    
        setState({
            ...state,
            comments: postComments.data,
            is_comments_loaded: true
        })
    }


    let commentBoxes = ''
    if(!state.is_comments_loaded){
        commentBoxes = <CommonSpinner />
    }else{
        commentBoxes = state.comments.map((item) => {
            return(
                <CommentBox comment={item} />
            )
        })
    }
    


    return(
        <>
        <div className="blog-comment mt-50">
            <h6 className="border-b pb-10">Toplam {state.comments.length} yorum</h6>
            <ul className="com-list mt-20">
                {commentBoxes}
            </ul>
        </div>
        <FormComment />
        </>
    )
}

export default CommentField