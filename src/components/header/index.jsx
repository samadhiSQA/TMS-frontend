import { useNavigate } from 'react-router-dom';
import logo from '../../assets/images/logo.png'
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
        <header className="bg-header absolute min-h-[100px] w-full flex flex-row justify-center items-center z-[100]">
            <img src={logo} alt="logo" className='max-h-[70px] cursor-pointer' onClick={navigateHome} />  
            <h1 className="text-white text-2xl ml-3  font-bold cursor-pointer" onClick={navigateHome}>{dashboardName}</h1> 
            <div className='absolute right-4 flex flex-row items-center'>
                <h1 className="text-white text-xl mr-3 font-bold">{user.username}</h1>
                <button className="bg-primary text-white px-3 py-1 rounded-md" onClick={()=>{
                    localStorage.removeItem('user')
                    window.location.href = '/login'
                }}>Logout</button>
                <button className="bg-primary text-white px-3 py-1 ml-4 rounded-md" onClick={()=>{
                    localStorage.removeItem('user')
                    window.location.href = '/login'
                }}>My activities</button>
            </div>         
        </header>
    )
}