import axios from "axios";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";

export default function GetHelpPage(){
    //get user
    const userString = localStorage.getItem("user");
    const user = JSON.parse(userString);
    const [loading,setLoading] = useState(false)
    const [tickets , setTickets] = useState([])
    const [ticketsLoaded,setTicketsLoaded] = useState(false)
    const [ticket,setTicket] = useState("")

    useEffect(
        ()=>{
            if(!ticketsLoaded){
                axios.get('http://localhost:8000/api/helps/by_username',{
                    params:{
                        username:user.username
                    }
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
                <h1 className="text-2xl font-bold">Get Help</h1>
                <div className="w-full flex flex-col justify-center items-center">
                    <div className="w-1/2 flex flex-col justify-center items-center">
                        <h1 className="text-xl text-white text-center">Write your complain or request</h1>
                        <textarea type="text" className="mb-4 w-full h-10 rounded-md bg-[#FFFFFF70] text-black text-lg font-semibold" value={ticket} onChange={(e)=>{
                            setTicket(e.target.value)
                        }}/>
                    </div>
                </div>
                <div className="w-full flex flex-col justify-center items-center">
                    <button className="w-1/2 h-10 rounded-md bg-primary text-white text-lg font-semibold"
                    onClick={()=>{
                        setLoading(true)
                        axios.post('http://localhost:8000/api/helps',{
                            username:user.username,
                            ticket:ticket
                        }).then(()=>{
                            setLoading(false)
                            toast.success("Ticket created successfully")
                            setTicketsLoaded(false)
                        }).catch((err)=>{
                            setLoading(false)
                            console.log(err)
                            toast.error("Error creating ticket")
                        })
                    }}>Create Ticket</button>
                </div>
                {
                    ticketsLoaded&&<div className="w-full flex flex-col justify-center items-center">
                        <h1 className="text-xl font-bold">Tickets</h1>
                        <table className="w-full bg-[#ffffff70]">
                            <thead>
                                <tr>
                                    <th className="text-center">Ticket</th>
                                    <th className="text-center">Status</th>
                                </tr>
                            </thead>
                            <tbody>
                                {
                                    tickets.map((ticket,index)=>{
                                        return(
                                            <tr key={index} className="hover:bg-white cursor-pointer">
                                                <td className="text-center ">{ticket.ticket}</td>
                                                <td className="text-center">{ticket.reply}</td>
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