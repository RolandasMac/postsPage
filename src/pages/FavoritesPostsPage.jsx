import {useState, useEffect} from 'react';
import {http} from '../utils/http';
import PostsComponent from "../components/PostsComponent";
import {useParams} from "react-router-dom";
import useStore from "../store/store";


function FavoritesPostsPage({user, fav, posts, setPosts, setFav}) {

    const [favPosts, setFavPosts] = useState([]);
    const {favorites,setFavorites} = useStore();

    useEffect(()=>{
        console.log(favorites);
        http.get('http://167.99.138.67:1111/getallposts')
            .then(res => {
                    let newFavPosts = res.data.filter((cur)=>{
                        return favorites.includes(cur.id);
                    })
                    setFavPosts(newFavPosts);
                    // console.log(res.data);
            })
    },[favorites])

    return (
        <div className=' d-flex flex-column gap-2'>
            {favPosts.map((cur, index)=>{
                return <PostsComponent key={cur.id} post={cur}/>
            })}
        </div>
    )
}

export default FavoritesPostsPage;