import React, { useState, useEffect } from 'react';
import '@fortawesome/fontawesome-free/css/all.css';
import '../assets/css/JobPosts.css';
import { useNavigate } from 'react-router-dom';
import Cards from './Cards';
import NavBar from "./NavBar";
import JobData from '../services/JobsData';

const JobPosts = () => {
    const navigate = useNavigate();
    const [UserName, setUserName] = useState("");
    const [UserEmail, setUserEmail] = useState("");
    const [UserID, setUserID] = useState("");
    const [jobs, setJobs] = useState([]);
    const [searchTerm, setSearchTerm] = useState('');
    const [filterTerm, setFilterTerm] = useState('');

    const authentication = async (token) => {
        const result = await JobData.Authentication(token);
        console.log("froned result", result)
        if (result.data.message === 'authenticated user') {
            console.log("UserIDID:", result.data)
            setUserName(result.data.result.UserName)
            setUserID(result.data.result.UserID)
            setUserEmail(result.data.result.UserEmail)
            fetchJobsFromBackend()
        }
        else {
            navigate('/')
        }
    }

    const create = () => {
        navigate('/dashboard/jobcreation');
    }

    const fetchJobsFromBackend = async () => {
        try {
            const response = await JobData.JobDataAll();
            const newData = response.data.alljobs;
            console.log(newData);
            setJobs(newData);
        } catch (error) {
            console.error('Error fetching data: ', error);
        }
    };

    useEffect(() => {
        const token = sessionStorage.getItem("authToken");
        authentication(token)

    }, []);

    const filteredJobs = jobs.filter((job) => {
        return (
            job.JobTitle.toLowerCase().includes(searchTerm.toLowerCase()) &&
            (filterTerm === '' || job.Location.toLowerCase().includes(filterTerm.toLowerCase()))
        );
    });

    return (
        <div>
            <div className="container">
                <NavBar UserName={UserName} />
            </div>
            <div className='container'>
                <h1>Apply For A Job</h1>
                <div className='searchbg'>
                    <div className="search-bar">
                        <input
                            type="text"
                            placeholder="Search jobs by title"
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                        />
                        <h4>Search Jobs!</h4>
                        <input
                            type="text"
                            placeholder="Filter by location"
                            value={filterTerm}
                            onChange={(e) => setFilterTerm(e.target.value)}
                        />
                    </div>
                </div>
            </div>
            <div className="container">
                {filteredJobs.length === 0 ? (
                    <div className='container'>
                        <table className="table">
                            <thead>
                                <tr>
                                    <th colSpan={9} className='nojobsfound'>No Jobs Found!</th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr>
                                    <td colSpan={9} className='nojobsfound'>
                                        <button onClick={create}>Create a Job!</button>
                                    </td>
                                </tr>
                            </tbody>
                        </table>

                    </div>
                ) : (filteredJobs.map((job) => (
                    <Cards
                        job={job} UserEmail={UserEmail} UserID={UserID} UserName={UserName}
                    />
                )))}

            </div>
        </div>
    );
};

export default JobPosts;
