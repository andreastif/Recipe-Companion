import "./Dashboard.css"
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Box from '@mui/material/Box';

import LoggedInNav from "../navbars/loggedin/LoggedInNav.tsx";
import {SyntheticEvent, useState} from "react";
import {Card, CardActionArea, CardContent, CardMedia, Typography} from "@mui/material";

function Dashboard() {
    const [value, setValue] = useState('one');

    const handleChange = (_event: SyntheticEvent, newValue: string) => {
        setValue(newValue);
    };

    return (
        <>
            <LoggedInNav/>
            <div className="page-container dashboard my-5 ">
                <div className="content-wrap d-flex justify-content-center align-content-center">
                    <div className="border rounded border-secondary-subtle shadow" style={{"width": "95%"}}>
                        <div className="border-bottom border-secondary-subtle shadow">
                            <Box sx={{width: '100%'}}>
                                <Tabs
                                    value={value}
                                    onChange={handleChange}
                                    textColor="inherit"
                                    indicatorColor="secondary"
                                    aria-label="secondary tabs example"
                                    variant="fullWidth"
                                    centered
                                >
                                    <Tab value="one" label="My Recipes"/>
                                    <Tab value="two" label="Inspiration"/>
                                    {/*<Tab value="three" label="Other"/>*/}
                                </Tabs>
                            </Box>
                        </div>
                        <div className="p-5 row">
                            <div className="col-sm-12 col-md-6 col-lg-4 col-xl-3 mb-5">
                                <Card sx={{ maxWidth: 345, bgcolor: '#2b3035', border: '1px solid white'}}>
                                    <CardActionArea>
                                        <CardMedia
                                            component="img"
                                            height="140"
                                            src="https://picsum.photos/140"
                                            alt="lorem picsum"
                                        />
                                        <CardContent>
                                            <Typography gutterBottom variant="h5" component="div"
                                                        className="text-white text-center">
                                                Lizard
                                            </Typography>
                                            <Typography variant="body2" color="white">
                                                Lizards are a widespread group of squamate reptiles, with over 6,000
                                                species, ranging across all continents except Antarctica
                                            </Typography>
                                        </CardContent>
                                    </CardActionArea>
                                </Card>
                            </div>
                            <div className="col-sm-12 col-md-6 col-lg-4 col-xl-3 mb-5">
                                <Card sx={{maxWidth: 345}}>
                                    <CardActionArea>
                                        <CardMedia
                                            component="img"
                                            height="140"
                                            src="https://picsum.photos/140"
                                            alt="lorem picsum"
                                        />
                                        <CardContent>
                                            <Typography gutterBottom variant="h5" component="div"
                                                        className="text-black text-center">
                                                Lizard
                                            </Typography>
                                            <Typography variant="body2" color="text.secondary">
                                                Lizards are a widespread group of squamate reptiles, with over 6,000
                                                species, ranging across all continents except Antarctica
                                            </Typography>
                                        </CardContent>
                                    </CardActionArea>
                                </Card>
                            </div>
                            <div className="col-sm-12 col-md-6 col-lg-4 col-xl-3 mb-5">
                                <Card sx={{maxWidth: 345}}>
                                    <CardActionArea>
                                        <CardMedia
                                            component="img"
                                            height="140"
                                            src="https://picsum.photos/140"
                                            alt="lorem picsum"
                                        />
                                        <CardContent>
                                            <Typography gutterBottom variant="h5" component="div"
                                                        className="text-black text-center">
                                                Lizard
                                            </Typography>
                                            <Typography variant="body2" color="text.secondary">
                                                Lizards are a widespread group of squamate reptiles, with over 6,000
                                                species, ranging across all continents except Antarctica
                                            </Typography>
                                        </CardContent>
                                    </CardActionArea>
                                </Card>
                            </div>
                            <div className="col-sm-12 col-md-6 col-lg-4 col-xl-3 mb-5">
                                <Card sx={{maxWidth: 345}}>
                                    <CardActionArea>
                                        <CardMedia
                                            component="img"
                                            height="140"
                                            src="https://picsum.photos/140"
                                            alt="lorem picsum"
                                        />
                                        <CardContent>
                                            <Typography gutterBottom variant="h5" component="div"
                                                        className="text-black text-center">
                                                Lizard
                                            </Typography>
                                            <Typography variant="body2" color="text.secondary">
                                                Lizards are a widespread group of squamate reptiles, with over 6,000
                                                species, ranging across all continents except Antarctica
                                            </Typography>
                                        </CardContent>
                                    </CardActionArea>
                                </Card>
                            </div>
                            <div className="col-sm-12 col-md-6 col-lg-4 col-xl-3 mb-5">
                                <Card sx={{maxWidth: 345}}>
                                    <CardActionArea>
                                        <CardMedia
                                            component="img"
                                            height="140"
                                            src="https://picsum.photos/140"
                                            alt="lorem picsum"
                                        />
                                        <CardContent>
                                            <Typography gutterBottom variant="h5" component="div"
                                                        className="text-black text-center">
                                                Lizard
                                            </Typography>
                                            <Typography variant="body2" color="text.secondary">
                                                Lizards are a widespread group of squamate reptiles, with over 6,000
                                                species, ranging across all continents except Antarctica
                                            </Typography>
                                        </CardContent>
                                    </CardActionArea>
                                </Card>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}

export default Dashboard;
