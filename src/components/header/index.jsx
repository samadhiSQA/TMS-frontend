import { NavLink, useNavigate } from 'react-router-dom';
import logo from '../../assets/images/logo.png'

import NotificationIcon from '../NotificationIcon';
import LeaveRequestCountBubble from '../LeaveRequestCountBubble';
import AdvanceRequestCountBubble from '../AdvanceRequestCountBubble';
export default function Header(){
    //get user from localstorage
    const userString = localStorage.getItem('user')
    
    
    if(userString === null)
        window.location.href = '/login'
    const user = JSON.parse(localStorage.getItem('user').toString())
    var dashboardName = "None";
    console.log(user)
    if(user.account_type === 'admin'){
        dashboardName = "Admin Dashboard"
    }else if(user.account_type === 'customer'){
        dashboardName = "Customer Dashboard"
    }else if(user.account_type === 'driver'){
        dashboardName = "Driver Dashboard"
    }
    const navigate = useNavigate();
    const navigateHome = ()=>{
        if(user.account_type === 'admin'){
            navigate('/dashboard/admin')
        }else if(user.account_type === 'customer'){
            navigate('/customer')
        }else if(user.account_type === 'driver'){
            navigate('/driver')
        }
    }
    return (
        <>
            <header className="bg-header absolute min-h-[100px] w-full flex flex-row justify-center items-center z-[100]">
                <img src={logo} alt="logo" className='max-h-[70px] cursor-pointer' onClick={navigateHome} />  
                <h1 className="text-white text-2xl ml-3  font-bold cursor-pointer" onClick={navigateHome}>{dashboardName}</h1> 
                <div className='absolute right-4 flex flex-row items-center'>
                    <h1 className="text-white text-xl mr-3 font-bold hover:text-primary cursor-pointer" onClick={()=>{
                        navigate('/dashboard/account-info')
                    }}>{user.username}</h1>
                    <NotificationIcon />
                    <button className="bg-primary text-white px-3 py-1 rounded-md" onClick={()=>{
                        localStorage.removeItem('user')
                        window.location.href = '/login'
                    }}>Logout</button>
                    <button className="bg-primary text-white px-3 py-1 ml-4 rounded-md" onClick={()=>{
                        navigate('/dashboard/login-activities?username='+user.username)
                    }}>My activities</button>
                </div>                    
            </header>
            <div className='w-full absolute z-[99] flex justify-center items-center mt-[100px]  h-[40px] bg-white '>
                    {user.account_type === 'admin' &&
                        <>
                        <NavLink to={"/dashboard/vehicle-manager"} className="text-primary text-xl font-bold cursor-pointer m-3 hover:text-secondary">Vehicles</NavLink>
                        <NavLink to={"/dashboard/account-management"} className="text-primary text-xl font-bold cursor-pointer m-3 hover:text-secondary">Users</NavLink>
                        <NavLink to={"/dashboard/vehicle-category-management"} className="text-primary text-xl font-bold cursor-pointer m-3 hover:text-secondary">Categories</NavLink>
                        <NavLink to={"/dashboard/pending-leave-requests"} className="text-primary text-xl font-bold cursor-pointer m-3 hover:text-secondary relative">Leave Requests <LeaveRequestCountBubble/></NavLink>
                        <NavLink to={"/dashboard/pending-advance-requests"} className="text-primary text-xl font-bold cursor-pointer m-3 hover:text-secondary relative">Advance Requests <AdvanceRequestCountBubble/></NavLink>
                        <NavLink to={"/dashboard/admin-booking-management"} className="text-primary text-xl font-bold cursor-pointer m-3 hover:text-secondary">Bookings</NavLink>
                        <NavLink to={"/dashboard/salary-reports"} className="text-primary text-xl font-bold cursor-pointer m-3 hover:text-secondary">Salary reports</NavLink>
                        <NavLink to={"/dashboard/admin_help"} className="text-primary text-xl font-bold cursor-pointer m-3 hover:text-secondary">Help</NavLink>
                        </>
                    }
                    {user.account_type === 'driver' &&
                        <>
                        <NavLink to={"/dashboard/driver-leave-request-management"} className="text-primary text-xl font-bold cursor-pointer m-3 hover:text-secondary">Leave Requests</NavLink>
                        <NavLink to={"/dashboard/driver-advance-request-management"} className="text-primary text-xl font-bold cursor-pointer m-3 hover:text-secondary">Advance Requests</NavLink>
                        <NavLink to={"/dashboard/salary"} className="text-primary text-xl font-bold cursor-pointer m-3 hover:text-secondary">Salary sheet</NavLink>
                        </>
                    }
                    {user.account_type === 'customer' &&
                        <>
                        <NavLink to={"/dashboard/customer"} className="text-primary text-xl font-bold cursor-pointer m-3 hover:text-secondary">Home</NavLink>
                        <NavLink to={"/dashboard/customer-booking-form"} className="text-primary text-xl font-bold cursor-pointer m-3 hover:text-secondary">Booking</NavLink>
                        <NavLink to={"/dashboard/customer-booking-history"} className="text-primary text-xl font-bold cursor-pointer m-3 hover:text-secondary">Booking History</NavLink>
                        <NavLink to={"/dashboard/customer-help"} className="text-primary text-xl font-bold cursor-pointer m-3 hover:text-secondary">Get Help</NavLink>
                        </>
                    }
            </div>
        </>
    )
}