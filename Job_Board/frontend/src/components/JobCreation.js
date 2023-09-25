import React, { useState, useEffect } from 'react';
import { Button, Modal, Form } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import "../assets/css/JobCreation.css"
import { useNavigate } from 'react-router-dom';
import NavBar from "./NavBar";
import { ToastContainer, toast } from "react-toastify";
import '../assets/css/JobCreation.css'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrashAlt, faEdit } from '@fortawesome/free-solid-svg-icons';
import JobData from "../services/JobsData"

const JobCreation = () => {
    useEffect(() => {
        initialization();
    }, []);

    const initialization = () => {
        const token = sessionStorage.getItem("authToken");
        authentication(token);
    }

    const navigate = useNavigate();
    const [UserName, setUserName] = useState("")
    const [UserID, setUserID] = useState("")
    const [jobs, setJobs] = useState([]);
    const [searchTerm, setSearchTerm] = useState('');
    const [filterTerm, setFilterTerm] = useState('');
    const [showModal, setShowModal] = useState(false);
    const [formData, setFormData] = useState({
        CompanyName: '',
        CreatedBy: '',
        JobTitle: '',
        Package: '',
        JobDescription: '',
        RequiredEducation: '',
        RequiredExperience: '',
        RequiredSkills: '',
        Location: '',
    });

    const filteredJobs = jobs.filter((job) => {
        return (
            job.JobTitle.toLowerCase().includes(searchTerm.toLowerCase()) &&
            (filterTerm === '' || job.Location.toLowerCase().includes(filterTerm.toLowerCase()))
        );
    });

    const authentication = async (token) => {
        const result = await JobData.Authentication(token);
        if (result.data.message === 'authenticated user') {
            setUserName(result.data.result.UserName);
            setUserID(result.data.result.UserID);
            fetchJobsFromBackend(result.data.result.UserID);
        }
        else {
            navigate('/')
        }

    }


    const fetchJobsFromBackend = async (UserID) => {
        try {
            const response = await JobData.OwnJobData(UserID);
            const newData = response.data.alljobs;
            setJobs(newData);
        } catch (error) {
            console.error('Error fetching data: ', error);
        }
    };

    const handleDelete = async (job) => {
        try {
            const deleterecord = await JobData.Deletedata(job);
            if (deleterecord.data === 'Record deleted successfully') {
                toast.success("Record deleted successfully.", {
                    position: toast.POSITION.TOP_RIGHT,
                });
                setTimeout(() => {
                    initialization();
                }, 500);
            }
        }
        catch (err) {
            console.log(err)
        }
    }

    const handleEdit = (job) => {
        console.log('edit job:', job);
    }

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });

    };

    const handleSubmit = async () => {
        const data = {
            UserID: UserID,
            formData: formData,
        };
        const RegistrationData = await JobData.RegisterJobData(data);
        if (RegistrationData.data.message === 'job created') {
            setShowModal(false);
            toast.success("Job Created Successfully", {
                position: toast.POSITION.TOP_RIGHT,
            });
            setTimeout(() => {
                initialization();
                setFormData("")
            }, 500);
        }
    };

    return (
        <div>
            <div className="container">
                <NavBar UserName={UserName} />
            </div>
            <div className="container">
                <h1>Created Jobs</h1>
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
                <table className="table">
                    <thead>
                        <tr>
                            <th>Company Name</th>
                            <th>Job Title</th>
                            <th>Package</th>
                            <th>Job Description</th>
                            <th>Required Education</th>
                            <th>RequiredSkills</th>
                            <th>RequiredExperience</th>
                            <th>Location</th>
                            <th>Actions</th>
                        </tr>
                    </thead>
                    {filteredJobs.length === 0 ? (<tbody>
                        <td colSpan='9'>
                            Create a job by clicking the button below!
                        </td>
                    </tbody>) : (<tbody>
                        {filteredJobs.map((job) => (
                            <tr key={job.id}>
                                <td>{job.CompanyName}</td>
                                <td>{job.JobTitle}</td>
                                <td>{job.Package}</td>
                                <td>{job.JobDescription}</td>
                                <td>{job.RequiredEducation}</td>
                                <td>{job.RequiredSkills}</td>
                                <td>{job.RequiredExperience}</td>
                                <td>{job.Location}</td>
                                <td>
                                    <div className='dlt-edt-icon'>
                                        <FontAwesomeIcon icon={faEdit} onClick={() => handleEdit(job)} />
                                        <FontAwesomeIcon icon={faTrashAlt} onClick={() => handleDelete(job)} />
                                    </div>
                                </td>
                            </tr>
                        ))}
                    </tbody>)}

                </table>

                <Button variant="primary" onClick={() => setShowModal(true)}>
                    Create Job
                </Button>
                <ToastContainer />
            </div>

            <Modal show={showModal} onHide={() => setShowModal(false)} className="custom-modal"
                dialogClassName="modal-50w">


                <Modal.Header closeButton>
                    <h1>Create a Job</h1>
                </Modal.Header>
                <Modal.Body>
                    <Form>
                        <Form.Group controlId="CompanyName">
                            <Form.Label>Company Name</Form.Label>
                            <Form.Control
                                type="text"
                                name="CompanyName"
                                placeholder='ex:JMAN'
                                value={formData.CompanyName}
                                onChange={handleInputChange}
                            />
                        </Form.Group>
                        <Form.Group controlId="JobTitle">
                            <Form.Label>JobTitle</Form.Label>
                            <Form.Control
                                type="text"
                                name="JobTitle"
                                placeholder='ex:Web Developer'
                                value={formData.JobTitle}
                                onChange={handleInputChange}
                            />
                        </Form.Group>
                        <Form.Group controlId="Package">
                            <Form.Label>Package</Form.Label>
                            <Form.Control
                                type="text"
                                name="Package"
                                placeholder='ex:2'
                                value={formData.Package}
                                onChange={handleInputChange}
                            />
                        </Form.Group>

                        <Form.Group controlId="JobDescription">
                            <Form.Label>Job Description</Form.Label>
                            <Form.Control
                                type="text"
                                name="JobDescription"
                                placeholder='Description'
                                value={formData.JobDescription}
                                onChange={handleInputChange}
                            />
                        </Form.Group>
                        <Form.Group controlId="RequiredEducation">
                            <Form.Label>Required Education </Form.Label>
                            <Form.Control
                                type="text"
                                name="RequiredEducation"
                                placeholder='ex:B.E/Btech'
                                value={formData.RequiredEducation}
                                onChange={handleInputChange}
                            />
                        </Form.Group>
                        <Form.Group controlId="RequiredSkills">
                            <Form.Label>RequiredSkills</Form.Label>
                            <Form.Control
                                type="text"
                                name="RequiredSkills"
                                value={formData.RequiredSkills}
                                placeholder='ex:python,java'
                                onChange={handleInputChange}
                            />
                        </Form.Group>
                        <Form.Group controlId="RequiredExperience">
                            <Form.Label>RequiredExperience</Form.Label>
                            <Form.Control
                                type="text"
                                name="RequiredExperience"
                                placeholder='ex:3'
                                value={formData.RequiredExperience}
                                onChange={handleInputChange}
                            />
                        </Form.Group>
                        <Form.Group controlId="Location">
                            <Form.Label>Location</Form.Label>
                            <Form.Control
                                type="text"
                                name="Location"
                                placeholder='ex:chennai'
                                value={formData.Location}
                                onChange={handleInputChange}
                            />
                        </Form.Group>


                    </Form>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="primary" onClick={handleSubmit}>
                        Create Job
                    </Button>
                </Modal.Footer>
            </Modal>
        </div>
    );
};

export default JobCreation;
