import {useState, useEffect} from 'react';
import {http} from '../utils/http';
import PostsComponent from "../components/PostsComponent";
import useStore from "../store/store";
import FilterPostsComponent from "../components/FilterPostsComponent";
import PaginationComponent from "../components/pagination/PaginationComponent";

function FavoritesPostsPage() {
    const {favorites,localPosts, filteredPostsCount, setFilteredPostsCount,setPosts, setQuerryParams,querryParams} = useStore();

    useEffect(()=>{
        setQuerryParams({...querryParams,currentpage:1, skip:0})
    },[])
    useEffect(()=>{
        http.get('http://167.99.138.67:1111/getallposts')
            .then(res => {
                    let newFavPosts = res.data.filter((cur)=>{
                        return favorites.includes(cur.id);
                    })
                // console.log(newFavPosts)
                    setPosts(newFavPosts);
                    setFilteredPostsCount(newFavPosts.length);
            })
    },[favorites])

    return (
        <div className=' d-flex flex-column gap-2'>
            <FilterPostsComponent></FilterPostsComponent>
            {<PaginationComponent filteredPostsCount={filteredPostsCount}></PaginationComponent>}
            {localPosts.map((cur, index)=>{
                return <PostsComponent key={cur.id} post={cur}/>
            })}
        </div>
    )
}

export default FavoritesPostsPage;