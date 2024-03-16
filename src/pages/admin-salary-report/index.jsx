import axios from "axios";
import { useEffect, useState } from "react";
import SalarySlip from "../../components/salary-slip";

export default function AdminSalaryReport(){
    const[drivers, setDrivers] = useState([]);
    const[driversLoaded, setDriversLoaded] = useState(false);
    const[selectedDriver, setSelectedDriver] = useState(null);
    useEffect(() => {
        if(!driversLoaded){
            axios.get("http://localhost:8000/api/common_users/drivers").then((res) => {
                setDrivers(res.data);
                setDriversLoaded(true);
            }).catch((err) => {
                console.log(err);
            });
        }
    }, [driversLoaded]);
    return(
        <div className="min-w-full min-h-[100vh] pt-[140px] backdrop-blur-lg flex flex-col flex-wrap items-center">
            <select className="w-1/4 h-10 rounded-md bg-[#FFFFFF70] text-black text-lg font-semibold" value={selectedDriver} onChange={(e) => setSelectedDriver(e.target.value)}>
                <option value="">Select Driver</option>
                {
                    drivers.map((driver, index) => {
                        return(
                            <option key={index} value={driver.username}>{driver.username}</option>
                        )
                    })
                }
            </select>
            {selectedDriver&&<SalarySlip username={selectedDriver} />}
        </div>
    )
}