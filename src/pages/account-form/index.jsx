import axios from "axios";
import { useState } from "react";

export default function AccountForm() {
    const [username, setUsername] = useState('');
    const [name, setName] = useState('');
    const [accountType, setAccountType] = useState('admin'); // Default value
    const [address, setAddress] = useState('');
    const [phone, setPhone] = useState('');
    const [email, setEmail] = useState('');
    const [salary, setSalary] = useState('');

    const handleUsernameChange = (e) => {
        setUsername(e.target.value);
    };

    const handleNameChange = (e) => {
        setName(e.target.value);
    };

    const handleAccountTypeChange = (e) => {
        setAccountType(e.target.value);
    };

    const handleAddressChange = (e) => {
        setAddress(e.target.value);
    };

    const handlePhoneChange = (e) => {
        setPhone(e.target.value);
    };

    const handleEmailChange = (e) => {
        setEmail(e.target.value);
    };

    const handleSalaryChange = (e) => {
        setSalary(e.target.value);
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        // Handle form submission here
        const formData = {
            username,
            name,
            accountType,
            address,
            phone,
            email,
            salary
        };
        console.log(formData); // For demonstration, you can replace this with your submission logic
        axios.post("http://localhost:8000/api/common_users", formData).then((res) => {
            console.log(res);
        }).catch((err) => {
            console.log(err);
        }
        );
    };

    return (
        <div className="pt-[100px] flex flex-col items-center backdrop-blur-lg h-[100vh] relative">
            <h1 className="text-white pt-2 text-xl font-bold">Account Form</h1>
            <form className="w-[400px] rounded-md mt-4" onSubmit={handleSubmit}>
                <div className="flex flex-col">
                    <label className="text-black text-lg">Username</label>
                    <input type="text" className="bg-[#FFFFFF70] rounded-md p-2" value={username} onChange={handleUsernameChange} />
                </div>
                <div className="flex flex-col">
                    <label className="text-black text-lg">Name</label>
                    <input type="text" className="bg-[#FFFFFF70] rounded-md p-2" value={name} onChange={handleNameChange} />
                </div>
                


                <div className="flex flex-col">
                    <label className="text-black text-lg">Account Type</label>
                    <select className="bg-[#FFFFFF70] rounded-md p-2" value={accountType} onChange={handleAccountTypeChange}>
                        <option value="admin">Admin</option>
                        <option value="customer">Customer</option>
                        <option value="driver">Driver</option>
                    </select>
                </div>
                {accountType=="customer"&&<>
                <div className="flex flex-col">
                    <label className="text-black text-lg">Address</label>
                    <input type="text" className="bg-[#FFFFFF70] rounded-md p-2" value={address} onChange={handleAddressChange} />
                </div>
                <div className="flex flex-col">
                    <label className="text-black text-lg">Phone</label>
                    <input type="text" className="bg-[#FFFFFF70] rounded-md p-2" value={phone} onChange={handlePhoneChange} />
                </div>
                <div className="flex flex-col">
                    <label className="text-black text-lg">Email</label>
                    <input type="text" className="bg-[#FFFFFF70] rounded-md p-2" value={email} onChange={handleEmailChange} />
                </div>
                </>}
                {accountType=="driver"&&<>
                <div className="flex flex-col">
                    <label className="text-black text-lg">Salary</label>
                    <input type="text" className="bg-[#FFFFFF70] rounded-md p-2" value={salary} onChange={handleSalaryChange} />
                </div>
                </>}
                
                <button type="submit" className="bg-primary text-white py-2 rounded-md my-2 w-full">Submit</button>                
            </form>
        </div>        
    );
}
