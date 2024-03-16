import axios from "axios";
import { useEffect, useState } from "react";
import { FaPlus } from "react-icons/fa";
import { useNavigate } from "react-router-dom";

{
    /*
    driver_username
vehicle_reg_no
distance
date
cost
payment_status
remarks
    */
}
export default function CustomerBookingManagement() {
    //get userstring
    const userString = localStorage.getItem('user');
    if(userString === null){
        window.location.href = '/login'
    }
    const user = JSON.parse(localStorage.getItem('user').toString());
    const navigate = useNavigate();
    const [bookings, setBookings] = useState([]);
    const [bookingsLoaded, setBookingsLoaded] = useState(false);
    useEffect(() => {
        if(!bookingsLoaded){
            axios.get('http://localhost:8000/api/bookings/bycustomer',{
                params:{
                    username: user.username
                }
            
            }).then((res) => {
                setBookings(res.data);
                console.log(res.data);
                setBookingsLoaded(true);
            }).catch((err) => {
                console.log(err);
            });
        }
    }, [bookingsLoaded, user.username]);
    return (
        <div className="pt-[140px] w-full h-full flex flex-col justify-center items-center">
            <button className="bg-[#FFFFFF70] hover:bg-white  w-24 h-24 rounded-full flex justify-center items-center absolute bottom-[100px] right-0 m-4 text-primary text-4xl" onClick={() => navigate('/dashboard/customer-booking-form')}><FaPlus/></button>
            <h1 className="text-white text-xl font-bold">My bookings</h1>
            {/* 'date',
        'description',
        'revieved_by',
        'status',
        'remarks' */}
            {
                bookings.length === 0 ? <h1 className="text-white text-lg font-bold">No bookings found</h1> : 
                <table className="w-3/4  rounded-md mt-4">
                    <thead>                    
                        <tr className="bg-[#FFFFFF70] mb-4">
                            <th className="text-black  text-lg font-bold">Date</th>
                            <th className="text-black  text-lg font-bold">Vehicle</th>
                            <th className="text-black  text-lg font-bold">Distance</th>
                            <th className="text-black  text-lg font-bold">Cost</th>
                            <th className="text-black  text-lg font-bold">Payment status</th>
                            <th className="text-black w-[300px] max-w-[300px] text-lg font-bold">Remarks</th>
                            <th className="text-black  text-lg font-bold">Driver</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            bookings.map((booking, index) => {
                                return(
                                    <tr key={index} className="bg-[#FFFFFF70] hover:bg-white cursor-pointer relative  items-center" onClick={
                                        ()=>{
                                            if(booking.payment_status==="pending"){
                                                navigate('/dashboard/payment', {state: {booking: booking}})
                                            }else{
                                                navigate('/booking-invoice/?id='+booking.id);
                                            }
                                        }
                                    }>
                                        <td className="text-center ">{booking.date}</td>
                                        <td className="text-center ">{booking.vehicle_reg_no}</td>
                                        <td className="text-center ">{booking.distance+" KM"}</td>
                                        <td className="text-center ">{booking.cost}</td>
                                        <td className="text-center ">{booking.payment_status}</td>
                                        <td className="text-center w-[300px] max-w-[300px] text-wrap">{booking.remarks}</td>
                                        <td className="text-center ">{booking.driver_username}</td>
                                        
                                    </tr>
                                )
                            }
                            )
                        }
                    </tbody>
                </table>
            }
        </div>
    )
}
