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
import VehicleRepairManagement from './pages/vehicle-repair-management'
import VehicleRepairForm from './pages/vehicle-repair-form'
import DriverLeaveManagement from './pages/driver-leave-management'
import DriverLeaveForm from './pages/driver-leave-form'
import AdminLeaveRequestManagement from './pages/admin-leave-request-management'
import CustomerHomePage from './pages/customer-home-page'
import CustomerBookingForm from './pages/customer-booking-form'
import CustomerBookingManagement from './pages/customer-booking-management'
import DriverAdvanceRequestManagement from './pages/driver-advance-request-management'
import DriverAdvanceRequestForm from './pages/driver-advance-request-form'
import AdminAdvanceRequestManagement from './pages/admin-advance-request-management'
import PaymentPage from './pages/payment-page'
import BookingInvoice from './pages/booking-invoice'
import AdminBookingManagement from './pages/admin-booking-management'
import LoginActivity from './pages/login-activity'
import AccountInfo from './pages/account-info'
import AdminSalaryReport from './pages/admin-salary-report'
import ForgetPasswordPage from './pages/forget-password-page'
import GetHelpPage from './pages/help-page'
import AdminHelpPage from './pages/admin-help-page'
import SalarySlip from './components/salary-slip'
import DriverDashboard from './pages/driver-dashboard'
//get user
const userString = localStorage.getItem("user");
var user = null;
if(userString){
  user = JSON.parse(userString);
}
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
          <Route path='/forget' element={<ForgetPasswordPage/>} />
          <Route path='/dashboard/*' element={
            <>
              <Header/>
              <Routes>
                <Route path='/admin' element={<AdminHomePage/>} /> 
                <Route path='/vehicle-manager' element={<VehicleManagement/>} />    
                <Route path='/vehicle-form' element={<VehicleForm/>} /> 
                <Route path='/account-management' element={<AccountManagement/>} /> 
                <Route path='/salary-reports' element={<AdminSalaryReport/>} /> 
                <Route path='/admin_help' element={<AdminHelpPage/>} />

                <Route path="/account-form" element={<AccountForm/>} />  
                <Route path='/vehicle-category-management' element={<VehicleCategoryManagement/>}   />
                <Route path='/vehicle-category-form' element={<VehicleCategoryForm/>}   />
                <Route path='vehicle-repair-management' element={<VehicleRepairManagement/>}/>
                <Route path='/vehicle-repair-form' element={<VehicleRepairForm/>}/>
                <Route path='/pending-leave-requests' element={<AdminLeaveRequestManagement/>} />
                <Route path='/pending-advance-requests' element={<AdminAdvanceRequestManagement/>} />
                <Route path='/admin-booking-management' element={<AdminBookingManagement/>} />
                <Route path='/login-activities/*' element={<LoginActivity/>} />
                <Route path='/account-info' element={<AccountInfo/>} />
                <Route path='/driver' element={<DriverDashboard/>} />
                <Route path='/driver-leave-request-management' element={<DriverLeaveManagement/>} />
                <Route path='/driver-leave-request-form' element={<DriverLeaveForm/>} />
                <Route path='/driver-advance-request-management' element={<DriverAdvanceRequestManagement/>} />
                <Route path='/driver-advance-request-form' element={<DriverAdvanceRequestForm/>} />
                

                <Route path='/customer' element={<CustomerHomePage/>} />
                <Route path='/customer-booking-form' element={<CustomerBookingForm/>} />
                <Route path='/customer-booking-history' element={<CustomerBookingManagement/>} />
                <Route path='/customer-help' element={<GetHelpPage/>} />

                <Route path='/payment' element={<PaymentPage/>} />
                <Route path='/salary' element={
                  <div className='w-full min-h-[100vh] flex justify-center items-center bg-black'>
                    <SalarySlip username={user?.username}/>
                  </div>
                }/>
              </Routes>
            </>
          }/>
          <Route path='/booking-invoice/*' element={<BookingInvoice/>} />
        </Routes>
      </BrowserRouter>

    </>
  )
}

export default App
