import {http} from '../utils/http';
import {useRef, useState} from "react";
import styled from "styled-components";
import Button from "../components/Button";
import useStore from "../store/store";
import {useNavigate} from "react-router-dom";



const LoginWraper = styled.div`
    border-radius: 10px;
    background-color: lightgray;
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 10px;
`
const LoginForm = styled.form`
    padding: 40px;
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 10px;
    .register{
        color: red;
        text-decoration-line: underline;
        font-size: 16px;
        &:hover {
            transform: scale(1.05);
            cursor: pointer;
        }

        &:active, .login, .logout{
            transform: scale(.95);
        }
    }
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

function LoginComponent(){
    const {logged, setLogged} = useStore();
    const message = useRef(null);
    const navigate = useNavigate();
    const {querryParams,setQuerryParams} = useStore();

    function login(e){
        e.preventDefault();
        const form = e.currentTarget.parentElement;
        console.log(form);
        if(form.checkValidity()) {
            const formData = new FormData(form);
            let loginData = {name:"",password:""};
            for (const [key, value] of formData) {
                loginData[key] = value;
            }
            form.reset();
            http.post('http://167.99.138.67:1111/login', loginData)
                .then((res)=>{
                    if(res.success){
                        setLogged(loginData.name)
                        sessionStorage.setItem('secretKey',JSON.stringify(res.secretKey));
                        sessionStorage.setItem('logged',JSON.stringify(loginData.name));
                        message.current.classList.remove('dnone')
                        message.current.classList.add('succmsg');
                        message.current.textContent = res.message;
                        setTimeout(()=>{
                            message.current.classList.add('dnone')
                            message.current.classList.remove('succmsg');
                            message.current.textContent = "";
                            navigate(`/posts?skip=${querryParams.skip}&limit=${querryParams.limit}&currentpage=${querryParams.currentpage}&username=${querryParams.username}&timestampfrom=${querryParams.timestampfrom}&timestampto=${querryParams.timestampto}&titlestring=${querryParams.titlestring}`)
                        },1000)
                    }else{
                        message.current.classList.remove('dnone')
                        message.current.classList.add('errmsg');
                        message.current.textContent = res.message?res.message:"Something is wrong";
                        setTimeout(()=>{
                            message.current.classList.add('dnone')
                            message.current.classList.remove('succmsg');
                            message.current.textContent = "";
                        },3000)
                    }
                })
        }else{
            form.classList.add('postFormError');
            setTimeout(()=>{
                form.classList.remove('postFormError');
            },3000)
        }
    }

    function register(){
        navigate('/register')
    }

    return(
        <LoginWraper>
            <LoginForm action="" className="postForm1">
                    <p className="message dnone" ref={message}>Login...</p>
                    <InputWraper>
                        <label htmlFor="username">User name</label>
                        <input type="text" id="username" placeholder="Username" name="name" className="postFormError" required/>
                    </InputWraper>
                    <InputWraper>
                        <label htmlFor="password">Password</label>
                        <input type="password" id="password" placeholder="Password" name="password" required/>
                    </InputWraper>
                    <Button onClick={login} color={"lightGreen"}>Login</Button>
                    <span>You don't have a login?</span>
                    <span className="register" onClick={register}>Register!</span>
            </LoginForm>
        </LoginWraper>
    )
}

export default LoginComponent;