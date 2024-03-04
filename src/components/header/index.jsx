import logo from '../../assets/images/logo.png'
export default function Header(){
    //get user from localstorage
    const user = JSON.parse(localStorage.getItem('user').toString())
    
    if(user === null)
        window.location.href = '/login'
    var dashboardName = "None";
    console.log(user)
    if(user.account_type === 'admin'){
        dashboardName = "Admin Dashboard"
    }else if(user.account_type === 'customer'){
        dashboardName = "Customer Dashboard"
    }else if(user.account_type === 'driver'){
        dashboardName = "Driver Dashboard"
    }
    return (
        <header className="bg-header absolute min-h-[100px] w-full flex flex-row justify-center items-center z-[100]">
            <img src={logo} alt="logo" className='max-h-[100px]' />  
            <h1 className="text-white text-2xl font-bold">{dashboardName}</h1>          
        </header>
    )
}