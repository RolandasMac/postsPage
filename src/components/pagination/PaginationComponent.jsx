import useStore from "../../store/store";
import {useNavigate} from "react-router-dom";
import {useEffect} from "react";


function Pagination({filteredPostsCount}){
    const {pages, setPages} = useStore();
    const navigate = useNavigate();
    const {querryParams,setQuerryParams} = useStore();

    useEffect(() => {
        if((parseInt(querryParams.skip)>0)&&(parseInt(querryParams.skip)===parseInt(filteredPostsCount))){
            navigate(`?skip=${querryParams.skip-querryParams.limit}&limit=${querryParams.limit}&currentpage=${Math.ceil(filteredPostsCount/querryParams.limit)}&username=${querryParams.username}&timestampfrom=${querryParams.timestampfrom}&timestampto=${querryParams.timestampto}&titlestring=${querryParams.titlestring}`)
            setQuerryParams({...querryParams,skip:(querryParams.skip-querryParams.limit),currentpage:(Math.ceil(filteredPostsCount/querryParams.limit))} )
        }
        createPaginationElements(querryParams);
    }, [filteredPostsCount, querryParams]);

    function createPaginationElements({limit,skip,currentpage}){
        let pag = [];
        let totalPages = Math.ceil(filteredPostsCount/limit);
        for(let i = 1; i<=totalPages;i++){
            if(i===Number(currentpage)){
                pag.push(
                    <div key={i} className="pag active" onClick={()=>alert("You are on the current page")}>{i}</div>
                )
        }else if(i>Number(currentpage)-5 && i<Number(currentpage)+5){
                pag.push(
                    <div key={i} className="pag" onClick={()=>getposts(i)}>{i}</div>
                )
            }else if(i===Number(currentpage)-5){
                pag.push(
                    <div key={i} className="pag" onClick={()=>getposts(i)}>{"<-"+i}</div>
                )
            }else if(i===Number(currentpage)+5){
                pag.push(
                    <div key={i} className="pag" onClick={()=>getposts(i)}>{i+"->"}</div>
                )
            }
        }
        setPages(pag)
    }

    function changeLimit(num){
        const currentPageCount = Math.ceil((querryParams.skip+1)/num)
        const newSkip = Math.floor(num*(currentPageCount-1));
        setQuerryParams({...querryParams,currentpage:currentPageCount,skip:newSkip,limit:num });
        navigate(`?skip=${newSkip}&limit=${num}&currentpage=${currentPageCount}&username=${querryParams.username}&timestampfrom=${querryParams.timestampfrom}&timestampto=${querryParams.timestampto}&titlestring=${querryParams.titlestring}`)
    }

    function getposts(page){
        let skiped = page*querryParams.limit-querryParams.limit;
        setQuerryParams({...querryParams,currentpage:page,skip:skiped});
        navigate(`?skip=${skiped}&limit=${querryParams.limit}&currentpage=${page}&username=${querryParams.username}&timestampfrom=${querryParams.timestampfrom}&timestampto=${querryParams.timestampto}&titlestring=${querryParams.titlestring}`)
    }

    return(
        <div className="pages">
            {pages}
            <select defaultValue={querryParams.limit} className="numberinput" onChange={(event) => {
                changeLimit(event.currentTarget.value)
            }}>
                <option value="10">10</option>
                <option value="20">20</option>
                <option value="50">50</option>
                <option value="100">100</option>

            </select>
        </div>
    )
}

export default Pagination