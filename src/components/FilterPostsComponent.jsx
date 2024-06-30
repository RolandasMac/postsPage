import Button from "./Button";
import styled from "styled-components";
import {useNavigate} from "react-router-dom";
import useStore from "../store/store";
import {useEffect} from "react";

const Wraper = styled.div`
    padding: 20px 0 ;
    border-radius: 10px;
    background-color: lightgray;
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 10px;
`
const InputWraper = styled.div`
    display: flex;
    flex-direction: column;
    gap: 5px;
    input{
        box-shadow: 3px 3px 3px #000;
        height: 30px;
        box-sizing: border-box;
        border: none;
        border-radius: 5px;
        padding: 0 10px;
        &:focus{
            outline: none;
        }
    }
`

function FilterPostsComponent() {
    const navigate = useNavigate();
    const {posts, setLocalPosts,querryParams,setQuerryParams, setFilteredPostsCount,filteredPostsCount} = useStore();
    const convertDateToTimestamp = (dateString) => {
        const date = new Date(dateString);
        const timestamp = date.getTime();
        return timestamp;
    };

    function filter(e){
        e.preventDefault();
        const form = e.currentTarget.parentElement;
        const formData = new FormData(form);
        let filterData = {username:"",titlestring:"",timestampfrom:"",timestampto:""};
        for (const [key, value] of formData) {
            filterData[key] = value;
        }
        filterData.timestampfrom!==""?filterData.timestampfrom = convertDateToTimestamp(filterData.timestampfrom):filterData.timestampfrom ="";
        filterData.timestampto!==""?filterData.timestampto = convertDateToTimestamp(filterData.timestampto):filterData.timestampto ="";

        const params = {
            currentpage: "1",
            limit: querryParams.limit,
            skip: "0",
            username: filterData.username,
            timestampfrom: filterData.timestampfrom,
            timestampto: filterData.timestampto,
            titlestring: filterData.titlestring
        }
        setQuerryParams(params);
        navigate(`?skip=0&limit=${querryParams.limit}&currentpage=1&username=${filterData.username}&timestampfrom=${filterData.timestampfrom}&timestampto=${filterData.timestampto}&titlestring=${filterData.titlestring}`)
    }

    function cancelfilter(e){
        e.preventDefault();
        const form = e.currentTarget.parentElement;
        const params = {
            currentpage: "1",
            limit: querryParams.limit,
            skip: "0",
            username: "",
            timestampfrom: "",
            timestampto: "",
            titlestring: ""
        }
        setQuerryParams(params);
        navigate(`?skip=0&limit=${querryParams.limit}&currentpage=1&username=&timestampfrom=&timestampto=&titlestring=`);
        form.reset();
    }



    useEffect(() => {

        if(posts.length > 0){
            const newfilteredPosts = posts.filter((cur,index)=>{
                return (
                    (querryParams.username!==""?cur.username===querryParams.username:cur)
                    && (querryParams.titlestring!==""?(cur.title.toLowerCase()).includes((querryParams.titlestring).toLowerCase()):cur)
                    && (querryParams.timestampfrom!==""?cur.timestamp>=querryParams.timestampfrom:cur)
                    && (querryParams.timestampto!==""?cur.timestamp<=querryParams.timestampto:cur)
                )
            })
            setFilteredPostsCount(newfilteredPosts.length)
            let newPosts = newfilteredPosts.filter((post,index) => {
                return index>=querryParams.skip&&index<Number(querryParams.skip)+Number(querryParams.limit);
            })
            setLocalPosts(newPosts);
        }
    }, [posts,querryParams]);

    return(
        <Wraper>
            <form className="d-flex justify-content-between gap-2 align-items-center flex-wrap">
                <InputWraper>
                    <label htmlFor="username">User name</label>
                    <input id="username" type="text" name="username"/>
                </InputWraper>
                <InputWraper>
                    <label htmlFor="timestampfrom">Time from</label>
                    <input id="timestampfrom" type="datetime-local" name="timestampfrom"/>
                </InputWraper>
                <InputWraper>
                    <label htmlFor="timestampto">Time to</label>
                    <input id="timestampto" type="datetime-local" name="timestampto"/>
                </InputWraper>
                <InputWraper>
                    <label htmlFor="titlestring">Title</label>
                    <input id="titlestring" type="text" name="titlestring"/>
                </InputWraper>
                <Button onClick={(event)=>filter(event)} color={"lightGreen"}>Filter</Button>
                <Button onClick={(event)=>cancelfilter(event)} color={"lightGreen"}>Get all posts</Button>
            </form>
        </Wraper>
    )
}

export default FilterPostsComponent;