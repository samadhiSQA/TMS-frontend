import axios from "axios";
import { useState } from "react";
import toast from "react-hot-toast";
import { useLocation, useNavigate } from "react-router-dom";

export default function VehicleCategoryForm() {
    const location = useLocation();
    const category = location.state?.category
    const [categoryName, setCategoryName] = useState(category?.name||'');
    const [description, setDescription] = useState(category?.description||'');
    const [price, setPrice] = useState(category?.price||0);
    const navigate = useNavigate();
    
    const handleSubmit = (e) => {
        e.preventDefault();
        // Handle form submission here
        const formData = {
            name : categoryName,
            description,
            price
        };
        //get category
        if(!category){
            console.log(formData); // For demonstration, you can replace this with your submission logic
            axios.post('http://localhost:8000/api/vehicles/category', formData).then((res) => {
                console.log(res);
                toast.success("Category added successfully.");
                navigate('/dashboard/vehicle-category-management');
            }
            ).catch((err) => {
                console.log(err);
                toast.error("Failed to add category.");
            });
        }else{
            axios.put('http://localhost:8000/api/vehicles/category', formData).then((res) => {
                console.log(res);
                toast.success("Category updated successfully.");
                navigate('/dashboard/vehicle-category-management');
            }
            ).catch((err) => {
                console.log(err);
                toast.error("Failed to update category.");
            });
        }
    };

    return (
        <div className="pt-[100px] flex flex-col items-center backdrop-blur-lg h-[100vh] relative">
            <h1 className="text-white pt-2 text-xl w-3/4 text-center  font-bold relative mb-2">{
                !category?"Add category":"Update category"
            }           
            </h1>
            <form className="w-[40%] flex flex-col items-center" onSubmit={handleSubmit}>
                <div className="flex flex-col w-full mb-4">
                    <label htmlFor="categoryName" className="text-black text-lg mb-1">Category Name</label>
                    <input value={categoryName} disabled={category!=null} type="text" id="categoryName" placeholder="Category Name" className="bg-[#FFFFFF70] w-full rounded-md p-2" onChange={(e) => setCategoryName(e.target.value)} />
                </div>
                <div className="flex flex-col w-full mb-4">
                    <label htmlFor="description" className="text-black text-lg mb-1">Description</label>
                    <input value={description} type="text" id="description" placeholder="Description" className="bg-[#FFFFFF70] w-full rounded-md p-2" onChange={(e) => setDescription(e.target.value)} />
                </div>
                <div className="flex flex-col w-full mb-4">
                    <label htmlFor="price" className="text-black text-lg mb-1">Price(1KM)</label>
                    <input value={price} type="number" id="price" placeholder="Price" className="bg-[#FFFFFF70] w-full rounded-md p-2" onChange={(e) => setPrice(e.target.value)} />
                </div>
                <button type="submit" className="bg-primary hover:bg-secondary text-white py-2 rounded-md my-2 w-full">Submit</button>
            </form>
        </div>
    );
}
