import {http} from '../utils/http';
import {useRef, useState} from "react";
import styled from "styled-components";
import Button from "../components/Button";

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

function CreatePostComponent(){
    const message = useRef(null);
    const [data,setData]=useState({});

    function createPost(e){
        e.preventDefault();
        const form = e.currentTarget.parentElement;

        if(JSON.parse(sessionStorage.getItem("secretKey"))!==null){
            if (form.checkValidity()) {
                const formData = new FormData(form);
                let postData = data;
                postData.secretKey = JSON.parse(sessionStorage.getItem("secretKey"));
                for (const [key, value] of formData) {
                    postData[key] = value;
                }
                setData(postData);
                http.post('http://167.99.138.67:1111/createpost', postData)
                    .then((res) => {
                        console.log(res);
                        if(res.success){
                            message.current.classList.remove('dnone')
                            message.current.classList.add('succmsg');
                            message.current.textContent = res.message;
                            setTimeout(()=>{
                                message.current.classList.add('dnone')
                                message.current.classList.remove('succmsg');
                                message.current.textContent = "";
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
                form.reset();
            } else {
                form.classList.add('postFormError');
                setTimeout(() => {
                    form.classList.remove('postFormError');
                }, 1000)
            }
        }else{
            alert("You are not logged in!");
        }


    }

    return(
        <Wraper>
            <CreatePostForm action="" className="postForm1">
                <p className="message dnone" ref={message}>Conecting...</p>
                <InputWraper>
                    <label htmlFor="title">Post title</label>
                    <input type="text" id="title" placeholder="Post title" name="title" required/>
                </InputWraper>
                <InputWraper>
                    <label htmlFor="imageurl">Image url</label>
                    <input type="text" id="imageurl" placeholder="Image url" name="image" required/>
                </InputWraper>
                <InputWraper>
                    <label htmlFor="description">Post description</label>
                    <textarea id="description" placeholder="Post description" name="description" rows="4" cols="50"
                           required/>
                </InputWraper>
                <Button onClick={createPost} color={"lightGreen"}>Create post</Button>
            </CreatePostForm>

        </Wraper>
    )
}

export default CreatePostComponent;