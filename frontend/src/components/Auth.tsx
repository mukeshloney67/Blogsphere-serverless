import { ChangeEvent, useState } from "react";
import { Link, useNavigate } from "react-router-dom"
import axios from "axios"
import { BACKEND_URL } from "../Config";
import { SignupInput } from "@mukeshloney/medium-blog";

export const Auth = ({type}: {type: "signup" | "signin"}) => {
    const navigate = useNavigate();
    const [postInputs, setPostInputs] = useState<SignupInput>({
        name: "",
        username: "",
        password: "",
    });

    async function sendRequest(){
      try {
      const response = await axios.post(`${BACKEND_URL}/api/v1/user/${type === "signup"? "signup": "signin"}`, postInputs);
      const token = response.data.token;
      localStorage.setItem("token", token);
      navigate("/blogs");
      } catch (error) {
        alert("All fields required");
        console.log("Error from sendRequest in auth", error)
      }
    }

  return (
    
    <div className="h-screen flex justify-center flex-col ">
        <div className="flex justify-center ">
        <div className="" >
            <div className="px-10">
            <div className="text-3xl font-bold ">
            Create an Account
            </div>
            <div className="text-slate-500">
                {type === "signup"? "Already have an account?": "Don't have an account"}
                <Link className="pl-2 underline" to = {type === "signup"? "/signin": "/signup"}>
                {type === "signup"? "Sign In": "Sign Up"}</Link>
            </div>
            </div>
        <div>
         {type === "signup"? <LabelledInput label = "Name" placeholder="Mukesh Loney..." onChange={(e)=>{
            setPostInputs({
                ...postInputs,
                name: e.target.value,
            })
         }}/>: null}
         <LabelledInput label = "Username" placeholder="mukesh@gmail.com" onChange={(e)=>{
            setPostInputs({
                ...postInputs,
                username: e.target.value,
            })
         }}/>
          <LabelledInput label = "Password" type= "password" placeholder="12345" onChange={(e)=>{
            setPostInputs({
                ...postInputs,
                password: e.target.value,
            })
         }}/>
         <button onClick={sendRequest} type="button" className="text-white mt-8 w-full bg-gray-800 hover:bg-gray-900 
         focus:outline-none focus:ring-4 focus:ring-gray-300 font-medium rounded-lg text-sm
          px-5 py-2.5 me-2 mb-2 dark:bg-gray-800 dark:hover:bg-gray-700 dark:focus:ring-gray-700 
          dark:border-gray-700">{type === "signup"? "Sign up " : "Sign in"}</button>
         </div>
         </div>
        </div>
    </div>
  )
}
interface LabelledInputType {
    label: string;
    placeholder: string;
    onChange: (e : ChangeEvent<HTMLInputElement>) =>void;
    type?: string;
}

function LabelledInput({label, type, placeholder, onChange}: LabelledInputType){
        return (
            <div className="pt-2">
            <label className="block mb-2 text-sm font-semibold text-black pt-2 ">{label}</label>
            <input onChange={onChange} type= {type || "text"}id="first_name" className="bg-gray-50 border border-gray-300
             text-gray-900 text-sm rounded-lg focus:ring-blue-500
              focus:border-blue-500 block w-full p-2.5 " placeholder={placeholder} required />
        </div>
        )
}