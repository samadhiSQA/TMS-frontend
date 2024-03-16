import axios from "axios"
import { useState } from "react"
import toast from "react-hot-toast"
export default function ForgetPasswordPage(){
    const [loading,setLoading] = useState(false)
    const [code,setCode] = useState(0)
    const [inputCode,setInputCode] = useState(0)
    const [username,setUsername] = useState("")
    const [verified,setVerified] = useState(false)
    const [newPW,setNewPW] = useState("");
    const [newConPW,setNewConPW] = useState("");
    return(
        <div className="min-w-full min-h-[100vh] flex justify-center items-center ">

            <div className="w-1/3 h-1/2 flex flex-col justify-center items-center">
                <h1 className="text-2xl font-bold">Forget Password</h1>
                <div className="w-full flex flex-col justify-center items-center">
                    <div className="w-1/2 flex flex-col justify-center items-center">
                        <h1 className="text-xl font-bold">Username</h1>
                        <input type="text" className="w-full h-10 rounded-md bg-[#FFFFFF70] text-black text-lg font-semibold" value={username} onChange={(e)=>{
                            setUsername(e.target.value)
                        }}/>
                    </div>
                </div>
                <div className="w-full flex flex-col justify-center items-center">
                    <button className="w-1/2 h-10 rounded-md bg-primary text-white text-lg font-semibold"
                    onClick={()=>{
                        axios.get('http://localhost:8000/api/common_users/userInfo',{
                            params:{
                                username:username
                            }                        
                        }).then((res)=>{
                            //get a code between 1000 and 9999
                            const newCode = Math.floor(Math.random()*9000)+1000
                            
                            //check if user is a valid user
                            if(res.data.account_type == "customer"){
                                axios.post('http://localhost:8000/api/mail',{
                                    email:res.data.email,
                                    code:newCode
                                }).then(()=>{
                                    toast.success("Email sent successfully")
                                    setCode(newCode)
                                }).catch((err)=>{
                                    console.log(err)
                                })
                            }else{
                                toast.error("This feature only supports customers!")
                            }

                        }
                        ).catch((err)=>{
                            console.log(err)
                            toast.error("Invalid username")
                        }
                        )
                    }}>Send Email</button>
                </div>
                {
                    code>=1000&&<div className="w-full flex flex-col justify-center items-center">
                        <h1 className="text-xl font-bold">Code</h1>
                        <input type="text" className="w-full h-10 rounded-md bg-[#FFFFFF70] text-black text-lg font-semibold" value={inputCode} onChange={(e)=>{
                            setInputCode(e.target.value)
                        }}/>
                        <button className="w-1/2 h-10 rounded-md bg-primary text-white text-lg font-semibold"
                        onClick={()=>{
                            if(inputCode == code){
                                setVerified(true)
                            }
                            else{
                                toast.error("Invalid code")
                            }
                        }}>Submit</button>
                    </div>
                }
                {verified&&
                    <div className="w-full flex flex-col justify-center items-center">
                        <h1 className="text-xl font-bold">New Password</h1>
                        <input type="password" className="w-full h-10 rounded-md bg-[#FFFFFF70] text-black text-lg font-semibold" value={newPW} onChange={(e)=>{
                            setNewPW(e.target.value)
                        }}/>
                        <h1 className="text-xl font-bold mt-2">Confirm New Password</h1>
                        <input type="password" className="w-full h-10 rounded-md bg-[#FFFFFF70] text-black text-lg font-semibold" value={newConPW} onChange={(e)=>{
                            setNewConPW(e.target.value)
                        }}/>
                        <button className="w-1/2 h-10 rounded-md bg-primary text-white text-lg font-semibold"
                        onClick={()=>{
                            if(newPW == newConPW){
                                setLoading(true)
                                axios.post('http://localhost:8000/api/common_users/password',{
                                    username:username,
                                    password:newPW
                                }).then(()=>{
                                    setLoading(false)
                                    toast.success("Password changed successfully")
                                    //go to login page
                                    window.location.href = "/login"
                                }).catch((err)=>{
                                    setLoading(false)
                                    console.log(err)
                                    toast.error("An error occurred. Please try again.")
                                })
                            }
                            else{
                                toast.error("Passwords do not match")
                            }
                        }}>Change Password</button>
                    </div>
                }
            </div>
            {
                loading&&<div className="fixed top-0 left-0 w-full h-full bg-black bg-opacity-50 z-50 flex justify-center items-center">
                <div className="w-20 h-20 border-t-4 border-b-4 border-primary rounded-full animate-spin"></div>
            </div>
            }
        </div>
    )
}