import React, { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import { FaMapMarkerAlt } from 'react-icons/fa';
import { ToastContainer, toast } from "react-toastify";
import '../assets/css/card.css';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';


const Cards = (props) => {

    const navigate = useNavigate()
    const [isRegistered, setIsRegistered] = useState("");

    const buttonName = (state) => {
        if (state === 'User already registered') {
            return 'Registered'
        }
        if (state === 'created by you') {
            return 'Own'
        }
        else {
            return 'Apply'
        }

    }
    const handleConfirmApply = async (data) => {
        try {
            console.log("data:", data);
            const RegisterRequest = await axios.post(
                "http://localhost:8080/jobs/jobApplication", data)
            if (RegisterRequest.data.message === 'Event created successfully') {
                toast.success("Successfully Applied.", {
                    position: toast.POSITION.TOP_RIGHT,
                });
                const SendMail = await axios.post(
                    "http://localhost:8080/jobs/appliedmail", data)
                if (SendMail.data.message === 'mail sent') {
                    toast.success("Check your mail inbox for further process.", {
                        position: toast.POSITION.TOP_RIGHT,
                    });
                }
                else {
                    toast.warning("Applied but unable to send mail to you.", {
                        position: toast.POSITION.TOP_RIGHT,
                    });
                }
                setTimeout(() => {
                    navigate("/dashboard/jobs/");
                }, 2000);
            }
            if (RegisterRequest.data.message === "User already registered") {
                toast.warning("Already Registered", {
                    position: toast.POSITION.TOP_RIGHT,
                });
                setIsRegistered("User already registered");
            }
            if (RegisterRequest.data.message === "created by you") {
                toast.warning("You cannot apply for the job you created.", {
                    position: toast.POSITION.TOP_RIGHT,
                });
                setIsRegistered("created by you");
            }
        }
        catch (error) {
            console.log("error:", error)
        }
    };
    const createdDate = new Date(props.job.createdAt);

    return (
        <>
            <Card className="w-100 mb-3">
                <Card.Header as="h5">
                    <Row>
                        <Col>{props.job.CompanyName}</Col>
                        <Col></Col>
                        <Col></Col>
                        <Col></Col>
                        <Col className="text-right">{`Active ${Math.floor(
                            (new Date() - createdDate) / (1000 * 60 * 60 * 24)
                        )} days ago`}</Col>
                    </Row>
                </Card.Header>
                <Card.Body>
                    <Card.Title className='card-title-cards'>{props.job.JobTitle}</Card.Title>

                    <Card.Text>
                        <Row className="mb-2">
                            <Col className="location">
                                <FaMapMarkerAlt />
                                {props.job.Location}
                            </Col>
                        </Row>
                        <Row className="mb-2">
                            <Col>
                                <strong>Required Skills:</strong> {props.job.RequiredSkills}
                            </Col>
                            <Col>
                                <strong>Required Experience:</strong> {props.job.RequiredExperience}
                            </Col>
                        </Row>
                        <Row className="mb-2">
                            <Col>
                                <strong>LPA Upto:</strong> {props.job.RequiredExperience}
                            </Col>
                            <Col>
                                <strong>Job Type:</strong> Full Time
                            </Col>
                        </Row>
                        <Row className="mb-2">
                            <Col>
                                <span className='jobdesc'><strong>Required Job Description,</strong> </span>
                            </Col>
                            <Col>
                                <strong>Education:</strong> {props.job.RequiredEducation}
                            </Col>
                        </Row>
                        <Row className="mb-2">
                            <Col>
                                {props.job.JobDescription}
                            </Col>
                        </Row>
                    </Card.Text>

                    <Button
                        variant="primary"
                        onClick={() => handleConfirmApply({
                            UserId: props.UserID,
                            UserName: props.UserName,
                            CompanyName: props.job.CompanyName,
                            JobID: props.job.JobID,
                            UserEmail: props.UserEmail,
                            JobTitle: props.job.JobTitle,
                            JobCreatedBy: props.job.CreatedBy,
                        })}
                        disabled={isRegistered}
                    >
                        {buttonName(isRegistered)}</Button>
                </Card.Body>
            </Card>
            <ToastContainer />

        </>
    );
}

export default Cards;
