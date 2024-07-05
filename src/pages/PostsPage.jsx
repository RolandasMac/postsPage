import {useState, useEffect} from 'react';
import {http} from '../utils/http';
import PostsComponent from "../components/PostsComponent";
import {useLocation, useParams} from "react-router-dom";
import useStore from "../store/store.js";
import PaginationComponent from "../components/pagination/PaginationComponent";
import FilterPostsComponent from "../components/FilterPostsComponent";

function PostsPage() {
    const { setPosts,localPosts,filteredPostsCount} = useStore();


    useEffect(()=>{
        http.get('http://167.99.138.67:1111/getallposts')
            .then(res => {
                setPosts(res.data);
                // console.log(res)
            })
    },[])

    return (
        <div className='d-flex flex-column gap-2'>
            <FilterPostsComponent></FilterPostsComponent>
            {<PaginationComponent filteredPostsCount={filteredPostsCount}></PaginationComponent>}
            {localPosts.length>0&&localPosts.map((cur, index)=>{
                return <PostsComponent key={index} post={cur}/>
            })}
        </div>
    )
}
export default PostsPage;