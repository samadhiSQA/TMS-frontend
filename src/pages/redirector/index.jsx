import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

export default function Redirector() {
    const navigate = useNavigate();
    useEffect(() => {
        navigate('/dashboard/admin');
    }, [navigate]);
    return null;
}