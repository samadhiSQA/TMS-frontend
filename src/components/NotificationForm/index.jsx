import axios from 'axios'
import PropTypes from 'prop-types'
import { useState } from 'react'
import toast from 'react-hot-toast'
export default function NotificationForm({notification , user , setNotificationForm , afterSubmission}){
    if(!user || user.account_type !== 'admin'){
        window.location.href = '/dashboard'
    }
    
    const [title,setTitle] = useState(notification ? notification.title :'')
    const [body,setBody] = useState(notification ? notification.body : '')
    function handleSubmit(){
        if(notification){
            //update notification
        }else{
            axios.post('http://localhost:8000/api/notifications', {
                "title" : title,
                "body" : body,
                "username" : user.username
            }).then((res) => {
                console.log(res.data);
                setNotificationForm(false)
                toast.success(
                    "Notification sent successfully",
                )
                afterSubmission()
                setNotificationForm(false)
            }).catch((err) => {
                console.log(err);
            });
        }
    }
    return(
        <div className="fixed top-0 left-0 w-full h-full bg-black bg-opacity-50 flex justify-center items-center" >
            <div className="bg-white w-1/2  rounded-md p-4 flex flex-col" >
                <h1 className="text-primary text-lg font-bold">Send Notification</h1>
                <div className="flex flex-col">
                    <input type="text" value={title} onChange={(e)=>setTitle(e.target.value)} className="bg-[#FFFFFF70] rounded-md p-2 my-2" placeholder="Title" />
                    <textarea maxLength={144} value={body} onChange={(e)=>{setBody(e.target.value)}} className="bg-[#FFFFFF70] rounded-md p-2 my-2" placeholder="Body"></textarea>
                    <button className="bg-primary text-white px-3 py-1 rounded-md" type="submit" onClick={handleSubmit}>Send</button>
                    <button className="bg-red-600 mt-2 text-white px-3 py-1 rounded-md" onClick={()=>{setNotificationForm(false)}
                    }>Cancel</button>
                </div>
            </div>
        </div>
    )
}
NotificationForm.propTypes = {
    notification: PropTypes.object,
    user: PropTypes.object,
    setNotificationForm: PropTypes.func,
    afterSubmission : PropTypes.func
}
//default afterSubmission function
NotificationForm.defaultProps = {
    afterSubmission : ()=>{}
}