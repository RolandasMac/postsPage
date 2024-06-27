import {useState, useEffect} from 'react';
import RegisterComponent from "../components/RegisterComponent";

function RegisterPage(props) {

    return (
        <div className='d-flex flex-column gap-2'>
            <RegisterComponent/>
        </div>
    )
}

export default RegisterPage