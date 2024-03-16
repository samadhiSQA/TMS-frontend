import axios from "axios";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { FaPlus } from "react-icons/fa";
import { Link, useLocation, useNavigate } from "react-router-dom";

export default function VehicleRepairManagement(){
    const [repairs, setrepairs] = useState([]);
    const [categoryLoaded, setCategoryLoaded] = useState(false);
    const location = useLocation();
    const vehicle = location.state.vehicle;
    const navigate = useNavigate();
    useEffect(() => {
        console.log(vehicle.reg_no);
        if(!categoryLoaded){
            axios.get('http://localhost:8000/api/vehicle_repairs',{params:{
                "vehicle_reg_no" : vehicle.reg_no
            }}).then((res) => {
                console.log(res.data);
                setrepairs(res.data);
                console.log("loaded")
                setCategoryLoaded(true);
            }).catch((err) => {
                console.log(err);
            });
        }}
    ), [categoryLoaded];

    return(
        <div className="pt-[140px] flex flex-col items-center backdrop-blur-lg h-[100vh] relative">
            <h1 className="text-white pt-2 text-xl w-3/4 text-center  font-bold relative mb-2 ">Vehicle Repair History
            <Link className="absolute right-0 bg-primary p-2" to={"/dashboard/vehicle-manager"}>
                Manage Vehicles
            </Link></h1>
            <button className="bg-[#FFFFFF70] hover:bg-white  w-24 h-24 rounded-full flex justify-center items-center absolute bottom-[100px] right-0 m-4 text-primary text-4xl" onClick={() => {navigate(
                '/dashboard/vehicle-repair-form', {state: {vehicle: vehicle}}
            )}}><FaPlus/></button>            
            {
                repairs.length === 0 ? <h1 className="text-white text-lg font-bold">No repairs found</h1> : 
                <table className="w-3/4  rounded-md mt-4 border-spacing-1">
                    <thead>  
                        {/**
                         *  'vehicle_reg_no'
                            'monitored_by'
                            'title'
                            'description'
                            'cost'
                            'date'
                         */}                  
                        <tr className="bg-[#FFFFFF70] mb-4 border border-primary">
                            <th className="text-black  text-lg font-bold">Monitored by</th>
                            <th className="text-black  text-lg font-bold">Title</th>
                            <th className="text-black  text-lg font-bold">Description</th>
                            <th className="text-black  text-lg font-bold">Cost</th>
                            <th className="text-black  text-lg font-bold">Date</th>
                            <th className="text-black  text-lg font-bold ">Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            repairs.map((category, index) => {
                                return(
                                    <tr key={index} className="] relative  items-center border border-primary">
                                        <td className="text-center bg-[#FFFFFF70]">{category.monitored_by}</td>
                                        <td className="text-center bg-[#FFFFFF70]">{category.title}</td>
                                        <td className="text-center bg-[#FFFFFF70] max-w-[200px]">{category.description}</td>
                                        <td className="text-center bg-[#FFFFFF70]">{category.cost}</td>
                                        <td className="text-center bg-[#FFFFFF70]">{category.date}</td>                                        
                                        <td className="flex    relative justify-center items-center">
                                            <button className=" h-full bg-green-600 hover:bg-red-800 text-white w-24 rounded-full "
                                            onClick={()=>{
                                                
                                                navigate('/dashboard/vehicle-repair-form', {state: {vehicle: vehicle, repair: repairs[index]}})
                                                
                                            }}
                                            >update</button>
                                        </td>
                                    </tr>

                                )
                            })
                        }
                    </tbody>
                </table>
            }
        </div>
    )
}