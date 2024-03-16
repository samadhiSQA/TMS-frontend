import axios from "axios";
import { useState } from "react";
import toast from "react-hot-toast";
import { useLocation, useNavigate } from "react-router-dom";

export default function PaymentPage(){
    const location = useLocation();
    const booking = location.state.booking;
    const navigate = useNavigate();
    const [cardNumber, setCardNumber] = useState("");
    const [expiry, setExpiry] = useState("");
    const [cvv, setCvv] = useState("");
    const [name, setName] = useState("");
    function submit(){
        axios.post("http://localhost:8000/api/payments", {
            card_number : cardNumber,
            date : expiry,
            card_expiry_date: expiry,
            card_cvv:cvv,
            card_holder_name:name,
            amount : booking.cost,
            booking_id: booking.id
        }).then(() => {
            toast.success("Payment successful");
            navigate('/booking-invoice/?id='+booking.id);
        }).catch((err) => {
            console.log(err);
            toast.error(
                err.response.data.error || "An error occurred. Please try again."
            );
        });
    }
    return(
        <div className="w-full pt-[150px] min-h-screen flex flex-col justify-center items-center backdrop-blur-lg">
            <h1 className="text-2xl font-bold mb-5 text-white">Payment</h1>
            <h2 className="text-xl font-bold mb-5 text-white">Total: {"LKR : "+booking.cost}</h2>
            <div className="flex flex-col w-[500px]">
                <label htmlFor="cardNumber">Card Number:</label>
                <input type="text" id="cardNumber" className="p-2 m-2 rounded-md" value={cardNumber} onChange={(e) => setCardNumber(e.target.value)} />
                <label htmlFor="expiry">Expiry:</label>
                <input type="date" id="expiry" className="p-2 m-2 rounded-md" value={expiry} onChange={(e) => setExpiry(e.target.value)} />
                <label htmlFor="cvv">CVV:</label>
                <input type="text" id="cvv" className="p-2 m-2 rounded-md" value={cvv} onChange={(e) => setCvv(e.target.value)} />
                <label htmlFor="name">Name:</label>
                <input type="text" id="name" className="p-2 m-2 rounded-md" value={name} onChange={(e) => setName(e.target.value)} />
                <button onClick={submit} className="bg-primary text-white p-2 rounded-md m-2">Pay</button>
            </div>
        </div>
    )

}