import axios from "axios";
import { useEffect, useState } from "react";

export default function AdvanceRequestCountBubble() {
    const [advanceRequests, setAdvanceRequests] = useState([]);
    const [requestsLoaded, setRequestsLoaded] = useState(false);

    useEffect(() => {
        if (!requestsLoaded) {
            axios.get('http://localhost:8000/api/advance_requests/pending')
                .then((res) => {
                    console.log(res.data);
                    setAdvanceRequests(res.data);
                    setRequestsLoaded(true);
                })
                .catch((err) => {
                    console.log(err);
                });
            setRequestsLoaded(true);
        }
    }, [requestsLoaded]);

    if (advanceRequests.length === 0) {
        return <></>; // Return nothing if there are no pending advance requests
    }

    return (
        <div className="flex justify-center items-center w-6 h-6 rounded-full bg-primary text-white text-xs font-bold absolute top-[-5px] right-[-20px]">
            {advanceRequests.length}
        </div>
    );
}
