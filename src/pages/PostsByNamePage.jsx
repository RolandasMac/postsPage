import {useEffect} from 'react';
import {http} from '../utils/http';
import PostsComponent from "../components/PostsComponent";
import {useParams} from "react-router-dom";
import useStore from "../store/store";
import FilterPostsComponent from "../components/FilterPostsComponent";
import PaginationComponent from "../components/pagination/PaginationComponent";

function PostsByNamePage() {
    const {posts, setPosts,localPosts,filteredPostsCount,setFilteredPostsCount,setQuerryParams,querryParams} = useStore();
    const {name} = useParams();

    useEffect(()=>{
        setQuerryParams({...querryParams,currentpage:1, skip:0})
        http.get('http://167.99.138.67:1111/getuserposts/'+name )
            .then(res => {
                setPosts(res.data);
                setFilteredPostsCount(posts.length);
            })
    },[])

    return (
        <div className='d-flex flex-column gap-2'>
            <FilterPostsComponent></FilterPostsComponent>
            {localPosts.length>=0&&<PaginationComponent filteredPostsCount={filteredPostsCount}></PaginationComponent>}
            {localPosts.map((cur, index)=>{
                return <PostsComponent key={index} post={cur} />
            })}
        </div>
    )
}

export default PostsByNamePage;