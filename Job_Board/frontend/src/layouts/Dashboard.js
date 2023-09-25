import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import "../assets/css/dashboard.css"
import NavBar from "../components/NavBar";
import JobCreateCard from '../components/JobCreateCard';
import JobSeacrhCard from '../components/JobSearchCard';
import '../assets/css/dashboard.css'

const Dashboard = () => {
    const [UserName, setUserName] = useState("");
    const navigate = useNavigate();
    const authentication = async (token) => {
        let result = await axios.post("http://localhost:8080/jobs/authentication/", { token })
        console.log("froned result", result)
        if (result.data.message === 'authenticated user') {
            setUserName(result.data.result.UserName)
            navigate("/dashboard")
        }
        if (result.data.message === 'invalid user') {
            navigate("/")
        }
    }

    useEffect(() => {
        const token = sessionStorage.getItem("authToken");
        authentication(token)
    }, []);

    return (
        <>
            <div className="container">
                <NavBar UserName={UserName} />
            </div>
            <div className='dashboardheading'>
                <h1>JMAN Job Board</h1>
            </div>
            <div className='container dashboardcards'>
                <JobSeacrhCard />
                <JobCreateCard />
            </div>
        </>
    );
};

export default Dashboard;