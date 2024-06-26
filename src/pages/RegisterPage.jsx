import {useState, useEffect} from 'react';

import RegisterComponent from "../components/RegisterComponent";
import {useParams} from "react-router-dom";


function RegisterPage(props) {

    // const [post, setPost] = useState([]);
    //
    // const {name} = useParams();

    // console.log(name);

    useEffect(()=>{
        // http.get('http://167.99.138.67:1111/getuserposts/'+name )
        //     .then(res => {
        //         setPost(res.data);
        //         // console.log(res.data);
        //     })
    },[])

    return (

        <div className='d-flex flex-column gap-2'>
            <RegisterComponent/>
        </div>
    )
}

export default RegisterPage