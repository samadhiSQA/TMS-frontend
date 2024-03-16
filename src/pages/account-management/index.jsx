import axios from "axios";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { FaPlus } from "react-icons/fa";
import { useNavigate } from "react-router-dom";

export default function AccountManagement (){
    const[users, setUsers] = useState([])
    const[usersLoaded , setUsersLoaded] = useState(false)
    const navigate = useNavigate()
    useEffect(() => {
        if(!usersLoaded){
            axios.get('http://localhost:8000/api/common_users').then((res) => {
                setUsers(res.data)
                setUsersLoaded(true)
            }
            ).catch((err) => {
                console.log(err)
            })
        }
    }, [usersLoaded])
    return (
        <div className="pt-[100px] flex flex-col items-center backdrop-blur-lg h-[100vh] relative">
            <button className="bg-[#FFFFFF70] hover:bg-white  w-24 h-24 rounded-full flex justify-center items-center absolute bottom-[100px] right-0 m-4 text-primary text-4xl" onClick={() => window.location.href = '/dashboard/account-form'}><FaPlus/></button>
            <h1 className="text-white pt-2 text-xl font-bold">User Management</h1>
            {
                /*
                username , name , account_type , address , phone , email , salary
                */
            }
            <table className="w-3/4  rounded-md mt-4">
                <thead>                    
                    <tr className="bg-[#FFFFFF70] mb-4" >
                        <th className="text-black  text-lg font-bold">Username</th>
                        <th className="text-black  text-lg font-bold">Name</th>
                        <th className="text-black  text-lg font-bold">Account Type</th>
                        <th className="text-black  text-lg font-bold">Address</th>
                        <th className="text-black  text-lg font-bold">Phone</th>
                        <th className="text-black  text-lg font-bold">Email</th>
                        <th className="text-black  text-lg font-bold">Salary</th>
                    </tr>
                </thead>
                <tbody>
                    {
                        users.map((user, index) => {
                            return(
                                <tr key={index} className="] relative  items-center hover:bg-white cursor-pointer" onClick={()=>{
                                    navigate('/dashboard/login-activities?username='+user.username)
                                }}>
                                    <td className="text-center bg-[#FFFFFF70]">{user.username}</td>
                                    <td className="text-center bg-[#FFFFFF70]">{user.name}</td>
                                    <td className="text-center bg-[#FFFFFF70]">{user.account_type}</td>
                                    <td className="text-center bg-[#FFFFFF70]">{user.address||"null"}</td>
                                    <td className="text-center bg-[#FFFFFF70]">{user.phone||"null"}</td>
                                    <td className="text-center bg-[#FFFFFF70]">{user.email||"null"}</td>
                                    <td className="text-center bg-[#FFFFFF70]">{user.salary||"null"}</td>
                                    <div className="absolute right-[-300] ">
                                    <button className=" bg-red-600 hover:bg-red-800 text-white w-24 rounded-full" onClick={()=>{
                                        if(confirm("Are you sure you want to delete this user?")){
                                            axios.delete(
                                                "http://localhost:8000/api/common_users?username="+user.username
                                            ).then((res) => {
                                                //toast
                                                toast.success("User deleted successfully.")
                                                //refresh
                                                setUsersLoaded(false)
                                                console.log(res)
                                            }).catch((err) => {
                                                console.log(err)
                                                //toast
                                                toast.error("An error occurred. Please try again.")
                                            })                                        
                                        }
                                    }}>Delete</button>    
                                    </div>
                                </tr>

                            )
                        })
                    }
                </tbody>
            </table>
        </div>
    )
}
