import {Outlet, Link} from 'react-router-dom';
import Header from '../components/Header';
import useStore from '../store/store';


function Layout(props) {
    const {querryParams, setQuerryParams,favorites} = useStore();
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
                        <li>{<Link to='/favposts' className='linkText'>Favorite posts<span>{`(${favorites.length})`}</span></Link>}</li>
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