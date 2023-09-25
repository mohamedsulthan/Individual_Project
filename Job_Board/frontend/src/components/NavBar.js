import { useState } from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import Button from '@mui/material/Button';
import ExitToAppIcon from '@mui/icons-material/ExitToApp';
import logo from '../assets/images/logo.png'
import { useNavigate } from 'react-router-dom';


function NavBar({ UserName }) {
    console.log("UserName={UserName}", { UserName })
    const navigate = useNavigate();

    const handleLogout = () => {
        navigate('/')
    }
    const handredirect = (e) => {
        if (e.target.value === 'jobcreation') {
            navigate('/dashboard/jobcreation')
        };
        if (e.target.value === 'jobs') {
            navigate('/dashboard/jobs')
        };

    }

    return (
        <AppBar position="static">
            <Container maxWidth="xl">
                <Toolbar disableGutters>
                    <img src={logo} alt="Logo" style={{ height: '40px', marginRight: '10px' }} />
                    <Typography
                        variant="h6"
                        noWrap
                        component="a"
                        href="/"
                        sx={{
                            mr: 2,
                            display: { xs: 'none', md: 'flex' },
                            fontFamily: 'monospace',
                            fontWeight: 700,
                            letterSpacing: '.3rem',
                            color: 'inherit',
                            textDecoration: 'none',
                        }}
                    >
                        JMAN
                    </Typography>
                    <Box sx={{ flexGrow: 1, display: 'flex' }}>
                        <Button
                            sx={{ my: 2, color: 'white' }}
                            value="jobs"
                            onClick={handredirect}
                        >
                            Jobs
                        </Button>
                        <Button
                            sx={{ my: 2, color: 'white' }}
                            value="jobcreation"
                            onClick={handredirect}
                        >
                            Create a Job
                        </Button>
                    </Box>

                    <Box sx={{ flexGrow: 0 }}>
                        <IconButton sx={{ p: 0 }}>
                            <div style={{ display: 'flex', alignItems: 'center' }}>
                                <Typography variant="body1" sx={{ mr: 2, color: 'white', }}>
                                    {UserName}
                                </Typography>
                                <ExitToAppIcon style={{ color: 'white' }} onClick={handleLogout} />
                            </div>
                        </IconButton>
                    </Box>

                </Toolbar>
            </Container>
        </AppBar>
    );
}
export default NavBar;