import React, { useContext } from 'react';
import { AppBar, Toolbar, Typography, Button, Box } from '@mui/material';
import { Link } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';
import { getAuth, signOut } from "firebase/auth";
import { toast } from 'react-toastify';
import { auth } from '../JS Files/Firebase';

const Header = () => {
    const { signin } = useContext(AuthContext);


    const fbSignout = async () => {
        await signOut(auth).then(() => {
            toast('SignOut Successful', {
                position: "top-right",
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "light",
                transition: Bounce,
            });
        }).catch((error) => {
            console.log(error.errormessage);

        });
    }

    return (
        <AppBar position="static" color="primary" sx={{ borderRadius: '16px' }}>
            <Toolbar>
                <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
                    React ChatApp
                </Typography>

                {!signin.userLoggedIn ?
                    <Box sx={{ display: { md: 'block' } }}>
                        <Link style={{ color: 'white', textDecoration: 'none' }} to={"/"}>
                            <Button color="inherit">Home</Button>
                        </Link>
                        <Link style={{ color: 'white', textDecoration: 'none' }} to={"/about"}>
                            <Button color="inherit">About</Button>
                        </Link>
                        <Link style={{ color: 'white', textDecoration: 'none' }} to={"/contact"}>
                            <Button color="inherit">Contact</Button>
                        </Link>
                    </Box> : null
                }

                {!signin.userLoggedIn ?
                    <Box sx={{ display: 'flex', gap: 1 }}>
                        <Link style={{ color: 'white', textDecoration: 'none' }} to={"/signup"}>
                            <Button color="inherit" variant="outlined">
                                Signup
                            </Button>
                        </Link>
                        <Link style={{ color: 'white', textDecoration: 'none' }} to={"/login"}>
                            <Button color="inherit" variant="outlined" >
                                Login
                            </Button>
                        </Link>
                    </Box> : <Box sx={{ display: 'flex', gap: 1 }}>
                        <Button color="inherit" variant="outlined" onClick={fbSignout}>
                            Signout
                        </Button>
                    </Box>
                }

            </Toolbar>
        </AppBar>
    );
};

export default Header;
