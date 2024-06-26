// import {useState, useEffect} from 'react';
// import http from '../utils/http';
import LoginComponent from "../components/LoginComponent";
import {useState} from "react";
// import {useParams} from "react-router-dom";



function LoginPage() {



    return (

        <div className='d-flex flex-column gap-2'>
           <LoginComponent />
        </div>
    )
}

export default LoginPage