import useStore from "../../store/store";
import {useLocation, useNavigate} from "react-router-dom";
import {useEffect, useState} from "react";


function Pagination({filteredPostsCount}){
    const {skip, setSkip} = useStore();
    const {limit,setLimit} = useStore();
    const {currentPage, setCurrentPage} = useStore();
    const {pages, setPages} = useStore();
    const location = useLocation();
    const navigate = useNavigate();
    const {querryParams,setQuerryParams} = useStore();

    function createPaginationElements({limit,skip,currentpage}){
        let pag = [];
        let totalPages = Math.ceil(filteredPostsCount/limit);
        for(let i = 1; i<=totalPages;i++){
            if(i===Number(currentpage)){
                pag.push(
                    <div key={i} className="pag active" onClick={()=>alert("Veikia")}>{i}</div>
                )
        }else if(i>Number(currentpage)-6 && i<Number(currentpage)+6){
                pag.push(
                    <div key={i} className="pag" onClick={()=>getposts(i)}>{i}</div>
                )
            }else if(i===Number(currentpage)-6){
                pag.push(
                    <div key={i} className="pag" onClick={()=>alert("Veikia")}>{"<..."}</div>
                )
            }else if(i===Number(currentpage)+6){
                pag.push(
                    <div key={i} className="pag" onClick={()=>alert("Veikia")}>{"...>"}</div>
                )
            }
        }
        setPages(pag)
    }

    useEffect(() => {

        const searchParams = new URLSearchParams(location.search);
        let params = {};
        for (let param of searchParams) {
            params[param[0]] = param[1];
        }
        setQuerryParams({...querryParams,...params});
        createPaginationElements(params);
    }, [limit, skip, currentPage, filteredPostsCount]);

    function changeLimit(num){
        const currentPageCount = Math.ceil((skip+1)/num)
        const newSkip = Math.floor(num*(currentPageCount-1));
        setLimit(num);
        setSkip(newSkip);
        setCurrentPage(currentPageCount);
        navigate(`?skip=${newSkip}&limit=${num}&currentpage=${currentPageCount}&username=${querryParams.username}&timestampfrom=${querryParams.timestampfrom}&timestampto=${querryParams.timestampto}&titlestring=${querryParams.titlestring}`)
    }

    function getposts(page){
        let skiped = page*limit-limit;
        setCurrentPage(page);
        setSkip(skiped);
        setLimit(limit);
        navigate(`?skip=${skiped}&limit=${limit}&currentpage=${page}&username=${querryParams.username}&timestampfrom=${querryParams.timestampfrom}&timestampto=${querryParams.timestampto}&titlestring=${querryParams.titlestring}`)
    }

    return(
        <div className="pages">
            {pages}
            <select className="numberinput" onChange={(event) => {
                changeLimit(event.currentTarget.value)
            }}>
                <option selected={querryParams.limit} >{querryParams.limit}</option>
                <option value="10">10</option>
                <option value="20">20</option>
                <option value="50">50</option>
                <option value="100">100</option>

            </select>
        </div>
    )
}

export default Pagination