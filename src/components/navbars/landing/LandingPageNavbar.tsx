import "./LandingPageNavbar.css";
import logo from "../../../img/test-icon.png";
import {Link} from "react-router-dom";
import {useAuth} from "../../../hooks/useAuth.tsx";
import Modal from "@mui/material/Modal";
import {useState} from "react";
import {Typography} from "@mui/material";
import {CustomBox} from "./CustomStyling.ts";
import Button from '@mui/material/Button';


function LandingPageNavbar() {
    const {user} = useAuth();
    const [modelOpen, setModelOpen] = useState(true);


    return (
        <>
            <Modal
                open={modelOpen}
                onClose={() => setModelOpen(false)}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
            >
                <CustomBox>
                    <Typography id="modal-modal-title" variant="h6" component="h2" sx={{}}>
                        Work In Progress!
                    </Typography>
                    <Typography id="modal-modal-description" sx={{mt: 2}}>
                        This website is a work in progress which means that design choices, features and other tidbits
                        might not be in the final version of this website.
                    </Typography>
                    <Button onClick={() => setModelOpen(false)}
                            sx={{paddingLeft: 0, marginLeft: -1, marginTop: 3, color: "darkorange"}}>Close</Button>
                </CustomBox>
            </Modal>
            <div className="bg-img">
                <div className="container">
                    <div className="top-nav rounded p-4">
                        <div>
                            <img
                                className="me-3 img-fluid"
                                width={100}
                                height={100}
                                src={logo}
                                alt="logo"
                            />
                        </div>
                        {!user ?
                            <div>
                                <Link to={"/login"}><span className="h4 landing-nav-span">Login</span></Link>
                                <Link to={"/register"}><span className="h4 landing-nav-span">Register</span></Link>
                            </div> :

                                <Link to={"/dashboard"}>
                                    <span className="h4 landing-nav-span">Dashboard</span>
                                </Link>
                            }

                            <Link to={"/about"}><span className="h4 landing-nav-span">About</span></Link>

                    </div>
                </div>
            </div>

        </>
    );
}

export default LandingPageNavbar;
