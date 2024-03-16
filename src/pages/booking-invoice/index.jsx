import axios from "axios";
import { useEffect, useState } from "react";
import logo from '../../assets/images/logo.png';
export default function BookingInvoice() {
    //get id from url
    const id = new URLSearchParams(window.location.search).get('id');
    const [booking, setBooking] = useState(null);
    //get user
    const userString = localStorage.getItem('user');
    if(userString === null){
        window.location.href = '/login'
    }
    const user = JSON.parse(localStorage.getItem('user').toString());
    
    useEffect(() => {
        if (id !== null) {
            axios.get('http://localhost:8000/api/bookings/bycustomer',{
                params:{
                    username: user.username
                }
            
            }).then((res) => {
                const allBookings = res.data;
                console.log(id);
                const bookingArr = allBookings.filter((booking) => booking.id == id);
                console.log(bookingArr);
                if(bookingArr.length === 0){
                    window.location.href = '/dashboard/customer-booking-management';
                }
                setBooking(bookingArr[0]);         
            }).catch((err) => {
                console.log(err);
            });
        }
    }, [id, user.username]);
  return (
    <div className="  min-w-[100vw] min-h-[100vh] bg-white flex flex-col items-center relative">
        <button className="bg-[#FFFFFF70] hover:bg-white  w-24 h-24 rounded-full flex justify-center items-center absolute top-0 right-0 m-4 text-primary text-xl hover:opacity-0" onClick={() => {
            window.print();
            }}>Click Here To Print</button>
        <div className="border-black border-t-2 border-b-2 w-full flex justify-center items-center">
            <img src={logo} alt="logo" className="w-[120px] " />
            <span className="text-2xl font-bold h-full ml-8 text-center">InterLink pvt LTD.</span>
        </div>
        <div className="border-black border-t-2 border-b-2 w-full flex justify-center items-center">
            <span className="text-2xl font-bold h-full ml-8 text-center">Booking Invoice</span>
        </div>
        <div className="w-full flex flex-row justify-center items-center">
            <div className="w-1/2 flex flex-col justify-center items-center">
                <h1 className="text-2xl font-bold">Booking Details</h1>
                <div className="w-full flex flex-row justify-center items-center">
                    <div className="w-1/2 flex flex-col justify-center items-center">
                        <h1 className="text-xl font-bold">Date</h1>
                        <h1 className="text-xl font-bold">Vehicle</h1>
                        <h1 className="text-xl font-bold">Distance</h1>
                    </div>
                    <div className="w-1/2 flex flex-col justify-center items-center">
                        <h1 className="text-xl font-bold">{booking?.date}</h1>
                        <h1 className="text-xl font-bold">{booking?.vehicle_reg_no}</h1>
                        <h1 className="text-xl font-bold">{booking?.distance+" Kms"}</h1>
                    </div>
                </div>
            </div>
            <div className="w-1/2 flex flex-col justify-center items-center">
                <h1 className="text-2xl font-bold">Customer Details</h1>
                <div className="w-full flex flex-row justify-center items-center">
                    <div className="w-1/2 flex flex-col justify-center items-center">
                        <h1 className="text-xl font-bold">Name</h1>
                        <h1 className="text-xl font-bold">Phone</h1>
                        <h1 className="text-xl font-bold">Email</h1>
                    </div>
                    <div className="w-1/2 flex flex-col justify-center items-center">
                        <h1 className="text-xl font-bold">{user.username}</h1>
                        <h1 className="text-xl font-bold">{user.phone}</h1>
                        <h1 className="text-xl font-bold">{user.email}</h1>
                    </div>
                </div>
            </div>
        </div>
        {/* total */}
        <div className="w-full flex flex-col justify-center items-center border-black border-t-2 border-b-2 mt-8">
            <div className="w-1/2 flex flex-col justify-center items-center">
                <div className="w-full flex flex-row justify-center items-center">
                    <div className="w-1/2 flex flex-col justify-center items-center">
                        <h1 className="text-xl font-bold">Cost</h1>
                        <h1 className="text-xl font-bold">Payment Status</h1>
                    </div>
                    <div className="w-1/2 flex flex-col justify-center items-center">
                        <h1 className="text-xl font-bold">{booking?.cost}</h1>
                        <h1 className="text-xl font-bold">{booking?.payment_status}</h1>
                    </div>
                </div>
            </div>
            <div className="w-1/2 flex flex-col justify-center items-center">
                <h1 className="text-2xl font-bold">Remarks</h1>
                <div className="w-full flex flex-row justify-center items-center">
                    <div className="w-1/2 flex flex-col justify-center items-center">
                        <h1 className="text-xl font-bold">{booking?.remarks}</h1>
                    </div>
                </div>
            </div>
        </div>
    </div>
  );
}