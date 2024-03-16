import axios from "axios";
import { useState } from "react";
import toast from "react-hot-toast";
import { FaEdit } from "react-icons/fa";

export default function AccountInfo(){
    const[nameChangeForm, setNameChangeForm] = useState(false)
    const userString = localStorage.getItem('user');
    if(userString === null){
        window.location.href = '/login'
    }
    const user = JSON.parse(localStorage.getItem('user').toString());
    return (
        <>
        <div className="pt-[140px] w-full h-full flex flex-col justify-center items-center ">
        
            <h1 className="text-white text-xl font-bold">My account information</h1>
            <div className="w-3/4 bg-[#FFFFFF70] rounded-md mt-4 p-4 flex flex-col justify-center items-center relative">
            <FaEdit onClick={()=>{setNameChangeForm(true)}} className="absolute right-4 top-4 cursor-pointer ml-4 hover:text-primary"/>
                <h1 className="text-black text-lg font-bold">Username: {user.username}</h1>
                <h1 className="text-black text-lg font-bold flex flex-row justify-center items-center">Name: {user.name} </h1>
                <h1 className="text-black text-lg font-bold">Gender: {user.gender}</h1>
                <h1 className="text-black text-lg font-bold">Account type: {user.account_type}</h1>
                {(user.account_type=="customer")&&
                    <>
                        <h1 className="text-black text-lg font-bold">Email: {user.email}</h1>
                        <h1 className="text-black text-lg font-bold">Phone: {user.phone}</h1>
                    </>
                }
                {(user.account_type=="driver")&&
                    <>
                        <h1 className="text-black text-lg font-bold">Salary: {user.salary}</h1>
                    </>
                }                
            </div>
            
        </div>
        {
            nameChangeForm&&
            <div className="fixed min-w-[100%] top-0 min-h-[100%] bg-black  flex justify-center items-center">
                <form className="w-3/4 bg-[#FFFFFF70] rounded-md mt-4 p-4 flex flex-col justify-center items-center" onSubmit={
                    (e)=>{
                        e.preventDefault()
                        const data = new FormData(e.target)
                        const name = data.get('name')
                        const gender = data.get('gender')
                        const email = data.get('email')
                        const phone = data.get('phone')
                        var newUser = {}
                        if(user.account_type=="customer"){
                            newUser = {
                                    username: user.username,
                                    name: name,
                                    gender : gender,
                                    email: email,
                                    phone: phone
                                }
                        }else{
                            newUser = {
                                    username: user.username,
                                    name: name,                                    
                                    gender : gender
                            }
                        }

                        axios.put('http://localhost:8000/api/common_users',newUser).then(()=>{
                            
                                toast.success('Info changed successfully')
                                //apply changes to current user
                                user.name = name
                                user.gender = gender
                                user.email = email
                                user.phone = phone
                                localStorage.setItem('user',JSON.stringify(user))
                                window.location.reload()                                                                                                
                                                       
                        }).catch(error=>{
                            console.log(error)
                        })
                    }
                
                }>
                    <h1 className="text-black text-lg font-bold">Change info</h1>
                    <label className="text-black text-lg font-bold w-1/2">New name:</label>
                    <input name="name" defaultValue={user.name} type="text" className="w-1/2 rounded-md p-2 mt-2" placeholder="Enter new name"/>
                    <label className="text-black text-lg font-bold w-1/2">Gender:</label>
                    <select defaultValue={user.gender} name="gender" className="w-1/2 rounded-md p-2 mt-2">
                        <option value={"female"}>female</option>
                        <option value={"male"}>male</option>
                    </select>
                    {
                        (user.account_type=="customer")&&
                        <>
                            <label className="text-black text-lg font-bold w-1/2">Email:</label>
                            <input name="email" defaultValue={user.email} type="email" className="w-1/2 rounded-md p-2 mt-2" placeholder="Enter new email"/>
                            <label className="text-black text-lg font-bold w-1/2">Phone:</label>
                            <input name="phone" defaultValue={user.phone} type="text" className="w-1/2 rounded-md p-2 mt-2" placeholder="Enter new phone"/>
                        </>
                    }
                    <div className="flex flex-row justify-center items-center">
                        <button className="bg-primary text-white rounded-md p-2 mt-2 mx-2">Change</button>
                        <button className="bg-red-600 text-white rounded-md p-2 mt-2 mx-2" onClick={()=>{setNameChangeForm(false)}}>Cancel</button>
                    </div>
                </form>
            </div>
        }
        </>
    )
}