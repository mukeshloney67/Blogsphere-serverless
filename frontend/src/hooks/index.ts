import { useEffect, useState } from "react"
import axios from 'axios'
import { BACKEND_URL } from "../Config";

interface Blog{
    "id": number,
    "title": string,
    "content": string,
    "author": {
            "name": string
        }
}

export const useBlog = ({id}: {id: string})=>{
    const [loading, setLoading] = useState(true);
    const [blog, setBlog] = useState<Blog>()
    useEffect(()=>{
        axios.get(`${BACKEND_URL}/api/v1/blog/${id}`, {
            headers: {
                 Authorization: localStorage.getItem("token")
            }
        })
        .then(res =>{
            setBlog(res.data.blog)
            setLoading(false);
        })
    },[])

    return {
        loading,
        blog
    }
}


export const useBlogs = () =>{
    const [loading, setLoading] = useState(true);
    const [blogs, setBlogs] = useState<Blog[]>([])
    useEffect(()=>{
        axios.get(`${BACKEND_URL}/api/v1/blog/bulk`, {
            headers: {
                 Authorization: localStorage.getItem("token")
            }
        })
        .then(res =>{
            setBlogs(res.data.blogs)
            setLoading(false);
        })
    },[])

    return {
        loading,
        blogs
    }
}