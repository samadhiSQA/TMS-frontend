import axios from "axios";
import { useState } from "react";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
export default function DriverLeaveForm() {
    //validate user
    const userString = localStorage.getItem('user');
    if(userString === null){
        window.location.href = '/login'
    }
    const user = JSON.parse(localStorage.getItem('user').toString());
    const [date, setDate] = useState("");
    const [description, setDescription] = useState("");

    const navigate = useNavigate();
    const handleDateChange = (e) => {
        setDate(e.target.value);
    };

    const handleDescriptionChange = (e) => {
        setDescription(e.target.value);
    };

    
   

   

    const handleSubmit = (e) => {
        e.preventDefault();
        //validate if date after 14 days from today
        const today = new Date();
        const selectedDate = new Date(date);
        const diff = Math.abs(selectedDate - today);
        const diffDays = Math.ceil(diff / (1000 * 60 * 60 * 24));
        if (diffDays < 14) {
            toast.error(
                "Leave request must be made at least 14 days in advance",
            )
            return;
        }
        axios.post("http://localhost:8000/api/leave_requests", {
            date,
            description,
            username : user.username,
        }).then((res) => {
            console.log(res.data);
            toast.success(
                "Leave request submitted successfully",
            )
            navigate('/dashboard/driver-leave-request-management');
        }).catch((err) => {
            console.log(err);
            toast.error(
                err.response.data.error || "An error occurred. Please try again.",
            )
        });
    };

    return (
        <div className="w-full pt-10 min-h-screen flex flex-col justify-center items-center backdrop-blur-lg">
            <h1 className="text-2xl font-bold text-white">Driver Leave Form</h1>
            <form className="flex flex-col w-[500px]" onSubmit={handleSubmit}>
                <label htmlFor="date">Date:</label>
                <input type="date" id="date" className="p-2 m-2 rounded-md" value={date} onChange={handleDateChange} />

                <label htmlFor="description">Description:</label>
                <textarea id="description" className="p-2 m-2 rounded-md" value={description} onChange={handleDescriptionChange} />
                

                

                <button type="submit" className="bg-primary text-white p-2 rounded-md m-2">Submit</button>
            </form>
        </div>
    );
}
