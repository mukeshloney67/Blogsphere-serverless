import { Avatar } from "./BlogCard"

export const Appbar = () => {
  return <div className="border-b px-13 py-6  flex justify-between">
    <div className="flex flex-col justify-center">
        BlogSphere
    </div>
    <div className="">
    <Avatar name= "Mukesh" size={10}/>
    </div>
  </div>
}
