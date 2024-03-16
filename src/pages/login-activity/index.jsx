import axios from "axios";
import { useEffect, useState } from "react";

function removeUndefinedWords(str){
    return str.split(' ').filter(word => word !== 'undefined').join(' ');
}
//get timestamp and return yyyy-mm-dd HH:MM:SS 
function getDateTime(timestamp){
    const date = new Date(timestamp);
    return date.getFullYear() + "-" + (date.getMonth() + 1) + "-" + date.getDate() + " " + date.getHours() + ":" + date.getMinutes() + ":" + date.getSeconds();
}

export default function LoginActivity(){
    //get username from url parameters
    const username = new URLSearchParams(window.location.search).get('username');
    const [loginActivities , setLoginActivities] = useState([]);
    const [loaded, setLoaded] = useState(false);
    useEffect(() => {
        axios.get("http://localhost:8000/api/common_users/login_records",{
            params : {
                username
            }
        }).then((res) => {
            setLoginActivities(res.data);
            setLoaded(true);
        }).catch((err) => {
            console.log(err);
        });
    }, [loaded, username]);
    {
        /*
        id
        device
        region
        time and date
        */
    }
    return(
        <div className="min-w-full min-h-[100vh] pt-[140px] backdrop-blur-lg flex flex-col flex-wrap items-center">
            <h1 className="text-white text-xl font-bold" >Login Activities of{" "+ username}</h1>
            {
                loginActivities.length === 0 ? <h1>No login activities found</h1> : 
                <table className="w-3/4  rounded-md mt-4">
                    <thead>
                        <tr className="bg-[#FFFFFF70] mb-4">
                            <th className="text-black  text-lg font-semibold text-center">Login ID</th>
                            <th className="text-black  text-lg font-semibold text-center">Device</th>
                            <th className="text-black  text-lg font-semibold text-center">Region</th>
                            <th className="text-black  text-lg font-semibold text-center">Time and Date</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            loginActivities.map((activity, index) => {
                                return(
                                    <tr key={index} className="hover:bg-[#FFFFFF70] cursor-pointer">
                                        <td className="text-black  text-lg font-semibold text-center">{activity.id}</td>
                                        <td className="text-black  text-lg font-semibold text-center">{removeUndefinedWords(activity.device)}</td>
                                        <td className="text-black  text-lg font-semibold text-center">{removeUndefinedWords(activity.region)}</td>
                                        <td className="text-black  text-lg font-semibold text-center">{getDateTime(activity.created_at)}</td>
                                    </tr>
                                )
                            })
                        }
                    </tbody>
                </table>
            }
        </div>
    )
}