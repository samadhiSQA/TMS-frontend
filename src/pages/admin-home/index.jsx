import { Link } from "react-router-dom";

export default function AdminHomePage() {
    return(
        <div className="min-w-full min-h-[100vh] pt-[100px] backdrop-blur-lg flex flex-wrap justify-center items-center">
            <Link to={"/dashboard/vehicle-manager"} className="w-60 h-60 rounded-md hover:bg-white bg-[#FFFFFF70] flex flex-col justify-center items-center cursor-pointer m-5">
                <img src="https://utfs.io/f/c9efc901-f274-4881-9260-b723a456afe2-5nl67k.png" alt="store" className="w-40 h-40" />
                <h1 className=" text-xl font-bold pt-6">Vehicle management</h1>
            </Link>
            <Link to={"/dashboard/account-management"} className="w-60 h-60 rounded-md hover:bg-white bg-[#FFFFFF70] flex flex-col justify-center items-center cursor-pointer m-5">
                <img src="https://utfs.io/f/887f10fa-85a8-41b7-9e7f-101b491f7841-74i1xo.com.png" alt="store" className="w-40 h-40" />
                <h1 className=" text-xl font-bold pt-6">User management</h1>
            </Link>

        </div>
    )
}