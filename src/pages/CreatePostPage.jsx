import {useState, useEffect} from 'react';
import CreatePostComponent from "../components/CreatePostComponent";


function CreatePostPage(props) {

    return (
        <div className='d-flex flex-column gap-2'>
            <CreatePostComponent/>
        </div>
    )
}
export default CreatePostPage