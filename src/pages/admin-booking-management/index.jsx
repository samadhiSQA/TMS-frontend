import axios from "axios";
import { useEffect, useState } from "react";

export default function AdminBookingManagement() {
    const [bookings, setBookings] = useState([]);
    const [bookingsLoaded, setBookingsLoaded] = useState(false);
    useEffect(() => {
        if (!bookingsLoaded) {
        axios.get('http://localhost:8000/api/bookings').then(res => {
            setBookings(res.data);
            setBookingsLoaded(true);
        }).catch(err => {
            console.log(err);
        });
        setBookingsLoaded(true);
        }
    }, [bookingsLoaded]);
    return (
        <div className="min-w-full min-h-[100vh] pt-[140px] backdrop-blur-lg flex flex-col flex-wrap items-center">
        <h1>Admin Booking Management</h1>
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
        {
            bookings.length === 0 ? <h1>No bookings found</h1> :
            <table className="w-3/4  rounded-md mt-4">
            <thead>
                <tr className="bg-[#FFFFFF70] mb-4">
                <th className="text-black  text-lg font-bold">Customer</th>
                <th className="text-black  text-lg font-bold">Driver</th>
                <th className="text-black  text-lg font-bold">Vehicle</th>
                <th className="text-black  text-lg font-bold">Distance</th>
                <th className="text-black  text-lg font-bold">Date</th>
                <th className="text-black  text-lg font-bold">Cost</th>
                <th className="text-black  text-lg font-bold">Payment Status</th>
                <th className="text-black  text-lg font-bold">Remarks</th>
                </tr>
            </thead>
            <tbody>
                {
                bookings.map((booking, index) => {
                    return (
                    <tr key={index} className="hover:bg-[#FFFFFF70] cursor-pointer">
                        <td className="text-black  text-lg font-semibold text-center">{booking.username}</td>
                        <td className="text-black  text-lg font-semibold text-center">{booking.driver_username}</td>
                        <td className="text-black  text-lg font-semibold text-center">{booking.vehicle_reg_no}</td>
                        <td className="text-black  text-lg font-semibold text-center">{booking.distance}</td>
                        <td className="text-black  text-lg font-semibold text-center">{booking.date}</td>
                        <td className="text-black  text-lg font-semibold text-center">{booking.cost}</td>
                        <td className="text-black  text-lg font-semibold text-center">{booking.payment_status}</td>
                        <td className="text-black  text-lg font-semibold text-center">{booking.remarks}</td>
                    </tr>
                    );
                })
                }
            </tbody>
            </table>
        }
        </div>
    );
}
    