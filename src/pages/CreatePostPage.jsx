import {useState, useEffect} from 'react';
import http from '../utils/http';
import CreatePostComponent from "../components/CreatePostComponent";
import {useParams} from "react-router-dom";


function CreatePostPage(props) {

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
            <CreatePostComponent/>
        </div>
    )
}

export default CreatePostPage