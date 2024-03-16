import toast from 'react-hot-toast'
import logo from '../../assets/images/logo.png'
import { useState } from 'react'
import axios from 'axios'
import getDeviceInfo from '../../utils/deviceinfo'
import { useNavigate } from 'react-router-dom'
export default function LoginPage(){
    
    const [username, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const navigate = useNavigate();
    function login(e){
        e.preventDefault()
        const device = getDeviceInfo()
        const region = Intl.DateTimeFormat().resolvedOptions().timeZone
        axios.post('http://localhost:8000/api/common_users/login', {
            username: username,
            password: password,
            device: device.name+' '+device.version+' '+device.os+' '+device.browser,
            region : region
        }).then((response)=>{
            const user = response.data
            toast.success('Login Success')
            localStorage.setItem('user',JSON.stringify(response.data))
            if(user.account_type === 'admin'){
                navigate('/dashboard/admin')
            }else if(user.account_type === 'driver'){
                navigate('/dashboard/driver')
            }else if(user.account_type === 'customer'){
                navigate('/dashboard/customer')
            }
        }).catch((error)=>{            
            toast.error(error.response.data.error)
            
        })
    }
    return(
        <div className="min-w-full min-h-full">            
            <div className="flex justify-center items-center min-h-screen ">
                <div className="backdrop-blur-md p-8 rounded-lg shadow-lg w-96">
                    <div className="w-full flex justify-center items-center">
                        <img src={logo} alt="logo" className="w-40 h-40" />

                    </div>
                    <form className="mt-6" onSubmit={login}>
                        <div className="mb-4">
                            <label htmlFor="username" className="block text-gray-800 font-bold">Username</label>
                            <input  id="username" value={username} onChange={(e) => {
                                setEmail(e.target.value)
                            }} className="w-full p-2 border border-gray-300 rounded mt-1" />
                        </div>
                        <div className="mb-4">
                            <label htmlFor="password" className="block text-gray-800 font-bold">Password</label>
                            <input type="password" id="password" value={password} onChange={(e)=>{
                                setPassword(e.target.value)
                            }} className="w-full p-2 border border-gray-300 rounded mt-1" />
                        </div>
                        <button className="w-full bg-primary hover:bg-secondary text-white font-bold p-3 rounded">Login</button>
                        
                        <div className="mt-4">
                            <span onClick={()=>{
                                navigate('/forget')
                            }} className="text-blue-500">Forget Password?</span>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    )
}