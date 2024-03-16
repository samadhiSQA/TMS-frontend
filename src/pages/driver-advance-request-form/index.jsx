import axios from "axios";
import { useState } from "react";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";

export default function DriverAdvanceRequestForm() {
    const userString = localStorage.getItem('user');
    if (userString === null) {
        window.location.href = '/login';
    }
    const user = JSON.parse(localStorage.getItem('user').toString());
    const [description, setDescription] = useState("");
    const [amount, setAmount] = useState("");

    const navigate = useNavigate();

    

    const handleDescriptionChange = (e) => {
        setDescription(e.target.value);
    };

    const handleAmountChange = (e) => {
        setAmount(e.target.value);
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        axios.post("http://localhost:8000/api/advance_requests", {
            description,
            amount,
            username: user.username,
        })
        .then((res) => {
            console.log(res.data);
            toast.success("Advance request submitted successfully");
            navigate('/dashboard/driver-advance-request-management');
        })
        .catch((err) => {
            console.log(err);
            toast.error(
                err.response.data.error || "An error occurred. Please try again."
            );
        });
    };

    return (
        <div className="w-full pt-10 min-h-screen flex flex-col justify-center items-center backdrop-blur-lg">
            <h1 className="text-2xl font-bold mb-5 text-white">Advance Request Form</h1>
            <form className="flex flex-col w-[500px]" onSubmit={handleSubmit}>                

                <label htmlFor="description">Description:</label>
                <textarea id="description" className="p-2 m-2 rounded-md" value={description} onChange={handleDescriptionChange} />

                <label htmlFor="amount">Amount:</label>
                <input type="number" id="amount" className="p-2 m-2 rounded-md" value={amount} onChange={handleAmountChange} />

                <button type="submit" className="bg-primary text-white p-2 rounded-md m-2">Submit</button>
            </form>
        </div>
    );
}
