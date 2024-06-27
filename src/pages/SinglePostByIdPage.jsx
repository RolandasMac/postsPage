import {useEffect} from 'react';
import {http} from '../utils/http';
import PostsComponent from "../components/PostsComponent";
import {useParams} from "react-router-dom";
import useStore from "../store/store";

function SinglePostByIdPage() {
    const {posts, setPosts} = useStore();
    const {name, id} = useParams();

    useEffect(()=>{
        http.get('http://167.99.138.67:1111/getsinglepost/'+ name + "/" + id )
            .then(res => {
                setPosts([res.data]);
            })
    },[])

    return (
        <div className='d-flex flex-column gap-2'>
            {posts.map((cur, index)=>{
                return  <PostsComponent post={cur} />
            })}
        </div>
    )
}

export default SinglePostByIdPage