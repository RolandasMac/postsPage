import {http} from '../utils/http';
import {useEffect, useRef, useState} from "react";
import styled from "styled-components";
import Button from "../components/Button";
import {useNavigate} from "react-router-dom";

const Wraper = styled.div`
    border-radius: 10px;
    background-color: lightgray;
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 10px;
`
const CreatePostForm = styled.form`
    padding: 40px;
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 10px;
`
const InputWraper = styled.div`
    display: flex;
    flex-direction: column;
    gap: 5px;
    input{
        box-shadow: 3px 3px 3px #000;
        height: 30px;
        box-sizing: border-box;
        border: none;
        border-radius: 5px;
        padding: 0 10px;
        &:focus{
           outline: none; 
        }        
    }
    textarea{
        box-shadow: 3px 3px 3px #000;
        //height: 30px;
        box-sizing: border-box;
        border: none;
        border-radius: 5px;
        padding: 0 10px;
        &:focus{
            outline: none;
        }
`

function UpdatePostComponent({post, location}){
    const message = useRef(null);
    const navigate = useNavigate();
    function updatePost(e){
        e.preventDefault();
        const form = e.currentTarget.parentElement;
        if (form.checkValidity()) {
            const formData = new FormData(form);
            let postData = {}
            postData.secretKey = JSON.parse(sessionStorage.getItem("secretKey"));
            for (const [key, value] of formData) {
                postData[key] = value;
            }
            http.post('http://167.99.138.67:1111/updatepost', postData)
                .then((res) => {
                    if(res.success){
                        message.current.classList.remove('dnone')
                        message.current.classList.add('succmsg');
                        message.current.textContent = res.message;
                        setTimeout(()=>{
                            message.current.classList.add('dnone')
                            message.current.classList.remove('succmsg');
                            message.current.textContent = "";
                            navigate(location.pathname+location.search)
                        },1000)
                    }else{
                        message.current.classList.remove('dnone')
                        message.current.classList.add('errmsg');
                        message.current.textContent = res.message?res.message:"Something is wrong";
                        setTimeout(()=>{
                            message.current.classList.add('dnone')
                            message.current.classList.remove('succmsg');
                            message.current.textContent = "";
                        },1000)
                    }
                })
        } else {
            form.classList.add('postFormError');
            setTimeout(() => {
                form.classList.remove('postFormError');
            }, 1000)
        }
    }

    return(
        <Wraper>
            <CreatePostForm action="" className="postForm1">
                <p className="message dnone" ref={message}>Conecting...</p>
                <InputWraper>
                    <input type="text" name="id" value={post.id} readOnly/>
                    <label htmlFor="title">Post title</label>
                    <input type="text" id="title" placeholder="Post title" name="title" defaultValue={post.title}
                           required/>
                </InputWraper>
                <InputWraper>
                <label htmlFor="imageurl">Image url</label>
                    <input type="text" id="imageurl" placeholder="Image url" name="image" defaultValue={post.image} required/>
                </InputWraper>
                <InputWraper>
                    <label htmlFor="description">Post description</label>
                    <textarea id="description" placeholder="Post description" name="description" defaultValue={post.description} rows="4" cols="50"
                              required/>
                </InputWraper>
                <Button onClick={updatePost} color={"lightGreen"}>Update post</Button>
            </CreatePostForm>
        </Wraper>
    )
}

export default UpdatePostComponent;