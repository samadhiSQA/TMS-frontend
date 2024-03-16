import axios from "axios";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";

export default function AdminHelpPage(){
    //get user
    
    const [loading,setLoading] = useState(false)
    const [tickets , setTickets] = useState([])
    const [ticketsLoaded,setTicketsLoaded] = useState(false)
    

    useEffect(
        ()=>{
            if(!ticketsLoaded){
                axios.get('http://localhost:8000/api/helps',{
                }).then((res)=>{
                    setTickets(res.data)
                    setTicketsLoaded(true)
                }).catch((err)=>{
                    console.log(err)
                })
            }
        }
    )

    return(
        <>
        <div className="min-w-full min-h-[100vh] flex justify-center items-center ">
            <div className="w-1/3 h-1/2 flex flex-col justify-center items-center">
                <h1 className="text-2xl font-bold">Reply Help</h1>
                
                
                {
                    ticketsLoaded&&<div className="w-full flex flex-col justify-center items-center">
                        <h1 className="text-xl font-bold">Tickets</h1>
                        <table className="w-full bg-[#ffffff70]">
                            <thead>
                                <tr>
                                    <th className="text-center">Ticket</th>
                                    <th className="text-center">Status</th>
                                    <th className="text-center"></th>
                                </tr>
                            </thead>
                            <tbody>
                                {
                                    tickets.map((ticket,index)=>{
                                        return(
                                            <tr key={index} className="hover:bg-white cursor-pointer">
                                                <td className="text-center ">{ticket.ticket}</td>
                                                <td className="text-center">{ticket.reply}</td>
                                                <td className="text-center"><button className="bg-primary text-white px-3 py-1 rounded-md" onClick={()=>{
                                                    //get text from alert
                                                    if(confirm("Are you sure you want to reply this ticket"))
                                                        return
                                                    const reply = prompt("Enter your reply")
                                                    axios.put('http://localhost:8000/api/helps/',{
                                                        id:ticket.id,
                                                        reply:reply
                                                    }).then(()=>{
                                                        setLoading(false)
                                                        toast.success("Ticket replied successfully")
                                                        setTicketsLoaded(false)
                                                    }).catch((err)=>{
                                                        setLoading(false)
                                                        console.log(err)
                                                        toast.error("Error replying ticket")
                                                    })
                                                }}>Reply</button></td>
                                            </tr>
                                        )
                                    })
                                }
                            </tbody>
                        </table>
                        
                    </div>
                }
            </div>
        </div>
        {
            loading&&<div className="w-full h-full bg-black bg-opacity-50 fixed top-0 left-0 z-[999] flex justify-center items-center">
                <span className="min-w-12 min-h-12  rounded-full border-t-4 border-primary animate-spin"></span>
            </div>
        }
        </>
    )

}