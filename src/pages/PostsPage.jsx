import {useState, useEffect} from 'react';
import {http} from '../utils/http';
import PostsComponent from "../components/PostsComponent";
import {useLocation, useParams} from "react-router-dom";
import useStore from "../store/store.js";
import PaginationComponent from "../components/pagination/PaginationComponent";
import FilterPostsComponent from "../components/FilterPostsComponent";

function PostsPage() {

    const {posts, setPosts} = useStore();
    const {querryParams,setQuerryParams} = useStore();
    const location = useLocation();
    const [filteredPostsCount, setFilteredPostsCount] = useState(0);
    const [localPosts, setLocalPosts] = useState([]);

    useEffect(()=>{
        http.get('http://167.99.138.67:1111/getallposts')
            .then(res => {
                setPosts(res.data);
                // console.log(res.data);
            })
    },[])

    useEffect(() => {
        // alert('Suveikė useEfect')
        if(posts.length > 0){

            const searchParams = new URLSearchParams(location.search);
            let params = {};
            for (let param of searchParams) {
                params[param[0]] = param[1];
            }
            console.log(params)
            // alert(params.titlestring!=="null")
            const newfilteredPosts = posts.filter((cur,index)=>{

                return (
                        (params.username!==""?cur.username===params.username:cur)
                        && (params.titlestring!==""?(cur.title.toLowerCase()).includes((params.titlestring).toLowerCase()):cur)
                        && (params.timestampfrom!==""?cur.timestamp>=params.timestampfrom:cur)
                        && (params.timestampto!==""?cur.timestamp<=params.timestampto:cur)

                )
            })
            setFilteredPostsCount(newfilteredPosts.length)
            console.log(newfilteredPosts, newfilteredPosts.length)

            let newPosts = newfilteredPosts.filter((post,index) => {
                return index>=params.skip&&index<Number(params.skip)+Number(params.limit);
            })
            setLocalPosts(newPosts);
        }
    }, [querryParams,posts]);

    return (
        <div className='d-flex flex-column gap-2'>
            <FilterPostsComponent></FilterPostsComponent>
            {localPosts.length>0&&<PaginationComponent filteredPostsCount={filteredPostsCount}></PaginationComponent>}
            {localPosts.length>0&&localPosts.map((cur, index)=>{
                return <PostsComponent key={index} post={cur}/>
            })}

        </div>
    )
}

export default PostsPage;