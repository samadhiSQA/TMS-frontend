import axios from "axios";
import { useEffect, useRef, useState } from "react";
import toast from "react-hot-toast";
import './index.css'
import { FaArrowLeft, FaArrowRight } from "react-icons/fa";
export default function CustomerBookingForm() {
    //validate and get user
    const userString = localStorage.getItem('user');
    if(userString === null){
        window.location.href = '/login';
    }
    const user = JSON.parse(userString);
    const [availableDrivers, setAvailableDrivers] = useState([]);
    const [availableVehicles, setAvailableVehicles] = useState([]);
   
    const [selectedDriver, setSelectedDriver] = useState('');
    const [selectedVehicle, setSelectedVehicle] = useState('');
    const [categoryList, setCategoryList] = useState([]);
    const [categoriesLoaded, setCategoriesLoaded] = useState(false);
    const [selectedCategory, setSelectedCategory] = useState('');
    const [infoLoaded, setInfoLoaded] = useState(false);
    const [remarks, setRemarks] = useState('');
    const [distance, setDistance] = useState(1);
    const [cost, setCost] = useState(0);
    const [date, setDate] = useState('');
    const vehicleDiv = useRef();

    //scroll smoothly left right funtion for vehicle div
    function scrollLeft(){
        vehicleDiv.current.scrollTo(
            {
                left: vehicleDiv.current.scrollLeft - 400,
                behavior: 'smooth'
            }
        )
    }
    function scrollRight(){
        
        vehicleDiv.current.scrollTo(
            {
                left: vehicleDiv.current.scrollLeft + 400,
                behavior: 'smooth'
            }
        )
    }

 

    const [loading, setLoading] = useState(false);
    useEffect(() => {
        if(!categoriesLoaded){
            axios.get('http://localhost:8000/api/vehicles/category').then((res) => {
            setCategoryList(res.data);
            setSelectedCategory(res.data[0].name);
            setCategoriesLoaded(true);
        }).catch((err) => {
            console.log(err);
        });
        }
        
    }
    ,[categoriesLoaded]);
    function loadDriversAndVehicles(){
        setInfoLoaded(false);
        setSelectedVehicle('');
        setSelectedDriver('');
        if(date === ''){
            toast.error(
                "Please select a date",
            )

            return;
        }
        setLoading(true);
        axios.get('http://localhost:8000/api/bookings/available_drivers',{
            params : {
                "date" : date
            }
        
        }).then((res) => {
            if(res.data.length === 0){
                toast.error(
                    "No drivers available on selected date",
                )
                setAvailableDrivers([]);
                setLoading(false);
                return;
            }
            setAvailableDrivers(res.data);
            setSelectedDriver(res.data[0].username);
            if(selectedCategory != ''){
                axios.get('http://localhost:8000/api/bookings/available_vehicles',{
                    params : {
                        "date" : date,
                        "category" : selectedCategory
                    }
                }).then((res) => {
                    console.log(res.data);
                    if(res.data.length === 0){
                        toast.error(
                            "No vehicles available on selected date",
                        )
                        setAvailableVehicles([]);
                        setLoading(false);
                        return;
                    }
                    setAvailableVehicles(res.data);
                    setSelectedVehicle(res.data[0].reg_no);
                    setInfoLoaded(true);
                    
                    setLoading(false);
                }).catch((err) => {
                    console.log(err);
                });
            }else{
                setLoading(false);
                setAvailableVehicles([]);
            }
        }).catch((err) => {
            console.log(err);
        });
    }

    return(
        <>
            <div className="min-w-full min-h-[100vh] pt-[140px] backdrop-blur-lg flex flex-col flex-wrap  items-center">
                <h1 className="text-3xl font-bold text-white">Customer Booking Form</h1>
                <div className="flex flex-col w-1/2">
                    <label className="text-white">Select Date</label>
                    <input type="date" className="w-full p-2 rounded-md" onChange={(e) => setDate(e.target.value)}/>
                    <label className="text-white">Select Category</label>
                    <select className="w-full p-2 rounded-md" value={selectedCategory} onChange={(e) => setSelectedCategory(e.target.value)}>
                        {
                            categoryList.map((category , index) => {
                                return <option key={index} value={category.name}>{category.name}</option>
                            })
                        }
                    </select>
                    <button className="w-full p-2 rounded-md bg-primary mt-4 text-white" onClick={loadDriversAndVehicles}>Load Drivers and Vehicles</button>
                    {(infoLoaded)&&<div className="flex flex-col">
                        <label className="text-white">Select Driver</label>
                        <select className="w-full p-2 rounded-md" value={selectedDriver} onChange={(e) => {
                            console.log(e.target.value);
                            setSelectedDriver(e.target.value)
                            }}>
                            {
                                availableDrivers.map((driver , index) => {
                                    return <option key={index} value={driver.username} >{driver.name}</option>
                                })
                                
                            }
                        </select>
                        <label className="text-white">Select Vehicle</label>
                        <div className="max-w-full relative flex justify-center items-center ">
                            <button className="absolute  left-0 bg-primary text-white p-2 rounded-full" onClick={scrollLeft}><FaArrowLeft/></button>
                            <div className="max-w-full p-2 rounded-md flex flex-row overflow-x-scroll no-scroll-bar  " ref={vehicleDiv} onChange={(e) => setSelectedVehicle(e.target.value)}>
                                
                
                                {
                                    
                                    availableVehicles.map((vehicle , index) => {
                                        return <div key={index} value={vehicle.reg_no} className={`min-w-80 mx-2  flex flex-col ${selectedVehicle==vehicle.reg_no&&"rounded-2xl border-8 border-primary"}`} onClick={()=>{
                                            setSelectedVehicle(vehicle.reg_no);
                                        }}>
                                            <img src={vehicle.image} className="w-80 h-80  object-cover object-center rounded-md" />
                                            <p className="text-white text-center">{vehicle.reg_no}</p>  
                                            <span className="text-white text-center">{vehicle.make}{" "}{vehicle.model}</span>
                                            <p className="text-white text-center w-full text-wrap">{vehicle.description}</p>                           
                                        </div>
                                    })
                                }
                                
                            </div>
                            <button className="absolute  right-0 bg-primary text-white p-2 rounded-full" onClick={scrollRight}><FaArrowRight/></button>
                        </div>

                    </div>}
                </div>
                
                {(infoLoaded)&&<><div className="flex flex-row w-1/2 justify-around">
                    <div className="flex flex-col w-[200px]">
                        <label className="text-white" >Distance in Kilometers</label>
                        <input type="number" className="w-full p-2 rounded-md" value={distance} 
                        onChange={
                            (e)=>{
                                setDistance(e.target.value);
                                
                                //get selected category from the list
                                const selectedCategoryInfo = categoryList.find((category) => category.name === selectedCategory);
                                //get the distance from the selected category                               
                                setCost(distance * selectedCategoryInfo.price);
                                //calculate the cost
                                
                            }
                        }/>
                    </div>
                    {/**cost display */}
                    <div className="flex flex-col w-[200px]">
                        <label className="text-white font-bold">Cost</label>
                        <input type="text" value={"Rs "+cost.toFixed(2)} className="w-full p-2 rounded-md" />
                    </div>
                </div>
                
                <div className="flex flex-col w-1/2">
                    <label className="text-white">Special Notes for booking</label>
                    <textarea value={remarks} onChange={(e)=>setRemarks(e.target.value)} className="w-full p-2 rounded-md" />
                </div></>}
                {
                    (selectedVehicle!=''&&selectedDriver!='') ? <button className="w-1/2 p-2 rounded-md bg-primary mt-4 text-white" onClick={() => {
                        setLoading(true);
                        //validate date is after today
                        const today = new Date();
                        const selected = new Date(date);

                        const currentCost =   categoryList.find((category) => category.name === selectedCategory).price * distance;
                        if(currentCost != cost){
                            setLoading(false);
                            setCost(currentCost)
                            toast.error(
                                "Cost is incorrect please resubmit the form",
                            )
                            return;
                        }

                        if(selected<today){
                            setLoading(false);
                            toast.error(
                                "Selected date should be after today",
                            )
                            return;
                        }
                        //revalidate the cost and stop loading if incorrect
                        
                        axios.post('http://localhost:8000/api/bookings',{
                            username: user.username,
                            driver_username : selectedDriver,
                            vehicle_reg_no : selectedVehicle,
                            distance : distance,
                            date : date,
                            cost : cost,
                            payment_status : 'pending',
                            remarks : remarks
                        }).then(() => {
                            setLoading(false);
                            toast.success(
                                "Booking successful",
                            )
                        }).catch((err) => {
                            setLoading(false);
                            console.log(err);
                            toast.error(
                                "Booking failed",
                            )
                        });
                    }
                    }>Book</button> : <></>

                }

            </div>
            {
                loading ? <div className="fixed top-0 left-0 w-full h-full bg-black bg-opacity-50 z-50 flex justify-center items-center">
                    <div className="w-20 h-20 border-t-4 border-b-4 border-primary rounded-full animate-spin"></div>
                </div> : <></>
            }
        </>
    )
}