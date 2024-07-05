import {useRef, useState} from "react";
import styled from "styled-components";
import Button from "../components/Button";
import {http} from '../utils/http';

const RegisterWraper = styled.div`
    border-radius: 10px;
    background-color: lightgray;
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 10px;
`
const RegisterForm = styled.form`
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
`

function RegisterComponent(){
    const message = useRef(null);
    const [data,setData]=useState({});

    function register(e){
        e.preventDefault();
        const form = e.currentTarget.parentElement;

        if (form.checkValidity()) {
            const formData = new FormData(form);
            let postData = data;
            for (const [key, value] of formData) {
                postData[key] = value;
            }
            if (postData.passwordOne === postData.passwordTwo) {
                form.reset();
                setData(postData);
                console.log(postData);
                http.post('http://167.99.138.67:1111/createaccount', postData)
                    .then((res) => {
                        if(res.success){
                            console.log(res);
                            localStorage.setItem('secretKey',JSON.stringify(res.secretKey));
                            message.current.classList.remove('dnone')
                            message.current.classList.add('succmsg');
                            message.current.textContent = res.message;
                            setTimeout(()=>{
                                message.current.classList.add('dnone')
                                message.current.classList.remove('succmsg');
                                message.current.textContent = "";
                            },3000)
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
                alert('Password do\'t match')
            }
        } else {
            form.classList.add('postFormError');
            setTimeout(() => {
                form.classList.remove('postFormError');
            }, 1000)
        }
    }

    return(
        <RegisterWraper>
            <RegisterForm action="" className="postForm1">
                <p className="message dnone" ref={message}>Register...</p>
                <InputWraper>
                    <label htmlFor="username">User name</label>
                    <input type="text" id="username" placeholder="Username" name="name" required/>
                </InputWraper>
                <InputWraper>
                    <label htmlFor="password">Password</label>
                    <input type="password" id="password" placeholder="Password" name="passwordOne" required/>
                </InputWraper>
                <InputWraper>
                    <label htmlFor="confPassword">Confirm password</label>
                    <input type="password" id="confPassword" placeholder="Confirm password" name="passwordTwo"
                           required/>
                </InputWraper>
                <Button onClick={register} color={"lightGreen"}>Register</Button>
            </RegisterForm>
        </RegisterWraper>
    )
}

export default RegisterComponent;