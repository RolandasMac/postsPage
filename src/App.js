import 'bootstrap/dist/css/bootstrap.css';
import style from './css/style.css'
import {Routes, Route} from "react-router-dom";
import Layout from "./pages/Layout";
import HomePage from "./pages/HomePage";
import LoginPage from "./pages/LoginPage";
import RegisterPage from "./pages/RegisterPage";
import PostsPage from "./pages/PostsPage";
import UpdatePostPage from "./pages/UpdatePostPage";
import CreatePostPage from "./pages/CreatePostPage";
import FavoritesPostsPage from "./pages/FavoritesPostsPage";
import PostsByNamePage from "./pages/PostsByNamePage";
import SinglePostByIdPage from "./pages/SinglePostByIdPage";


function App() {

  return (
    <>
        <Routes>
            <Route path="/" element={<Layout />}>
                <Route index element={<HomePage />} />
                <Route path="home" element={<HomePage />}/>
                <Route path="login" element={<LoginPage/>}/>
                <Route path="register" element={<RegisterPage />}/>
                <Route path="posts" element={<PostsPage />}/>
                <Route path="updatepost" element={<UpdatePostPage />}/>
                <Route path="cteatepost" element={<CreatePostPage />}/>
                <Route path="favposts" element={<FavoritesPostsPage />}/>
                <Route path="getuserposts/:name" element={<PostsByNamePage/>}/>
                <Route path="getsinglepost/:name/:id" element={<SinglePostByIdPage/>}/>

            </Route>
        </Routes>
    </>
  );
}

export default App;
