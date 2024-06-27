import {useEffect} from 'react';
import {http} from '../utils/http';
import PostsComponent from "../components/PostsComponent";
import {useParams} from "react-router-dom";
import useStore from "../store/store";

function PostsByNamePage() {
    const {posts, setPosts} = useStore();
    const {name} = useParams();

    useEffect(()=>{
        http.get('http://167.99.138.67:1111/getuserposts/'+name )
            .then(res => {
                setPosts(res.data);
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