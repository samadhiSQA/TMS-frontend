import axios from "axios";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { FaPlus } from "react-icons/fa";
import { Link, useNavigate } from "react-router-dom";

export default function VehicleCategoryManagement(){
    const [categories, setCategories] = useState([]);
    const [categoryLoaded, setCategoryLoaded] = useState(false);
    const navigate = useNavigate();
    useEffect(() => {
        if(!categoryLoaded){
            axios.get('http://localhost:8000/api/vehicles/category').then((res) => {
                setCategories(res.data);
                setCategoryLoaded(true);
            }).catch((err) => {
                console.log(err);
            });
        }}
    ), [categoryLoaded];

    return(
        <div className="pt-[140px] flex flex-col items-center backdrop-blur-lg h-[100vh] relative">
            <h1 className="text-white pt-2 text-xl w-3/4 text-center  font-bold relative mb-2 ">Vehicle Category Management
            <Link className="absolute right-0 bg-primary p-2" to={"/dashboard/vehicle-manager"}>
                Manage Vehicles
            </Link></h1>
            <button className="bg-[#FFFFFF70] hover:bg-white  w-24 h-24 rounded-full flex justify-center items-center absolute bottom-[100px] right-0 m-4 text-primary text-4xl" onClick={() => window.location.href = '/dashboard/vehicle-category-form'}><FaPlus/></button>            
            {
                categories.length === 0 ? <h1 className="text-white text-lg font-bold">No categories found</h1> : 
                <table className="w-3/4  rounded-md mt-4">
                    <thead>                    
                        <tr className="bg-[#FFFFFF70] mb-4">
                            <th className="text-black  text-lg font-bold">Category</th>
                            <th className="text-black  text-lg font-bold">Description</th>
                            <th className="text-black  text-lg font-bold">Price</th>
                            <th className="text-black  text-lg font-bold w-48">Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            categories.map((category, index) => {
                                return(
                                    <tr key={index} className="] relative  items-center">
                                        <td className="text-center bg-[#FFFFFF70]">{category.name}</td>
                                        <td className="text-center bg-[#FFFFFF70]">{category.description}</td>
                                        <td className="text-center bg-[#FFFFFF70]">{category.price}</td>                                        
                                        <td className="flex flex-row w-48">
                                            <button className=" bg-red-600 hover:bg-red-800 text-white w-24 rounded-full mx-2"
                                            onClick={()=>{
                                                if(confirm("Are you sure you want to delete this category?")){
                                                    axios.delete(
                                                        "http://localhost:8000/api/vehicles/category/",{
                                                            data : {name:category.name}
                                                        }
                                                    ).then((res) => {
                                                        //toast
                                                        toast.success("Category deleted successfully!")
                                                        console.log(res);
                                                        setCategoryLoaded(false);
                                                    }).catch((err) => {
                                                        console.log(err);
                                                        toast.error("Category delete failed!")
                                                    });
                                                }
                                            }}>Delete</button>
                                            <button className=" bg-green-600 hover:bg-green-800 text-white w-24 rounded-full"
                                            onClick={
                                                ()=>{
                                                    navigate("/dashboard/vehicle-category-form",{state: {category: category}})
                                                }
                                            }>Edit</button>
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