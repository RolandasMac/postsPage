import {useState, useEffect} from 'react';
import {http} from '../utils/http';
import PostsComponent from "../components/PostsComponent";
import {useParams} from "react-router-dom";


function PostsByNamePage({user, fav, setFav}) {

    const [posts, setPosts] = useState([]);

    const {name} = useParams();

    // console.log(name);

    useEffect(()=>{
        http.get('http://167.99.138.67:1111/getuserposts/'+name )
            .then(res => {
                setPosts(res.data);
                // console.log(res.data);
            })
    },[])

    return (

        <div className='d-flex flex-column gap-2'>
            {posts.map((cur, index)=>{
                return <PostsComponent key={index} post={cur} />
            })}
        </div>
    )
}

export default PostsByNamePage;