import { Appbar } from "../components/Appbar";
import axios from "axios";
import { BACKEND_URL } from "../Config";
import { useNavigate } from "react-router-dom";
import { ChangeEvent, useState } from "react";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export const Publish = () => {
    const [title, setTitle] = useState(""); 
    const [description, setDescription] = useState("");
    const navigate = useNavigate();

    const handlePublish = async () => {
        if (!title.trim()) {
            toast.error("Title is required!", { position: "top-center" });
            return;
        }

        if (!description.trim()) {
            toast.error("Description cannot be empty!", { position: "top-center" });
            return;
        }

        try {
            const response = await axios.post(`${BACKEND_URL}/api/v1/blog`, {
                title,
                content: description
            }, {
                headers: {
                    Authorization: localStorage.getItem("token")
                }
            });

            toast.success("Blog published successfully!", { position: "top-center" });
            navigate(`/blog/${response.data.id}`);
        } catch (error) {
            toast.error("Something went wrong!", { position: "top-center" });
        }
    };

    return (
        <div>
            <Appbar />
            <ToastContainer /> 
            <div className="flex justify-center w-full pt-8"> 
                <div className="max-w-screen-lg w-full">
                    <input 
                        onChange={(e) => setTitle(e.target.value)} 
                        type="text" 
                        className="w-full bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block p-2.5" 
                        placeholder="Title" 
                    />

                    <TextEditor onChange={(e) => setDescription(e.target.value)} />

                    <button 
                        onClick={handlePublish} 
                        type="submit" 
                        className="mt-4 inline-flex items-center px-5 py-2.5 text-sm font-medium text-center text-white bg-blue-700 rounded-lg focus:ring-4 focus:ring-blue-200 dark:focus:ring-blue-900 hover:bg-blue-800"
                    >
                        Publish post
                    </button>
                </div>
            </div>
        </div>
    );
};

function TextEditor({ onChange }: { onChange: (e: ChangeEvent<HTMLTextAreaElement>) => void }) {
    return (
        <div className="mt-2">
            <div className="w-full mb-4">
                <div className="flex items-center justify-between border">
                    <div className="my-2 bg-white rounded-b-lg w-full">
                        <label className="sr-only">Publish post</label>
                        <textarea 
                            onChange={onChange} 
                            id="editor" 
                            rows={8} 
                            className="focus:outline-none block w-full px-0 text-sm text-gray-800 bg-white border-0 pl-2" 
                            placeholder="Write an article..." 
                        />
                    </div>
                </div>
            </div>
        </div>
    );
}
