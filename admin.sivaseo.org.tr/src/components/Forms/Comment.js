import React from 'react'
import CKEditor from '@ckeditor/ckeditor5-react';
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';
import { Link } from 'react-router-dom'
import getCategoryList from '../../data/CategoryData'




class CommentForm extends React.Component {

    constructor() {
        super()

        this.state = {
            comment: "",
            is_submitting: false
        }

        this.handleCkEditorOnchange = this.handleCkEditorOnchange.bind(this)
        this.handleOnChange = this.handleOnChange.bind(this)
        this.handleSubmit = this.handleSubmit.bind(this)
    }


    componentDidMount() {
        this.setState(this.props.states)
        console.log(this.props);
    }


    // get ckeditor data and set state
    handleCkEditorOnchange(e, editor) {
        const commentContent = editor.getData()
        this.setState({
            comment: commentContent
        })
    }
    // get ckeditor data and set state


    // form material on change event
    handleOnChange(e) {
        if (e.target.type === "checkbox") {
            this.setState({
                [e.target.name]: e.target.checked,
            })
        } else {
            this.setState({
                [e.target.name]: e.target.value
            })
        }
    }
    // form materials on change event end

    async handleSubmit(e) {
        e.preventDefault()
        this.setState({
            is_submitting: true
        })
        await this.props.formSubmitFunction(this.state)
        this.setState({
            is_submitting: false
        })
    }


    render() {
        // loader queries for submit button
        let btnSaveInnerText = "Kaydet";
        if (this.state.is_submitting == true) {
            btnSaveInnerText = <span className="fa fa-spinner fa-spin"></span>
        }

        return (
            <form className="" onSubmit={this.handleSubmit}>
                
                <CKEditor
                    editor={ClassicEditor}

                    onInit={editor => {

                        editor.setData(this.state.comment)
                    }}

                    config={
                        {
                            ckfinder: {
                                uploadUrl: process.env.REACT_APP_API_ENDPOINT+'/file/upload'
                            }
                        }

                    }


                    onChange={this.handleCkEditorOnchange}
                    onBlur={(event, editor) => {
                        console.log('Blur.', editor);
                    }}
                    onFocus={(event, editor) => {
                        console.log('Focus.', editor);
                    }}
                />


                <div className="position-relative form-group float-right mt-3">
                    <Link to="/comment/list" className="btn btn*default">Geri Dön</Link>
                    <button className="btn btn-primary" type="submit"> {btnSaveInnerText} </button>
                </div>


            </form>
        )
    }

}

export default CommentForm