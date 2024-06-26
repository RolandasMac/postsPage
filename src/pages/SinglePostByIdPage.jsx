import {useState, useEffect} from 'react';
import {http} from '../utils/http';
import PostsComponent from "../components/PostsComponent";
import {useParams} from "react-router-dom";


function SinglePostByIdPage({user, fav, setFav}) {

    const [post, setPost] = useState(null);

    const {name, id} = useParams();

    // console.log(name);

    useEffect(()=>{
        http.get('http://167.99.138.67:1111/getsinglepost/'+ name + "/" + id )
            .then(res => {
                setPost(res.data);
                // console.log(res.data);
            })
    },[])

    return (

        <div className='d-flex flex-column gap-2'>
            <PostsComponent post={post} />
        </div>
    )
}

export default SinglePostByIdPage