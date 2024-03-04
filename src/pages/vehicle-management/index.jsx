import axios from "axios";
import { useEffect, useState } from "react"
import toast from "react-hot-toast";
import {FaPlus} from 'react-icons/fa'
import { useNavigate } from "react-router-dom";
export default function VehicleManagement() {
    //return if no user element in localstorage
    if(localStorage.getItem('user') === null)
        window.location.href = '/login'
    //return to login page if user is not admin
    if(JSON.parse(localStorage.getItem('user').toString()).account_type !== 'admin')
        window.location.href = '/login'
    const [vehicles, setVehicles] = useState([]);
    const [vehiclesLoaded, setVehiclesLoaded] = useState(false);
    const navigate = useNavigate();
    useEffect(() => {
        if(!vehiclesLoaded){
            axios.get('http://localhost:8000/api/vehicles').then((res) => {
                setVehicles(res.data);
                setVehiclesLoaded(true);                
            }).catch((err) => {
                console.log(err);
            }            )
        }}, [vehiclesLoaded]);
    return(
        <div className="pt-[100px] flex flex-col items-center backdrop-blur-lg h-[100vh] relative">
            <button className="bg-[#FFFFFF70] hover:bg-white  w-24 h-24 rounded-full flex justify-center items-center absolute bottom-[100px] right-0 m-4 text-primary text-4xl" onClick={() => window.location.href = '/dashboard/vehicle-form'}><FaPlus/></button>
            <h1 className="text-white pt-2 text-xl font-bold">Vehicle Management</h1>
            {
                vehicles.length === 0 ? <h1 className="text-white text-lg font-bold">No vehicles found</h1> : 
                <table className="w-3/4  rounded-md mt-4">
                    <thead>                    
                        <tr className="bg-[#FFFFFF70] mb-4">
                            <th className="text-black  text-lg font-bold">Image</th>
                            <th className="text-black  text-lg font-bold">Registration</th>
                            <th className="text-black  text-lg font-bold">Category</th>
                            <th className="text-black  text-lg font-bold">Make</th>
                            <th className="text-black  text-lg font-bold">Model</th>
                            <th className="text-black  text-lg font-bold">Milage</th>
                            <th className="text-black  text-lg font-bold">Description</th>
                            <th className="text-black  text-lg font-bold">Year of make</th>
                            <th className="text-black  text-lg font-bold">Year of registration</th>                            
                            <th className="text-black text-lg font-bold">Type</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            vehicles.map((vehicle, index) => {
                                return(
                                    <tr key={index} className="] relative  items-center">
                                        <td className="text-center bg-[#FFFFFF70]"><img src={vehicle.image} alt="vehicle" className="w-20 h-20" /></td>
                                        <td className="text-center bg-[#FFFFFF70]">{vehicle.reg_no}</td>
                                        <td className="text-center bg-[#FFFFFF70]">{vehicle.category}</td>
                                        <td className="text-center bg-[#FFFFFF70]">{vehicle.make}</td>
                                        <td className="text-center bg-[#FFFFFF70]">{vehicle.model}</td>
                                        <td className="text-center bg-[#FFFFFF70]">{vehicle.milage}</td>                                        
                                        <td className="text-center max-w-[200px] bg-[#FFFFFF70]">{vehicle.description}</td>
                                        <td className="text-center bg-[#FFFFFF70]">{vehicle.yom}</td>
                                        <td className="text-center bg-[#FFFFFF70]">{vehicle.yor}</td>                              
                                        <td className="bg-[#FFFFFF70]">{vehicle.type}</td>
                                        <div className="h-full flex flex-col absolute justify-evenly items-center p-2">
                                            <button className=" bg-red-600 hover:bg-red-800 text-white w-24 rounded-full" 
                                            onClick={()=>{
                                                //validate
                                                if(!confirm('Are you sure you want to delete this vehicle?')){
                                                    return
                                                }
                                                axios.delete('http://localhost:8000/api/vehicles/',{
                                                    data: {reg_no: vehicle.reg_no}                                                
                                                }).then((res) => {
                                                    console.log(res);
                                                    toast.success("Vehicle deleted successfully");
                                                    setVehiclesLoaded(false);
                                                }).catch((err) => {
                                                    console.log(err);
                                                })
                                            }}>delete</button>
                                            <button className=" bg-green-600 hover:bg-green- text-white w-24 rounded-full" 
                                            onClick={()=>{
                                                navigate('/dashboard/vehicle-form', {state: {vehicle: vehicle}})
                                            }}>edit</button>
                                        </div>
                                        
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