import axios from "axios";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

export default function AdminHomePage() {
    const [countObject, setCountObject] = useState(null)
    useEffect(() => {
        axios.get("http://localhost:8000/api/common_users/get_admin_dash").then((res) => {
            setCountObject(res.data)
        }).catch((err) => {
            console.log(err)
        })
    }, [])
    return(
        <div className="min-w-full min-h-[100vh] pt-[140px] backdrop-blur-lg flex flex-wrap justify-center items-center">
            <Link to={"/dashboard/vehicle-manager"} className="w-60 h-60 rounded-md hover:bg-white bg-[#FFFFFF70] flex flex-col justify-center items-center cursor-pointer m-5">
                <span className="text-[100px]">{countObject?.vehicles||0}</span>
                <h1 className=" text-xl font-bold pt-6">Total Vehicles</h1>
            </Link>
            <div to={"/dashboard/account-management"} className="w-60 h-60 rounded-md hover:bg-white bg-[#FFFFFF70] flex flex-col justify-center items-center cursor-pointer m-5">
            <span className="text-[100px]">{countObject?.drivers||0}</span>
                <h1 className=" text-xl font-bold pt-6">Total Drivers</h1>
            </div>
            <div to={"/dashboard/account-management"} className="w-60 h-60 rounded-md hover:bg-white bg-[#FFFFFF70] flex flex-col justify-center items-center cursor-pointer m-5">
            <span className="text-[100px]">{countObject?.customers||0}</span>
                <h1 className=" text-xl font-bold pt-6">Total Customers</h1>
            </div>
            <div to={"/dashboard/account-management"} className="w-60 h-60 rounded-md hover:bg-white bg-[#FFFFFF70] flex flex-col justify-center items-center cursor-pointer m-5">
            <span className="text-[100px]">{countObject?.bookings||0}</span>
                <h1 className=" text-xl font-bold pt-6">Total Bookings</h1>
            </div>

        </div>
    )
}