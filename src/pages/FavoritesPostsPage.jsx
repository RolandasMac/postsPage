import {useState, useEffect} from 'react';
import {http} from '../utils/http';
import PostsComponent from "../components/PostsComponent";
import useStore from "../store/store";


function FavoritesPostsPage() {
    const {favorites,setFavorites,localPosts, setLocalPosts,filteredPostsCount, setFilteredPostsCount} = useStore();

    useEffect(()=>{
        http.get('http://167.99.138.67:1111/getallposts')
            .then(res => {
                    let newFavPosts = res.data.filter((cur)=>{
                        return favorites.includes(cur.id);
                    })
                setLocalPosts(newFavPosts);
            })
    },[favorites])

    console.log(localPosts.length);
    console.log(filteredPostsCount);
    return (
        <div className=' d-flex flex-column gap-2'>
            {localPosts.map((cur, index)=>{
                return <PostsComponent key={cur.id} post={cur}/>
            })}
        </div>
    )
}

export default FavoritesPostsPage;