import axios from "axios";
import { useEffect, useState } from "react";
import logo from "../../assets/images/logo.png";
import PropTypes from 'prop-types';
export default function SalarySlip({username}){
    const [salarySlip, setSalarySlip] = useState(null);
    const [salarySlipLoaded, setSalarySlipLoaded] = useState(false);
    var reductions = 0;
    useEffect(() => {
        if(!salarySlipLoaded){
            axios.get(`http://localhost:8000/api/common_users/salary_slip`,{
                params : {
                    username : username
                }            
            }).then((res) => {
                console.log(res);
                setSalarySlip(res.data);
                setSalarySlipLoaded(true);
            }).catch((err) => {
                console.log(err);
            });
            setSalarySlipLoaded(true);
        }
    }, [salarySlipLoaded, username]);
    return(
        <div className="w-[300px] bg-white rounded-md p-4">
            {salarySlip&&
            <>
            <div className="border-b-2 border-t-2 border-black flex flex-row justify-center items-center">
                <img src={logo} alt="logo" className="w-[80px] " />
                <h1 className="text-lg font-semibold ml-2">Salary Slip</h1>
            </div>
            <div className="border-b-2 border-t-2 border-black flex flex-row justify-center items-center">
                <h1 className="text-lg font-semibold">Name: {salarySlip.driver.username}</h1>
            </div>
            <div className="border-b-2 border-t-2 border-black flex flex-col justify-center items-center">
                <h1 className="text-lg font-semibold w-full">Leaves</h1>
                {
                    salarySlip.leaves.map((leave, index) => {
                        reductions+=(salarySlip.driver.salary/30);
                        return(
                            <div key={index} className="flex flex-row justify-center items-center w-full">
                                <span className="text-lg w-full">{leave.date}</span>
                                <span>-{(salarySlip.driver.salary/30).toFixed(2)}</span>
                            </div>
                        )
                    })
                }
            </div>
            <div className="border-b-2 border-t-2 border-black flex flex-col justify-center items-center">
            <h1 className="text-lg font-semibold w-full">Advance Payments</h1>
                {
                    salarySlip.advances.map((advance, index) => {
                        reductions+=Number(advance.amount);
                        return(
                            <div key={index} className="flex flex-row justify-center items-center w-full">
                                <span className="text-lg w-full">{advance.date}</span>
                                <span>-{advance.amount}</span>
                            </div>
                        )
                    })
                }
            </div>
            <div className="border-b-2 border-t-2 border-black flex flex-row justify-center items-center">
                <h1 className="text-lg font-semibold w-full">Total</h1>
                <span>{(salarySlip.driver.salary- reductions).toFixed(2)}</span>
                
            </div>

            
            
            </>

            }
        </div>
    )
    
}
SalarySlip.propTypes = {
    username: PropTypes.string.isRequired
}