import { useEffect, useState } from 'react';
import { Link, useNavigate } from "react-router-dom";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import axios from 'axios';
import TextField from '@mui/material/TextField';
import '../assets/css/SignIn.css';
import Image from '../components/Image';

const Register = () => {
    const Navigate = useNavigate();
    const [signUpData, setSignUpData] = useState({
        fullName: "",
        email: "",
        password: "",
        confirmPassword: "",
        mobileNumber: "",
        dob: "",
        expectedLPA: "",
        interestedRole: "",
        skills: "",
        experience: ""
    });
    const [fErr, setFerr] = useState(false);
    const [fText, setFtext] = useState("");
    const [mErr, setMerr] = useState(false);
    const [mtext, setMtext] = useState("");
    const [pErr, setPerr] = useState(false);
    const [ptext, setPtext] = useState("");
    const [cErr, setCerr] = useState(false);
    const [ctext, setCtext] = useState("");
    const [nErr, setNerr] = useState(false);
    const [ntext, setNtext] = useState("");
    const [dErr, setDerr] = useState(false);
    const [dText, setDtext] = useState("");
    const [lErr, setLerr] = useState(false);
    const [lText, setLtext] = useState("");
    const [rErr, setRerr] = useState(false);
    const [rText, setRtext] = useState("");
    const [sErr, setSerr] = useState(false);
    const [sText, setStext] = useState("");
    const [eErr, setEerr] = useState(false);
    const [eText, setEtext] = useState("");
    const data = {
        fullName: signUpData.fullName,
        email: signUpData.email,
        password: signUpData.password,
        confirmPassword: signUpData.confirmPassword,
        mobileNumber: signUpData.mobileNumber,
        dob: signUpData.dob,
        expectedLPA: signUpData.expectedLPA,
        interestedRole: signUpData.interestedRole,
        skills: signUpData.skills,
        experience: signUpData.experience
    };

    async function register() {
        if (signUpData.fullName.trim() === "") {
            setFerr(true);
            setFtext("Please enter Full Name");
        } else if (signUpData.email.trim() === "") {
            setMerr(true);
            setMtext("Please enter Email");
        } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(signUpData.email)) {
            setMerr(true);
            setMtext("Please enter a valid Email address");
        } else if (signUpData.password.trim() === "") {
            setPerr(true);
            setPtext("Please Enter Password");
        } else if (signUpData.confirmPassword.trim() === "") {
            setCerr(true);
            setCtext("Please confirm Password");
        } else if (signUpData.password !== signUpData.confirmPassword) {
            setCerr(true);
            setCtext("Passwords do not match");
        } else if (signUpData.mobileNumber.trim() === "") {
            setNerr(true);
            setNtext("Please enter Mobile Number");
        } else if (!/^\d{10}$/.test(signUpData.mobileNumber)) {
            setNerr(true);
            setNtext("Please enter a valid 10-digit Mobile Number");
        } else if (signUpData.dob.trim() === "") {
            setDerr(true);
            setDtext("Please enter Date of Birth");
        } else if (signUpData.expectedLPA.trim() === "") {
            setLerr(true);
            setLtext("Please enter Expected LPA");
        } else if (signUpData.interestedRole.trim() === "") {
            setRerr(true);
            setRtext("Please enter Interested Role");
        } else if (signUpData.skills.trim() === "") {
            setSerr(true);
            setStext("Please enter Skills");
        } else if (signUpData.experience.trim() === "") {
            setEerr(true);
            setEtext("Please enter Experience");
        } else {
            try {
                const RegisterRequest = await axios.post(
                    "http://localhost:8080/users/register",
                    data
                );
                if (RegisterRequest.data.message === "User Already Registered") {
                    toast.error('User Already Registered', {
                        position: toast.POSITION.TOP_RIGHT
                    });
                }
                if (RegisterRequest.data.message === "email sent") {
                    toast.success('Email Sent Successfully, click the Activation link in your email to Activate your account', {
                        position: toast.POSITION.TOP_RIGHT
                    });
                    setTimeout(() => {
                        Navigate("/")
                    }, 2000)
                }
                if (RegisterRequest.data.message === "User Created") {
                    toast.success('Registration Success', {
                        position: toast.POSITION.TOP_RIGHT
                    });
                    setTimeout(() => {
                        Navigate("/")
                    }, 3000)
                }
                if (RegisterRequest.data.message === "empty data") {
                    toast.error('empty data', {
                        position: toast.POSITION.TOP_RIGHT
                    });
                }
            } catch (error) {
                console.log(error);
            }
        }
    }

    const setValues = (event) => {
        const name = event.target.name;
        const value = event.target.value;
        setSignUpData((vals) => ({ ...vals, [name]: value }));
    };

    useEffect(() => {
        sessionStorage.setItem("authToken", "");
    })

    return (
        <div className="main-container">
            <Image />
            <div>
                <div className='sign-container' onKeyDown={(e) => {
                    if (e.key === "Enter") {
                        register()
                    }
                }}>
                    <div className="d-flex flex-column w-50 ">
                        <h1 className="m-3">Register</h1>
                        <div className='d-flex mb-4 '>
                            <TextField
                                required
                                id="fullName"
                                label="Full Name"
                                name="fullName"
                                value={signUpData.fullName}
                                error={fErr}
                                className="me-4"
                                size='small'
                                onChange={setValues}
                                helperText={fText}
                                onBlur={() => {
                                    if (signUpData.fullName.trim() === "") {
                                        setFerr(true);
                                        setFtext("Please enter Full Name");
                                    } else {
                                        setFerr(false);
                                        setFtext("");
                                    }
                                }}
                            />
                            <TextField
                                required
                                id="email"
                                label="Email"
                                name="email"
                                value={signUpData.email}
                                error={mErr}
                                size='small'
                                onChange={setValues}
                                helperText={mtext}
                                onBlur={() => {
                                    if (signUpData.email.trim() === "") {
                                        setMerr(true);
                                        setMtext("Please enter Email");
                                    } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(signUpData.email)) {
                                        setMerr(true);
                                        setMtext("Please enter a valid Email address");
                                    } else {
                                        setMerr(false);
                                        setMtext("");
                                    }
                                }}
                            />
                        </div>
                        <div className='d-flex mb-4'>
                            <TextField
                                required
                                id="password"
                                label="Password"
                                name="password"
                                value={signUpData.password}
                                type='password'
                                className='me-4'
                                size='small'
                                onChange={setValues}
                                error={pErr}
                                helperText={ptext}
                                onBlur={() => {
                                    if (signUpData.password.trim() === "") {
                                        setPerr(true);
                                        setPtext("Please Enter Password");
                                    } else {
                                        setPerr(false);
                                        setPtext("");
                                    }
                                }}
                            />
                            <TextField
                                required
                                id="confirmPassword"
                                label="Confirm Password"
                                name="confirmPassword"
                                value={signUpData.confirmPassword}
                                type='password'
                                size='small'
                                onChange={setValues}
                                error={cErr}
                                helperText={ctext}
                                onBlur={() => {
                                    if (signUpData.confirmPassword.trim() === "") {
                                        setCerr(true);
                                        setCtext("Please confirm Password");
                                    } else if (signUpData.password !== signUpData.confirmPassword) {
                                        setCerr(true);
                                        setCtext("Passwords do not match");
                                    } else {
                                        setCerr(false);
                                        setCtext("");
                                    }
                                }}
                            />
                        </div>
                        <div className='d-flex mb-4'>
                            <TextField
                                required
                                id="mobileNumber"
                                label="Mobile Number"
                                name="mobileNumber"
                                value={signUpData.mobileNumber}
                                size='small'
                                onChange={setValues}
                                error={nErr}
                                className='me-4 phone'
                                helperText={ntext}
                                onBlur={() => {
                                    if (signUpData.mobileNumber.trim() === "") {
                                        setNerr(true);
                                        setNtext("Please enter Mobile Number");
                                    } else if (!/^\d{10}$/.test(signUpData.mobileNumber)) {
                                        setNerr(true);
                                        setNtext("Please enter a valid 10-digit Mobile Number");
                                    } else {
                                        setNerr(false);
                                        setNtext("");
                                    }
                                }}
                            />
                            <TextField
                                required
                                id="dob"
                                label="Date of Birth"
                                name="dob"
                                type="date"
                                value={signUpData.dob}
                                InputLabelProps={{
                                    shrink: true,
                                }}
                                onChange={setValues}
                                error={dErr}
                                helperText={dText}
                                size='small'
                                className='phone'
                                onBlur={() => {
                                    if (signUpData.dob.trim() === "") {
                                        setDerr(true);
                                        setDtext("Please enter Date of Birth");
                                    } else {
                                        setDerr(false);
                                        setDtext("");
                                    }
                                }}
                            />
                        </div>
                        <div className='d-flex mb-4'>
                            <TextField
                                required
                                id="expectedLPA"
                                label="Expected LPA"
                                name="expectedLPA"
                                value={signUpData.expectedLPA}
                                size='small'
                                onChange={setValues}
                                error={lErr}
                                helperText={lText}
                                className='me-4'
                                onBlur={() => {
                                    if (signUpData.expectedLPA.trim() === "") {
                                        setLerr(true);
                                        setLtext("Please enter Expected LPA");
                                    } else {
                                        setLerr(false);
                                        setLtext("");
                                    }
                                }}
                            />
                            <TextField
                                required
                                id="interestedRole"
                                label="Interested Role"
                                name="interestedRole"
                                value={signUpData.interestedRole}
                                size='small'
                                onChange={setValues}
                                error={rErr}
                                helperText={rText}
                                onBlur={() => {
                                    if (signUpData.interestedRole.trim() === "") {
                                        setRerr(true);
                                        setRtext("Please enter Interested Role");
                                    } else {
                                        setRerr(false);
                                        setRtext("");
                                    }
                                }}
                            />
                        </div>
                        <div className='d-flex mb-4'>
                            <TextField
                                required
                                id="skills"
                                label="Skills"
                                name="skills"
                                value={signUpData.skills}
                                size='small'
                                className='me-4'
                                onChange={setValues}
                                error={sErr}
                                helperText={sText}
                                onBlur={() => {
                                    if (signUpData.skills.trim() === "") {
                                        setSerr(true);
                                        setStext("Please enter Skills");
                                    } else {
                                        setSerr(false);
                                        setStext("");
                                    }
                                }}
                            />
                            <TextField
                                required
                                id="experience"
                                label="Experience"
                                name="experience"
                                value={signUpData.experience}
                                size='small'
                                onChange={setValues}
                                error={eErr}
                                helperText={eText}
                                onBlur={() => {
                                    if (signUpData.experience.trim() === "") {
                                        setEerr(true);
                                        setEtext("Please enter Experience");
                                    } else {
                                        setEerr(false);
                                        setEtext("");
                                    }
                                }}
                            />
                        </div>
                        <div className='d-flex flex-row justify-content-end'>
                            <button className='button1' onClick={register}>REGISTER
                                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-arrow-right ms-2" viewBox="0 0 16 16">
                                    <path fill-rule="evenodd" d="M1 8a.5.5 0 0 1 .5-.5h11.793l-3.147-3.146a.5.5 0 0 1 .708-.708l4 4a.5.5 0 0 1 0 .708l-4 4a.5.5 0 0 1-.708-.708L13.293 8.5H1.5A.5.5 0 0 1 1 8z" />
                                </svg>
                            </button>
                        </div>
                        <p className="text-end mt-2"> Already have an account? <Link to='/'>Sign In</Link></p>
                        <ToastContainer />
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Register;
