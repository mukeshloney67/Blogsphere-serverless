import { Link } from "react-router-dom"
import { useState, useEffect, useRef } from "react";

interface blogCardProps{
    id: number
    authorName: string
    title: string
    content: string
    publishedDate: string
}

export const BlogCard = ({
    id,
    authorName,
    title,
    content,
    publishedDate
}: blogCardProps) => {
  return <Link to = {`/blog/${id}`}> <div className="border-b cursor-pointer border-slate-200 p-3 pb-4 w-screen max-w-screen-lg">
    <div className="flex"> 
    <div className="flex justify-center flex-col">
    <Avatar name = {authorName}/>
    </div>
     <div className="font-extraligh pl-3 text-sm">{authorName}</div> 
     <div className="pl-3 font-thin text-sm text-slate-500">
     {publishedDate}
     </div>
    </div>
    <div className="text-2xl font-bold pt-2">
        {title}
    </div>
    <div className="text-md">
        {content.slice(0,100) + "..."}
    </div>
    <div className="text-slate-500 text-md font-extralight pt-4">
        {`${Math.ceil(content.length / 100)} minutes`}
    </div>
  </div>
  </Link>
}

export function Avatar({ name, size = 30 }: { name: string; size?: number }) {
    const [menuOpen, setMenuOpen] = useState(false);
    const menuRef = useRef<HTMLDivElement>(null);

    const handleLogout = () => {
        localStorage.removeItem("token");
        window.location.href = "/signin"; // Redirect after logout
    };

    // Close dropdown when clicking outside
    useEffect(() => {
        function handleClickOutside(event: MouseEvent) {
            if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
                setMenuOpen(false);
            }
        }
        document.addEventListener("mousedown", handleClickOutside);
        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, []);

    return (
        <div className="relative inline-block" ref={menuRef}>
            <div
                onClick={() => setMenuOpen(!menuOpen)}
                className="cursor-pointer relative inline-flex items-center justify-center overflow-hidden 
                bg-gray-100 rounded-full dark:bg-gray-600"
                style={{ width: size, height: size }}
            >
                <span className="text-xs text-gray-600 dark:text-gray-300">{name[0]}</span>
            </div>

            {menuOpen && (
                <div className="absolute right-0 mt-2 w-32 bg-black rounded-md shadow-lg border-b">
                    <button
                        onClick={handleLogout}
                        className="block w-full px-4 py-2 text-sm text-white hover:rounded-md hover:bg-gray-600"
                    >
                        Logout
                    </button>
                </div>
            )}
        </div>
    );
}
  
  
