import axios from "axios";
import { useEffect, useState } from "react";
import { FaPlus } from "react-icons/fa";
import { useNavigate } from "react-router-dom";

export default function DriverAdvanceRequestManagement() {
    const userString = localStorage.getItem('user');
    if (userString === null) {
        window.location.href = '/login';
    }
    const user = JSON.parse(localStorage.getItem('user').toString());
    const navigate = useNavigate();
    const [advanceRequests, setAdvanceRequests] = useState([]);
    const [requestsLoaded, setRequestsLoaded] = useState(false);

    useEffect(() => {
        if (!requestsLoaded) {
            axios.get(`http://localhost:8000/api/advance_requests/${user.username}`)
                .then((res) => {
                    setAdvanceRequests(res.data);
                    setRequestsLoaded(true);
                    console.log(res.data);
                })
                .catch((err) => {
                    console.log(err);
                });
        }
    }, [requestsLoaded, user.username]);

    return (
        <div className="pt-[140px] w-full h-full flex flex-col justify-center items-center">
            <button
                className="bg-[#FFFFFF70] hover:bg-white w-24 h-24 rounded-full flex justify-center items-center absolute bottom-[100px] right-0 m-4 text-primary text-4xl"
                onClick={() => navigate('/dashboard/driver-advance-request-form')}
            >
                <FaPlus/>
            </button>
            <h1 className="text-white text-xl font-bold">My advance requests</h1>
            {advanceRequests.length === 0 ? (
                <h1 className="text-white text-lg font-bold">No advance requests found</h1>
            ) : (
                <table className="w-3/4 rounded-md mt-4">
                    <thead>
                        <tr className="bg-[#FFFFFF70] mb-4">
                            <th className="text-black text-lg font-bold">Username</th>
                            <th className="text-black text-lg font-bold">Date</th>
                            <th className="text-black text-lg font-bold">Description</th>
                            <th className="text-black text-lg font-bold">Reviewed by</th>
                            <th className="text-black text-lg font-bold">Status</th>
                            <th className="text-black text-lg font-bold">Amount</th>
                            <th className="text-black text-lg font-bold">Remarks</th>
                        </tr>
                    </thead>
                    <tbody>
                        {advanceRequests.map((request, index) => (
                            <tr key={index} className="bg-[#FFFFFF70] hover:bg-white cursor-pointer relative items-center">
                                <td className="text-center">{request.username}</td>
                                <td className="text-center">{request.date}</td>
                                <td className="text-center">{request.description}</td>
                                <td className="text-center">{request.revieved_by}</td>
                                <td className="text-center">{request.status}</td>
                                <td className="text-center">{request.amount}</td>
                                <td className="text-center">{request.remarks}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            )}
        </div>
    );
}
