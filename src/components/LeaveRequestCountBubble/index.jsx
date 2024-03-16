import axios from "axios";
import { useEffect, useState } from "react";

export default function LeaveRequestCountBubble() {
    const [leaveRequests, setLeaveRequests] = useState([]);
    const [requestsLoaded, setRequestsLoaded] = useState(false);
    useEffect(() => {
        if(!requestsLoaded){
            axios.get('http://localhost:8000/api/leave_requests/pending').then((res) => {
                setLeaveRequests(res.data);
                setRequestsLoaded(true);
            }).catch((err) => {
                console.log(err);
            });
            setRequestsLoaded(true);
        }
    }, [requestsLoaded]);
    if(leaveRequests.length === 0){
        return <></>
    }
  return (
    <div className="flex justify-center items-center w-6 h-6 rounded-full bg-primary text-white text-xs font-bold absolute top-[-5px] right-[-20px]">
        {leaveRequests.length}
    </div>
  );
}