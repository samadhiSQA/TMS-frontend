import axios from "axios";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";

export default function AdminAdvanceRequestManagement() {
    // Get and validate user
    const userString = localStorage.getItem('user');
    if (userString === null) {
        window.location.href = '/login';
    }
    const user = JSON.parse(localStorage.getItem('user').toString());
    
    const [advanceRequests, setAdvanceRequests] = useState([]);
    const [requestsLoaded, setRequestsLoaded] = useState(false);
    const [activeAdvanceRequest, setActiveAdvanceRequest] = useState(null);
    const [showApproveForm, setShowApproveForm] = useState(false);
    const [remark, setRemark] = useState('');

    useEffect(() => {
        if (!requestsLoaded) {
            axios.get('http://localhost:8000/api/advance_requests/pending')
                .then((res) => {
                    setAdvanceRequests(res.data);
                    setRequestsLoaded(true);
                })
                .catch((err) => {
                    console.log(err);
                });
        }
    }, [requestsLoaded]);

    return (
        <>
            <div className="min-w-full min-h-[100vh] pt-[140px] backdrop-blur-lg flex flex-col flex-wrap items-center">
                <h1>Admin Advance Request Management</h1>
                {
                    advanceRequests.length === 0 ? (
                        <h1>No advance requests found</h1>
                    ) : (
                        <table className="w-3/4 rounded-md mt-4">
                            <thead>
                                <tr className="bg-[#FFFFFF70] mb-4">
                                    <th className="text-black text-lg font-semibold text-center">Date</th>
                                    <th className="text-black text-lg font-semibold text-center">Username</th>
                                    <th className="text-black text-lg font-semibold text-center">Description</th>
                                    <th className="text-black text-lg font-semibold text-center">Amount</th>
                                </tr>
                            </thead>
                            <tbody>
                                {advanceRequests.map((request, index) => (
                                    <tr key={index} className="hover:bg-[#FFFFFF70] cursor-pointer" onClick={() => {
                                        setActiveAdvanceRequest(request);
                                        setShowApproveForm(true);
                                    }}>
                                        <td className="text-black text-lg font-semibold text-center">{request.date}</td>
                                        <td className="text-black text-lg font-semibold text-center">{request.username}</td>
                                        <td className="text-black text-lg font-semibold text-center text-wrap">{request.description}</td>
                                        <td className="text-black text-lg font-semibold text-center">{request.amount}</td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    )
                }
            </div>
            {
                showApproveForm && (
                    <div className="fixed top-0 left-0 w-full h-full bg-black bg-opacity-50 flex justify-center items-center">
                        <div className="bg-white w-1/2 rounded-md p-4 flex flex-col">
                            <h1 className="text-primary text-lg font-bold">Approve Advance Request</h1>
                            <div className="flex flex-col">
                                <input type="text" value={remark} onChange={(e) => setRemark(e.target.value)} className="bg-[#FFFFFF70] rounded-md p-2 my-2" placeholder="Remarks" />
                                <button className="bg-primary text-white px-3 py-1 rounded-md m-2" onClick={() => {
                                    axios.put('http://localhost:8000/api/advance_requests', {
                                        "id": activeAdvanceRequest.id, 
                                        "username": activeAdvanceRequest.username,
                                        "date": activeAdvanceRequest.date,
                                        "remarks": remark,
                                        "status": "approved",
                                        "revieved_by": user.username,
                                        "amount": activeAdvanceRequest.amount,
                                    })
                                    .then((res) => {
                                        toast.success("Advance request approved successfully");
                                        console.log(res.data);
                                        window.location.reload(); // Reload the page
                                    })
                                    .catch((err) => {
                                        console.log(err);
                                        toast.error(err.response.data.error || "An error occurred. Please try again.");
                                    });
                                }}>Approve</button>
                                <button className="bg-red-600 text-white px-3 py-1 rounded-md m-2" onClick={() => {
                                    axios.put('http://localhost:8000/api/advance_requests', {
                                        "id": activeAdvanceRequest.id,
                                        "username": activeAdvanceRequest.username,
                                        "date": activeAdvanceRequest.date,
                                        "remarks": remark,
                                        "status": "rejected",
                                        "revieved_by": user.username,
                                        "amount": activeAdvanceRequest.amount,
                                    })
                                    .then((res) => {
                                        toast.success("Advance request rejected successfully");
                                        console.log(res.data);
                                        window.location.reload(); // Reload the page
                                    })
                                    .catch((err) => {
                                        console.log(err);
                                        toast.error(err.response.data.error || "An error occurred. Please try again.");
                                    });
                                }}>Reject</button>
                                <button className="bg-yellow-600 text-white px-3 py-1 rounded-md m-2" onClick={() => setShowApproveForm(false)}>Cancel</button>
                            </div>
                        </div>
                    </div>
                )
            }
        </>
    );
}
