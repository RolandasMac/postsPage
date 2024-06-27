import {useState, useEffect} from 'react';

import UpdatePostComponent from "../components/UpdatePostComponent";
import {useLocation, useParams} from "react-router-dom";


function UpdatePostAPage(props) {
    const location = useLocation();

    return (
        <div className='d-flex flex-column gap-2'>
            <UpdatePostComponent post={location.state.post} location={location.state.location} />
        </div>
    )
}

export default UpdatePostAPage