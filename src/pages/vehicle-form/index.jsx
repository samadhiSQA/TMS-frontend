import axios from "axios";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { useLocation, useNavigate } from "react-router-dom";
import firebase from 'firebase/compat/app'; // Import the compat version for now
import 'firebase/compat/storage'; // Import the compat version for now

export default function VehicleForm() {
    //check if there is a vehicle object in location state
    
    
    const location = useLocation();
    const navigate = useNavigate();
    const vehicle = location.state?.vehicle;
    const [registrationNumber, setRegistrationNumber] = useState(vehicle?.reg_no ||"");
    const [category, setCategory] = useState(vehicle?.category ||"");
    const [mileage, setMileage] = useState(vehicle?.milage ||"");
    const [description, setDescription] = useState(vehicle?.description ||"");
    const [make, setMake] = useState(vehicle?.make ||"");
    const [model, setModel] = useState(vehicle?.model ||"");
    const [yearOfMake, setYearOfMake] = useState(vehicle?.yor ||"");
    const [yearOfRegistration, setYearOfRegistration] = useState(vehicle?.yom ||"");
    const [image, setImage] = useState(null);
    const [type, setType] = useState(vehicle?.type ||"");
    const [categories,setCategories] = useState([]);
    const [catLoaded,setCatLoaded] = useState(false);

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

    useEffect(() => {
        if(!catLoaded){
            axios.get('http://localhost:8000/api/vehicles/category').then((res) => {
                setCategories(res.data);
                setCatLoaded(true);
            }
            ).catch((err) => {
                console.log(err);
            }
            )
        }
    }, [catLoaded]);
    

    const handleRegistrationNumberChange = (e) => {
        setRegistrationNumber(e.target.value);
    };

    const handleCategoryChange = (e) => {
        setCategory(e.target.value);
    };

    const handleMileageChange = (e) => {
        setMileage(e.target.value);
    };

    const handleDescriptionChange = (e) => {
        setDescription(e.target.value);
    };

    const handleMakeChange = (e) => {
        setMake(e.target.value);
    };

    const handleModelChange = (e) => {
        setModel(e.target.value);
    };

    const handleYearOfMakeChange = (e) => {
        setYearOfMake(e.target.value);
    };

    const handleYearOfRegistrationChange = (e) => {
        setYearOfRegistration(e.target.value);
    };

    const handleImageChange = (e) => {
        setImage(e.target.files[0])
    };

    const handleTypeChange = (e) => {
        setType(e.target.value);
    };

    const handleSubmit = (e) => {
        if(!vehicle){
            if(image === null){
                //toast
                toast.error("Please add an image!")
                return;
            }
            e.preventDefault();
            
            const storage = firebase.storage();
            const imageRef = storage.ref().child(`vehicleImages/${image.name}`);
            toast('Wait for image upload!',{
                icon: '🌐',
            });
            
            imageRef.put(image)
                .then((snapshot) => {
                    console.log("Image uploaded successfully");
                    toast.success("Image uploaded successfully");
                // Get the download URL for the uploaded image              
                    return snapshot.ref.getDownloadURL();
                })
                .then((downloadURL) => {
                console.log("Download URL:", downloadURL);
                const vehicleData = {
                    reg_no:registrationNumber,
                    category,
                    milage:mileage,
                    description,
                    make,
                    model,
                    yor : yearOfMake,
                    yom : yearOfRegistration,
                    image : downloadURL,
                    type,
                };
                    axios.post('http://localhost:8000/api/vehicles', vehicleData).then((res) => {
                        console.log(res);
                        toast.success("Vehicle added successfully");
                        navigate('/dashboard/vehicle-manager');
                    }).catch((error) => {
                        console.log(error);
                        toast.error(error.response.data.error)
                    });
                    console.log(vehicleData);
                }
                ).catch((error) => {
                    console.log(error);
                });
        }else{
            if(image === null){
                //toast
                toast.error("Please add an image!")
                return;
            }
            e.preventDefault();
            
            const storage = firebase.storage();
            const imageRef = storage.ref().child(`vehicleImages/${image.name}`);
            toast('Wait for image upload!',{
                icon: '🌐',
            });
            
            imageRef.put(image)
                .then((snapshot) => {
                    console.log("Image uploaded successfully");
                    toast.success("Image uploaded successfully");
                // Get the download URL for the uploaded image              
                    return snapshot.ref.getDownloadURL();
                })
                .then((downloadURL) => {
                console.log("Download URL:", downloadURL);
                const vehicleData = {
                    reg_no:registrationNumber,
                    category,
                    milage:mileage,
                    description,
                    make,
                    model,
                    yor : yearOfMake,
                    yom : yearOfRegistration,
                    image : downloadURL,
                    type,
                };
                    axios.put('http://localhost:8000/api/vehicles', vehicleData).then((res) => {
                        console.log(res);
                        toast.success("Vehicle edited successfully");
                        navigate('/dashboard/vehicle-manager');
                    }).catch((error) => {
                        console.log(error);
                        toast.error(error.response.data.error)
                    });
                    console.log(vehicleData);
                }
                ).catch((error) => {
                    console.log(error);
                });
        }
    };

    return (
        <div className="w-full pt-[100px] min-h-[100vh] flex justify-center flex-col items-center">
            {
                vehicle ? (
                    <h1 className="text-xl font-bold pt-6 text-white">Update vehicle</h1>
                ) : (
                    <h1 className="text-xl font-bold pt-6 text-white">Add new vehicle</h1>
                )
            }
      
            <form className="flex flex-col w-[500px]" onSubmit={handleSubmit}>
                <input type="text" placeholder="Registration number"  className="p-2 m-2 rounded-md" disabled={vehicle} value={registrationNumber} onChange={handleRegistrationNumberChange} />
                {
                    catLoaded ? (
                        <select className="p-2 m-2 rounded-md" required={true} value={category} onChange={handleCategoryChange}>
                            <option value="">Select category</option>
                            {
                                categories.map((category, index) => {
                                    return (
                                        <option key={index} value={category.id}>{category.name}</option>
                                    );
                                })
                            }
                        </select>
                    ) : (
                        <select className="p-2 m-2 rounded-md" value={category} onChange={handleCategoryChange}>
                            <option value="">Select category</option>
                        </select>
                    )
                }
                <input type="text" placeholder="Mileage" className="p-2 m-2 rounded-md" value={mileage} onChange={handleMileageChange} />
                <textarea type="text" placeholder="Description" className="p-2 m-2 rounded-md" value={description} onChange={handleDescriptionChange} />
                <input type="text" placeholder="Make" className="p-2 m-2 rounded-md" value={make} onChange={handleMakeChange} />
                <input type="text" placeholder="Model" className="p-2 m-2 rounded-md" value={model} onChange={handleModelChange} />
                <input type="number" placeholder="Year of make" className="p-2 m-2 rounded-md" value={yearOfMake} onChange={handleYearOfMakeChange} />
                <input type="number" placeholder="Year of registration" className="p-2 m-2 rounded-md" value={yearOfRegistration} onChange={handleYearOfRegistrationChange} />
                <div className="px-2 mx-2 h-[60px] flex flex-row bg-white rounded-md ">
                    <label htmlFor="image" className="h-full text-center flex justify-center items-center rounded-md text-gray-400">Image</label>
                    <input type="file" placeholder="Image" className="p-2 m-2 rounded-md"  onChange={handleImageChange} />
                </div>                
                <input type="text" placeholder="Type" className="p-2 m-2 rounded-md" value={type} onChange={handleTypeChange} />
                <button type="submit" className="bg-primary text-white p-2 rounded-md m-2">Submit</button>
            </form>
        </div>
    );
}
