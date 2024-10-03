import {createSearchParams, useLocation, useNavigate, useSearchParams} from "react-router-dom";
import {useEffect, useState} from "react";
import {IPageResponse} from "../types/todo.ts";
import {getTodoList} from "../api/todoAPI.ts";

const initialState = {
    content : [],
    first : false,
    last: false,
    number : 0,
    size: 0,
    totalElements: 0,
    totalPages: 0
}

const useTodoList = ()=> {


    const[query]=useSearchParams()
    const location = useLocation()
    const navigate = useNavigate()

    const page : number = Number(query.get("page"))|| 1
    const size : number = Number(query.get("size"))|| 10


    const [loading,setLoading]=useState<boolean>(false)
    const [pageResponse, setPageResponse] = useState<IPageResponse>(initialState)

    const queryStr = createSearchParams({page: page, size: size})

    const moveToRead = (mno: number | undefined) => {
        navigate({
            pathname: `/todo/read/${mno}`,
            search: `?${queryStr}`
        })
    }

    useEffect(() => {
        console.log("-------------")
        setLoading(true)
        getTodoList(page,size).then(data =>{
            setPageResponse(data)
            setLoading(false)
        })

    },[query,location.key])

    return {loading, pageResponse, moveToRead }

}



export default useTodoList
