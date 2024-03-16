import axios from "axios";
import { useEffect, useState } from "react";

export default function DriverDashboard(){
    //get user
    const userString = localStorage.getItem("user");
    const user = JSON.parse(userString);
    const [countObject, setCountObject] = useState(null);
    useEffect(() => {
        axios.get("http://localhost:8000/api/common_users/get_driver_dash",{
            params: {
                username: user.username
            }
        }).then((res) => {
            setCountObject(res.data)
        }).catch((err) => {
            console.log(err)
        })
    }, [])
    return(
        <div className="min-w-full min-h-[100vh] pt-[140px] backdrop-blur-lg flex flex-wrap justify-center items-center">
            {
                /*
                bookings
                leaves
                advances

                */
            }
            <div className="w-60 h-60 rounded-md hover:bg-white bg-[#FFFFFF70] flex flex-col justify-center items-center cursor-pointer m-5">
                <span className="text-[100px]">{countObject?.bookings||0}</span>
                <h1 className=" text-xl font-bold pt-6">Total Bookings</h1>
            </div>
            <div className="w-60 h-60 rounded-md hover:bg-white bg-[#FFFFFF70] flex flex-col justify-center items-center cursor-pointer m-5">
                <span className="text-[100px]">{countObject?.leaves||0}</span>
                <h1 className=" text-xl font-bold pt-6">Total Leaves</h1>
            </div>
            <div className="w-60 h-60 rounded-md hover:bg-white bg-[#FFFFFF70] flex flex-col justify-center items-center cursor-pointer m-5">
                <span className="text-[100px]">{countObject?.advances||0}</span>
                <h1 className=" text-xl font-bold pt-6">Total Advances</h1>
            </div>
            
        </div>
    )
}