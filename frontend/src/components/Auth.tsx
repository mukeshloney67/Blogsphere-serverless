import { ChangeEvent, useState } from "react";
import { Link, useNavigate } from "react-router-dom"
import axios from "axios"
import { BACKEND_URL } from "../Config";
import { SignupInput } from "@mukeshloney/medium-blog";

export const Auth = ({ type }: { type: "signup" | "signin" }) => {
    const navigate = useNavigate();
    const [postInputs, setPostInputs] = useState<SignupInput>({
        name: "",
        username: "",
        password: "",
    });
    const [loading, setLoading] = useState(false); // Loading state

    async function sendRequest() {
        setLoading(true); // Start loading
        try {
            const response = await axios.post(`${BACKEND_URL}/api/v1/user/${type === "signup" ? "signup" : "signin"}`, postInputs);
            const token = response.data.token;
            localStorage.setItem("token", token);
            navigate("/blogs");
        } catch (error) {
            alert("All fields required");
            console.log("Error from sendRequest in auth", error);
        } finally {
            setLoading(false); // Stop loading after request finishes
        }
    }

    return (
        <div className="h-screen flex justify-center flex-col">
            <div className="flex justify-center">
                <div className="">
                    <div className="px-10">
                        <div className="text-3xl font-bold">
                            {type === "signup" ? "Create an Account" : "Sign In"}
                        </div>
                        <div className="text-slate-500">
                            {type === "signup" ? "Already have an account?" : "Don't have an account?"}
                            <Link className="pl-2 underline" to={type === "signup" ? "/signin" : "/signup"}>
                                {type === "signup" ? "Sign In" : "Sign Up"}
                            </Link>
                        </div>
                    </div>
                    <div>
                        {type === "signup" ? (
                            <LabelledInput label="Name" placeholder="Mukesh Loney..." onChange={(e) => {
                                setPostInputs({
                                    ...postInputs,
                                    name: e.target.value,
                                })
                            }} />
                        ) : null}
                        <LabelledInput label="Username" placeholder="mukesh@gmail.com" onChange={(e) => {
                            setPostInputs({
                                ...postInputs,
                                username: e.target.value,
                            })
                        }} />
                        <LabelledInput label="Password" type="password" placeholder="********" onChange={(e) => {
                            setPostInputs({
                                ...postInputs,
                                password: e.target.value,
                            })
                        }} />
                        <button
                            onClick={sendRequest}
                            type="button"
                            className="flex justify-center items-center text-white mt-8 w-full bg-gray-800 hover:bg-gray-900 
                            focus:outline-none focus:ring-4 focus:ring-gray-300 font-medium rounded-lg text-sm
                            px-5 py-2.5 me-2 mb-2 dark:bg-gray-800 dark:hover:bg-gray-700 dark:focus:ring-gray-700 
                            dark:border-gray-700"
                            disabled={loading} // Disable button when loading
                        >
                            {loading ? (
                                <>
                                    <svg aria-hidden="true" className="w-5 h-5 mr-2 text-gray-200 animate-spin dark:text-gray-600 fill-white" viewBox="0 0 100 101" fill="none" xmlns="http://www.w3.org/2000/svg">
                                        <path d="M100 50.5C100 78.3 77.6 100.7 50 100.7C22.4 100.7 0 78.3 0 50.5C0 22.7 22.4 0.300049 50 0.300049C77.6 0.300049 100 22.7 100 50.5Z" fill="currentColor" />
                                        <path d="M93.9 39.5C96.2 38.8 97.6 36.5 96.7 34.3C92.6 24.5 85.2 16.1 76 10.8C66.8 5.4 56 2.5 44.9 3C40.7 3.2 37.5 6.9 38.3 11.1C39.1 15.3 42.7 18.3 47 18.1C55.5 17.7 63.9 20 71 24.6C78.1 29.2 83.6 36.3 86.4 44.4C87.2 46.6 89.5 47.9 91.7 47.2C94 46.5 95.3 44.2 94.6 42Z" fill="currentFill" />
                                    </svg>
                                    Loading...
                                </>
                            ) : (
                                type === "signup" ? "Sign Up" : "Sign In"
                            )}
                        </button>
                    </div>
                </div>
            </div>
        </div>
    )
}

interface LabelledInputType {
    label: string;
    placeholder: string;
    onChange: (e: ChangeEvent<HTMLInputElement>) => void;
    type?: string;
}

function LabelledInput({ label, type, placeholder, onChange }: LabelledInputType) {
    return (
        <div className="pt-2">
            <label className="block mb-2 text-sm font-semibold text-black pt-2">{label}</label>
            <input
                onChange={onChange}
                type={type || "text"}
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
                placeholder={placeholder}
                required
            />
        </div>
    )
}
