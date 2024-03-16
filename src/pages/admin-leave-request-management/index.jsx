import axios from "axios"
import { useEffect, useState } from "react"
import toast from "react-hot-toast";

export default function AdminLeaveRequestManagement() {
    //get and validate user
    const userString = localStorage.getItem('user');
    if(userString === null){
        window.location.href = '/login'
    }
    const user = JSON.parse(localStorage.getItem('user').toString());
    const [leaveRequests, setLeaveRequests] = useState([])
    const [requestsLoaded, setRequestsLoaded] = useState(false)
    const [activeLeaveRequest, setActiveLeaveRequest] = useState(null)
    const [showApproveForm, setShowApproveForm] = useState(false);
    const [remark, setRemark] = useState('')
    useEffect(() => {
        if(!requestsLoaded){
            axios.get('http://localhost:8000/api/leave_requests/pending').then((res) => {
                setLeaveRequests(res.data)
                setRequestsLoaded(true)
            }).catch((err) => {
                console.log(err)
            })
        }
    }, [requestsLoaded])
    return(
        <>
        <div className="min-w-full min-h-[100vh] pt-[140px] backdrop-blur-lg flex flex-col flex-wrap items-center">
            <h1>Admin Leave Request Management</h1>
            {
                /*
                date
                username
                description
                */
            }
            {
                leaveRequests.length === 0 ? <h1>No leave requests found</h1> : 
                <table className="w-3/4  rounded-md mt-4">
                    <thead>
                        <tr className="bg-[#FFFFFF70] mb-4">
                            <th className="text-black  text-lg font-semibold text-center">Date</th>
                            <th className="text-black  text-lg font-semibold text-center">Username</th>
                            <th className="text-black  text-lg font-semibold text-center">Description</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            leaveRequests.map((request, index) => {
                                return(
                                    <tr key={index} className="hover:bg-[#FFFFFF70] cursor-pointer" onClick={()=>{
                                        setActiveLeaveRequest(request)
                                        setShowApproveForm(true)
                                    }}>
                                        <td className="text-black  text-lg font-semibold text-center">{request.date}</td>
                                        <td className="text-black  text-lg font-semibold text-center">{request.username}</td>
                                        <td className="text-black  text-lg font-semibold text-center text-wrap">{request.description}</td>
                                    </tr>
                                )
                            })
                        }
                    </tbody>
                </table>
            }

        </div>
        {
            showApproveForm&&<div className="fixed top-0 left-0 w-full h-full bg-black bg-opacity-50 flex justify-center items-center" >
                <div className="bg-white w-1/2  rounded-md p-4 flex flex-col" >
                    <h1 className="text-primary text-lg font-bold">Approve Leave Request</h1>
                    <div className="flex flex-col">
                        <input type="text" value={remark} onChange={(e)=>setRemark(e.target.value)} className="bg-[#FFFFFF70] rounded-md p-2 my-2" placeholder="Remarks" />
                        <button className="bg-primary text-white px-3 py-1 rounded-md" type="submit" onClick={()=>{
                            axios.put('http://localhost:8000/api/leave_requests', {
                                "username" : activeLeaveRequest.username,
                                "date": activeLeaveRequest.date,
                                "remarks" : remark,
                                "status" : "approved",
                                "revieved_by" : user.username
                            }).then((res) => {
                                toast.success("Leave request approved successfully")
                                console.log(res.data);
                                //reload page
                                window.location.reload()
                            }).catch((err) => {
                                console.log(err);
                            });
                        }}>Approve</button>
                        <button className="bg-red-600 mt-2 text-white px-3 py-1 rounded-md" onClick={()=>{
                            console.log({
                                "username" : activeLeaveRequest.username,
                                "date": activeLeaveRequest.date,
                                "remarks" : remark,
                                "status" : "rejected",
                                "revieved_by" : user.username,

                            })
                            axios.put('http://localhost:8000/api/leave_requests', {
                                username : activeLeaveRequest.username,
                                date: activeLeaveRequest.date,
                                remarks : remark,
                                status : "rejected",
                                description : activeLeaveRequest.description,
                                revieved_by : user.username,

                            }).then((res) => {
                                toast.success("Leave request rejected successfully")
                                console.log(res.data);
                                //reload page
                                window.location.reload()                                
                            }).catch((err) => {
                                console.log(err);
                            });
                        }
                        }>Reject</button>
                        <button className="bg-yellow-600 mt-2 text-white px-3 py-1 rounded-md" onClick={()=>{setShowApproveForm(false)}
                        }>Cancel</button>
                    </div>
                </div>
            </div>
        }
        </>
    )
}