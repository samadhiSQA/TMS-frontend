import { useEffect, useState } from "react";
import { FaBell } from "react-icons/fa";
import NotificationCard from "../NotificationCard";
import axios from "axios";
import NotificationForm from "../NotificationForm";

export default function NotificationIcon(){
    //get user from localstorage
    const userString = localStorage.getItem('user')
    if(userString === null){
        window.location.href = '/login'
    }
    const user = JSON.parse(localStorage.getItem('user').toString())
    const [navigationOpen, setNavigationOpen] = useState(false);
    const [notification, setNotification] = useState([]);
    const [unreadNotificationCount, setUnreadNotificationCount] = useState(0);
    const [notificationLoaded, setNotificationLoaded] = useState(false);
    const [notificationForm, setNotificationForm] = useState(false);
    useEffect(() => {
        if(!notificationLoaded){
            axios.get("http://localhost:8000/api/notifications", {
                params: {
                    username: user.username
                }
            }).then((res) => {
                setNotification(res.data);
                setNotificationLoaded(true);
            }
            ).catch((err) => {
                console.log(err);
            });
            axios.get("http://localhost:8000/api/notifications/unread", {
                params: {
                    username: user.username
                }
            }).then((res) => {
                setUnreadNotificationCount(res.data.length);
            }).catch((err) => {
                console.log(err);
            });
        }
    },[notificationLoaded,user.username,unreadNotificationCount]);

    return(
        <>
        <div className="relative mr-4">
            <FaBell className="text-white text-3xl cursor-pointer hover:text-primary" onClick={()=>{
                setNavigationOpen(!navigationOpen)
            }} />
            <div className="absolute bg-primary rounded-full w-4 h-4 text-sm text-white flex justify-center items-center top-0 right-0">
                <span className="text-[10px] text-center">{unreadNotificationCount}</span>
            </div>
        </div>
        {
            navigationOpen ? 
            <div className="absolute  top-12 left-0 bg-white w-80  max-h-[400px] overflow-hidden  hover:overflow-y-scroll rounded-md shadow-lg p-4 flex flex-col  items-center">
                {
                    user.account_type === 'admin' ? <button className="bg-primary text-white px-3 py-1 rounded-md" onClick={()=>{
                        setNotificationForm(true)
                    }}>Send new Notification</button> : <></>
                }
                
                {
                    notification.length === 0 ? <h1 className="text-primary text-lg font-bold">No notifications</h1> : 
                    notification.map((notification, index) => {
                        return(
                            <NotificationCard key={index} notification={notification} user={user} setNotificationLoaded={setNotificationLoaded}/>
                        )
                    })
                }
                
            </div> : <></>
        }
        {
            notificationForm&&
            <NotificationForm notification={null} user={user} setNotificationForm={setNotificationForm} afterSubmission={()=>{
                setNotificationLoaded(false);                
            }}/>

        }
        </>
    )

}