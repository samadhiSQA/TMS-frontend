import axios from "axios";
import {  useState } from "react";
import toast from "react-hot-toast";
import { useLocation, useNavigate } from "react-router-dom";
import firebase from 'firebase/compat/app'; // Import the compat version for now
import 'firebase/compat/storage'; // Import the compat version for now

export default function VehicleForm() {
    const location = useLocation();
    const navigate = useNavigate();
    const vehicle = location.state?.vehicle;
    const repair = location.state?.repair;
    const userString = localStorage.getItem("user");
    const user = JSON.parse(userString);
    //navigate to login page if user is not logged in
    if (!user) {
        navigate("/login");
    }
    //make a toast and go to login page if user is not admin
    if (user.account_type !== "admin") {
        toast.error("You are not authorized to view this page!");
        navigate("/login");
    }
    const [vehicleRegNo, setVehicleRegNo] = useState(vehicle?.vehicle_reg_no || vehicle.reg_no);
    const [monitoredBy, setMonitoredBy] = useState(vehicle?.monitored_by || user.username);
    const [title, setTitle] = useState(repair?.title || "");
    const [description, setDescription] = useState(repair?.description || "");
    const [cost, setCost] = useState(repair?.cost || "");
    const [date, setDate] = useState(repair?.date || "");
    const [billImage, setBillImage] = useState(null);
    const existingBillImageUrl = repair?.bill_image || null;
    const firebaseConfig = {
        apiKey: "AIzaSyD-9fTVA345Q3J9Mrym_me-Omi1mYBS1uw",
        authDomain: "offer-me-f2528.firebaseapp.com",
        projectId: "offer-me-f2528",
        storageBucket: "offer-me-f2528.appspot.com",
        messagingSenderId: "1065024084271",
        appId: "1:1065024084271:web:46c417382749633986e9da",
        measurementId: "G-XDMCBMMFXW"
    };
      
    firebase.initializeApp(firebaseConfig);

    const handleVehicleRegNoChange = (e) => {
        setVehicleRegNo(e.target.value);
    };

    const handleMonitoredByChange = (e) => {
        setMonitoredBy(e.target.value);
    };

    const handleTitleChange = (e) => {
        setTitle(e.target.value);
    };

    const handleDescriptionChange = (e) => {
        setDescription(e.target.value);
    };

    const handleCostChange = (e) => {
        setCost(e.target.value);
    };

    const handleDateChange = (e) => {
        setDate(e.target.value);
    };

    const handleBillImageChange = (e) => {
        setBillImage(e.target.files[0]);
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        if (!billImage && !existingBillImageUrl) {
            toast.error("Please add a bill image!");
            return;
        }
        
        if(billImage&&!existingBillImageUrl){
            const storage = firebase.storage();
            const imageRef = storage.ref().child(`billImages/${billImage.name}`);
            toast('Wait for image upload!', { icon: '🌐' });
            imageRef.put(billImage)
                .then((snapshot) => {
                    console.log("Image uploaded successfully");
                    toast.success("Image uploaded successfully");
                    return snapshot.ref.getDownloadURL();
                })
                .then((downloadURL) => {
                    console.log("Download URL:", downloadURL);
                    const formData = {
                        vehicle_reg_no: vehicleRegNo,
                        monitored_by: monitoredBy,
                        title: title,
                        description: description,
                        cost: cost,
                        date: date,
                        bill_image: downloadURL
                    };
                    console.log(formData);
                    // Perform API call to submit the form data
                    axios.post("http://localhost:8000/api/vehicle_repairs", formData).then((res) => {
                        console.log(res);
                        toast.success("Vehicle repair added successfully.");
                        navigate('/dashboard/vehicle-repair-management' ,{state: {vehicle: vehicle}});
                    }
                    ).catch((err) => {
                        console.log(err);
                        toast.error(err.response.data.error);
                    });
                })
                .catch((error) => {
                    console.log(error);
                });
            }else{
                if(!billImage&&existingBillImageUrl){
                    const formData = {
                        id: repair.id,
                        vehicle_reg_no: vehicleRegNo,
                        monitored_by: monitoredBy,
                        title: title,
                        description: description,
                        cost: cost,
                        date: date,
                        bill_image: existingBillImageUrl
                    };
                    console.log(formData);
                    // Perform API call to submit the form data
                    axios.put("http://localhost:8000/api/vehicle_repairs", formData).then((res) => {
                        console.log(res);
                        toast.success("Vehicle repair updated successfully.");
                        navigate('/dashboard/vehicle-repair-management' ,{state: {vehicle: vehicle}});
                    }
                    ).catch((err) => {
                        console.log(err);
                        toast.error(err.response.data.error);
                    });
                }else{
                    const storage = firebase.storage();
                    const imageRef = storage.ref().child(`billImages/${billImage.name}`);
                    toast('Wait for image upload!', { icon: '🌐' });
                    imageRef.put(billImage)
                        .then((snapshot) => {
                            console.log("Image uploaded successfully");
                            toast.success("Image uploaded successfully");
                            return snapshot.ref.getDownloadURL();
                        })
                        .then((downloadURL) => {
                            console.log("Download URL:", downloadURL);
                            const formData = {
                                id: repair.id,
                                vehicle_reg_no: vehicleRegNo,
                                monitored_by: monitoredBy,
                                title: title,
                                description: description,
                                cost: cost,
                                date: date,
                                bill_image: downloadURL
                            };
                            console.log(formData);
                            // Perform API call to submit the form data
                            axios.put("http://localhost:8000/api/vehicle_repairs", formData).then((res) => {
                                console.log(res);
                                toast.success("Vehicle repair updated successfully.");
                                navigate('/dashboard/vehicle-repair-management' ,{state: {vehicle: vehicle}});
                            }
                            ).catch((err) => {
                                console.log(err);
                                toast.error(err.response.data.error);
                            });
                        })
                        .catch((error) => {
                            console.log(error);
                        });
                
                }
            }
    };

    return (
        <div className="w-full pt-[140px] min-h-[100vh] flex justify-center flex-col items-center">
            <h1 className="text-xl font-bold pt-6 text-white">{repair ? "Update Vehicle Repair" : "Add Vehicle Repair"}</h1>
            <form className="flex flex-col w-[500px]" onSubmit={handleSubmit}>
                <div className="flex flex-col">
                    <label htmlFor="vehicleRegNo" className="text-black">Vehicle Registration Number:</label>
                    <input type="text" id="vehicleRegNo" disabled className="p-2 m-2 rounded-md" value={vehicle.reg_no} onChange={handleVehicleRegNoChange} />
                </div>
                <div className="flex flex-col">
                    <label htmlFor="monitoredBy" className="text-black">Monitored By:</label>
                    <input type="text" id="monitoredBy" disabled className="p-2 m-2 rounded-md" value={user.username} onChange={handleMonitoredByChange} />
                </div>
                <div className="flex flex-col">
                    <label htmlFor="title" className="text-black">Title:</label>
                    <input type="text" id="title" placeholder="Title" className="p-2 m-2 rounded-md" value={title} onChange={handleTitleChange} />
                </div>
                <div className="flex flex-col">
                    <label htmlFor="description" className="text-black">Description:</label>
                    <textarea type="text" id="description" placeholder="Description" className="p-2 m-2 rounded-md" value={description} onChange={handleDescriptionChange} />
                </div>
                <div className="flex flex-col">
                    <label htmlFor="cost" className="text-black">Cost:</label>
                    <input type="number" id="cost" placeholder="Cost" className="p-2 m-2 rounded-md" value={cost} onChange={handleCostChange} />
                </div>
                <div className="flex flex-col">
                    <label htmlFor="date" className="text-black">Date:</label>
                    <input type="date" id="date" placeholder="Date" className="p-2 m-2 rounded-md" value={date} onChange={handleDateChange} />
                </div>
                <div className="flex flex-col">
                    <label htmlFor="billImage" className="text-black">Bill Image:</label>
                    <div className="px-2 mx-2 h-[60px] flex flex-row bg-white rounded-md ">
                        <input type="file" id="billImage" className="p-2 m-2 rounded-md" onChange={handleBillImageChange} />
                    </div>
                </div>
                <button type="submit" className="bg-primary text-white p-2 rounded-md m-2">Submit</button>
            </form>

        </div>
    );
}
