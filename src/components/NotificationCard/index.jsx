import { useEffect, useState } from "react";
import axios from "axios";
//import prop types
import PropTypes from 'prop-types';
import './index.css'
import toast from "react-hot-toast";

export default function NotificationCard({notification , user , setNotificationLoaded}) {
    const [read, setRead] = useState(true);
    useEffect(()=>{
        axios.post('http://localhost:8000/api/notifications/read_status', {
            "notification_id" : notification.id,
            "username" : user.username
        }).then((res) => {
            console.log(res.data);
            if(res.data.read){
                setRead(true);
            }else{
                setRead(false);
            }
        }).catch((err) => {
            console.log(err);
        });        
    },[read,notification.id,user.username]);
    const date = new Date(notification.created_at);
    //get date in YYYY-MM-DD format
    const formattedDate = date.toLocaleDateString();
    return(
        <div className="w-full  min-h-[150px] relative cursor-pointer border-primary border unread-noti flex flex-col rounded my-2 p-1 overflow-hidden">
            <div className="text-black text-lg font-bold flex flex-col">
                {notification.title}
                <span className="text-xs font-extralight">{formattedDate}{" by : "}{notification.username}</span>
            </div>
            <p className="text-black text-sm text-wrap">{notification.body}</p>
            {
                read ? <></> : <div className="absolute bg-primary w-4 h-4 rounded-full text-white text-xs flex justify-center items-center top-1 right-1"></div>
            }
            {
                read ? <></> : <div className="absolute bg-primary w-full h-full unread-button text-white text-xs  justify-center items-center top-0 left-0" onClick={()=>{
                    axios.post('http://localhost:8000/api/notifications/read', {
                        "username" : user.username,
                        "notification_id" : notification.id
                    }).then((res) => {
                        console.log(res.data);
                        setRead(true);
                        toast.success(
                            "Notification marked as read",
                        )
                        setNotificationLoaded(false)
                    }
                    ).catch((err) => {
                        console.log(err);
                    });
                }}>Mark as read</div>  
            }
        </div>
    )
}
NotificationCard.propTypes = {
    notification: PropTypes.object.isRequired,
    user: PropTypes.object.isRequired,
    setNotificationLoaded: PropTypes.func.isRequired
}
