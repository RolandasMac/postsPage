import {useLocation, useNavigate} from "react-router-dom";
import {http} from "../utils/http";
import {useRef} from "react";
import { IoStarOutline } from "react-icons/io5";
import Button from "../components/Button";
import useStore from "../store/store";


function PostsComponent({post}){
    let location = useLocation();
    const {logged, posts, setPosts,favorites,setFavorites} = useStore();
    let postsByName = useNavigate()
    const message = useRef(null);
    function navigate(){
        postsByName('/getuserposts/'+post.username)
    }
    function navtoid(e){
        e.stopPropagation();
        postsByName('/getsinglepost/'+post.username + "/"+post.id);
    }

    function deletePost(e, location, id){
        e.preventDefault();
        let postData = {}
        postData.secretKey = JSON.parse(sessionStorage.getItem("secretKey"));
        postData.id = id;
            http.post('http://167.99.138.67:1111/deletepost', postData)
                .then((res) => {
                    if(res.success){
                        let newPosts = posts.filter(post => post.id !== id);
                        setPosts(newPosts);
                        let newFav = favorites.filter(cur => cur !== id)
                        setFavorites(newFav)
                        localStorage.setItem("favorites", JSON.stringify(newFav));
                    }else{
                        message.current.classList.remove('dnone')
                        message.current.classList.add('errmsg');
                        message.current.textContent = res.message?res.message:"Something is wrong";
                        setTimeout(()=>{
                            message.current.classList.add('dnone')
                            message.current.classList.remove('succmsg');
                            message.current.textContent = "";
                        },3000)
                    }
                })
    }

    function updatePost(post){
        postsByName('/updatepost',{state:{post:post, location:location}})
    }

    function addToFav(id){
        if(!favorites.includes(id)){
            let newFav =[...favorites, id];
            setFavorites(newFav);
            localStorage.setItem("favorites", JSON.stringify(newFav));
        }else{
            console.log(favorites)
            let newFav = favorites.filter(cur => cur !== id)
            setFavorites(newFav)
            localStorage.setItem("favorites", JSON.stringify(newFav));
        }
    }

    const getLithuanianDateFromTimestamp = (timestamp) => {
        const date = new Date(timestamp);
        const options = {
            year: 'numeric',
            month: 'long',
            day: 'numeric',
            weekday: 'long',
            hour: '2-digit',
            minute: '2-digit',
            second: '2-digit',
        };
        const lithuanianDate = date.toLocaleDateString('lt-LT', options);
        return lithuanianDate;
    };
    return(
        <>
        {post !== "undefined" && post != null && post != '' && <div className="apost p-2">
            <p className="message dnone" ref={message}>Conecting...</p>
            <h4>{post.title}</h4>
            <div onClick={navtoid} >Id:{'\t'}
                <p className="id">{post.id}</p>
            </div>{'\t'}
            <div onClick={navigate} >User name:{'\t'}
                <span className="username">{post.username}</span>
            </div>{'\t'}
            <span>Created: {getLithuanianDateFromTimestamp(post.timestamp)}</span>
            <p>{post.description}</p>
            <div className="d-flex align-items-center gap-2">
                <img src={post.image} alt=""/>
                {logged === post.username &&
                    <Button onClick={(event) => deletePost(event, location, post.id)} color={"red"}>Delete
                        post</Button>}
                {logged === post.username && <Button onClick={() => updatePost(post)} color={"green"}>Update post</Button>}
                <span className="fav" onClick={()=>addToFav(post.id)}
                      style={{color: favorites.includes(post.id) ? "red" : "green"}}
                > <IoStarOutline/></span>
            </div>
        </div>}
        </>
    )
}

export default PostsComponent