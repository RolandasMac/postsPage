import {Outlet, Link, useLocation} from 'react-router-dom';
import Header from '../components/Header';
import useStore from '../store/store';
import {useEffect} from "react";


function Layout(props) {
    const {querryParams, setQuerryParams,favorites} = useStore();
    const location = useLocation();
    useEffect(()=>{
        const searchParams = new URLSearchParams(location.search);
        let params = {};
        for (let param of searchParams) {
            params[param[0]] = param[1];
        }

        if(params.length > 0){
            setQuerryParams({
                currentpage: params.currentpage,
                limit: params.limit,
                skip: params.skip,
                username: params.username,
                timestampfrom: params.timestampfrom,
                timestampto: params.timestampto,
                titlestring: params.titlestring

            });
        }

    },[])




    return(
        <div className="container">
            <Header>Labas, čia aš</Header>
            <div className="page d-flex gap-2">
                <div className="toolbar bg-success">
                    <h4>Toolbar</h4>
                    <ul>
                        <li>{<Link to='/home' >Home</Link>}</li>
                        <li>{<Link to={`/posts?skip=${querryParams.skip}&limit=${querryParams.limit}&currentpage=${querryParams.currentpage}&username=${querryParams.username}&timestampfrom=${querryParams.timestampfrom}&timestampto=${querryParams.timestampto}&titlestring=${querryParams.titlestring}`}>Posts</Link>}</li>
                        <li>{<Link to='/cteatepost' className='linkText'>Create post</Link>}</li>
                        <li>{<Link to='/favposts?skip=0&limit=10&currentpage=1&username=&timestampfrom=&timestampto=&titlestring=' className='linkText'>Favorite posts<span>{`(${favorites.length})`}</span></Link>}</li>
                    </ul>
                </div>
                <div className="content ">
                    <Outlet></Outlet>
                </div>
            </div>
        </div>
    )
}

export default Layout;