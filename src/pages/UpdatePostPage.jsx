import {useState, useEffect} from 'react';

import UpdatePostComponent from "../components/UpdatePostComponent";
import {useLocation, useParams} from "react-router-dom";


function UpdatePostAPage(props) {
    const location = useLocation();
    // console.log(location.state.post);
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
            <UpdatePostComponent post={location.state.post} location={location.state.location} />
        </div>
    )
}

export default UpdatePostAPage