import { Appbar } from "../components/Appbar"
import { BlogCard } from "../components/BlogCard"
import { BlogSkeleton } from "../components/BlogSkeleton";
import { useBlogs } from "../hooks"

export const Blogs = () => {
    const {loading, blogs} = useBlogs(); //custom hook
    if(loading){
      return <div>
        <Appbar />
        <div className="flex justify-center">
        <div>
        <BlogSkeleton/>
        <BlogSkeleton/>
        <BlogSkeleton/>
        <BlogSkeleton/>
        </div>
        </div>
       
      </div>
  }
    
  return <div>
    <Appbar />
    <div className="p-4 flex justify-center">
        <div className="">
            {blogs.map(blog => <BlogCard
            id={blog.id}
            authorName={blog.author.name || "Anonymous"}
            title={blog.title}
            content={blog.content}
            publishedDate="21-12 -2002"/> )}
    </div>
  </div>
  </div>
}


// <BlogCard authorName="Mukesh Kumar"
// title="How an ugly single page website make $5000 a month with affiliate marketing"
// content="How an ugly single page website make $5000 a month with affiliate marketing
// How an ugly single page website make $5000 a month with affiliate marketing
// How an ugly single page website make $5000 a month with affiliate marketing"
// publishedDate="21-12 -2002"/> 