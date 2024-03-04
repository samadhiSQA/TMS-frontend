import { BrowserRouter, Route, Routes } from 'react-router-dom'
import './App.css'
import LoginPage from './pages/login'
import { Toaster } from 'react-hot-toast'
import AdminHomePage from './pages/admin-home'
import Header from './components/header'
import VehicleManagement from './pages/vehicle-management'
import VehicleForm from './pages/vehicle-form'
import AccountManagement from './pages/account-management'
import AccountForm from './pages/account-form'
import VehicleCategoryManagement from './pages/vehicle-category-management'
import VehicleCategoryForm from './pages/vehicle-category-form'
import Redirector from './pages/redirector'

function App() {
  

  return (
    <>
      <BrowserRouter>
      <div className='absolute z-[9999] top-0 w-full flex justify-center items-center'>
        {<Toaster/>}
      </div>
        <Routes>
          <Route path="/" element={<Redirector />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path='/dashboard/*' element={
            <>
              <Header/>
              <Routes>
                <Route path='/admin' element={<AdminHomePage/>} /> 
                <Route path='/vehicle-manager' element={<VehicleManagement/>} />    
                <Route path='/vehicle-form' element={<VehicleForm/>} /> 
                <Route path='/account-management' element={<AccountManagement/>} />   
                <Route path="/account-form" element={<AccountForm/>} />  
                <Route path='/vehicle-category-management' element={<VehicleCategoryManagement/>}   />
                <Route path='/vehicle-category-form' element={<VehicleCategoryForm/>}   />
              </Routes>
            </>
          }/>
        </Routes>
      </BrowserRouter>

    </>
  )
}

export default App
