import { Blog } from "../hooks"
import { Appbar } from "./Appbar"
import { Avatar } from "./BlogCard"



export const FullBlog = ({blog}:{blog: Blog}) => {
  return <div>
      <Appbar/>
      <div className="flex justify-center">
     <div className="grid grid-cols-12 px-50 w-full pt-14 max-w-screen-2xl">
    <div className=" col-span-8 pr-15" >
      <div className="text-4xl font-extrabold ">
      {blog.title}
      </div>
      <div className="text-slate-500 pt-2">
        Posted on 2nd dec
      </div>
      <div className="">
        {blog.content}
      </div>
    </div>
    <div className=" col-span-4" >
      <div className="text-slate-400">
        Author
      </div>
     <div className=" pt-2 flex w-full">
        <div className=" pt-1 pr-2 flex">
        <Avatar name= {blog.author.name} size={30}/>
        </div>
        <div>
          <div className="text-3xl font-bold">
          {blog.author.name || "Anonymous"}
          </div>
          <div className="pt-4">
          Look! Up in the sky! It's a bird! It's a plane! It's Superman!
          </div>
      </div>
     </div>
    </div>
  </div>
  </div>
  </div>
}
