import styled from "styled-components";
import { FaSearch } from "react-icons/fa";
import useStore from "../store/store";
import {useNavigate} from "react-router-dom";
import {useEffect} from "react";



let StyledHeader = styled.div`
    position: fixed;
    width: 950%;
    max-width: inherit;
    display: flex;
    flex-direction: row;
    justify-content: end;
    align-items: baseline;
    gap: 10px;
    background-color: lightgray;
    padding: 16px;
    font-size: 20px;
    border-radius: 10px;
    margin: 0;
    z-index: 1000;
     .searchbar {
         //position: fixed;
        //width: 100%;
        display: flex;
        flex-direction: row;
        justify-content: end;
        align-items: baseline;
        gap: 10px;       
    }

    & > div > a {
        font-size: 24px;
        text-decoration: none;
        color: green;
    }

    & > div > input {
        padding: 0 10px;
        border-radius: 10px;
        height: 30px;
        width: 250px;
        outline: none;
        border: none;
    }
    .login, .logout{
        color: red;
        text-decoration-line: underline;
        font-size: 16px;
    }
    & > div > span, .login, .logout {
        &:hover {
            transform: scale(1.05);
            cursor: pointer;
        }

        &:active, .login, .logout{
            transform: scale(.95);
        }
    }
       
    `;


function Header(props){

    const {logged,setLogged}=useStore();

    const navigate = useNavigate();

    useEffect(()=>{
        const loginName = JSON.parse(sessionStorage.getItem('logged'));
        setLogged(loginName);
        // alert(loginName);
    },[])

    function login(){
        navigate('/login')
    }
    function logout(){
        sessionStorage.removeItem('secretKey');
        sessionStorage.removeItem('logged');
        setLogged(null)
    }

    return(
        <StyledHeader {...props}>
            <div className="searchbar d-none">
                <input type="text" placeholder="Input search text"/>
                <span><FaSearch/></span>
            </div>
            {logged!==null&&<span>Logged as: {logged}</span>}
            {logged === null ? <span className="login" onClick={login}>Login</span> : <span className="logout" onClick={logout}>Logout</span>}

        </StyledHeader>
    )
}

export default Header;