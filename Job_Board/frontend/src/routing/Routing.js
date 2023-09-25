import React from 'react';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import SignIn from '../layouts/SignIn';
import Register from '../layouts/SignUp';
import Dashboard from '../layouts/Dashboard';
import JobPosts from '../components/JobPosts';
import JobCreation from '../components/JobCreation';

const Routing = () => {
    return (
        <>
            <BrowserRouter>
                <Routes>
                    <Route path='/' element={<SignIn />} />
                    <Route path='/register' element={<Register />} />
                    <Route path='/dashboard' element={<Dashboard />} />
                    <Route path='/dashboard/jobcreation' element={<JobCreation />} />
                    <Route path='/dashboard/jobs' element={<JobPosts />} />
                </Routes>
            </BrowserRouter>
        </>
    );
};

export default Routing;
