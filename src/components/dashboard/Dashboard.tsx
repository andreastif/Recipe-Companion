import "./Dashboard.css"
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Box from '@mui/material/Box';

import LoggedInNav from "../navbars/loggedin/LoggedInNav.tsx";
import {SyntheticEvent, useState} from "react";

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
                                    <Tab value="two" label="Create Recipe"/>
                                    <Tab value="three" label="Other"/>
                                </Tabs>
                            </Box>
                        </div>
                        <div className="p-4 ">"But I must explain to you how all this mistaken idea of
                            denouncing pleasure and praising pain was born and I will give you a complete account of the
                            system, and expound the actual teachings of the great explorer of the truth, the
                            master-builder of human happiness. No one rejects, dislikes, or avoids pleasure itself,
                            because it is pleasure, but because those who do not know how to pursue pleasure rationally
                            encounter consequences that are extremely painful. Nor again is there anyone who loves or
                            pursues or desires to obtain pain of itself, because it is pain, but because occasionally
                            circumstances occur in which toil and pain can procure him some great pleasure. To take a
                            trivial example, which of us ever undertakes laborious physical exercise, except to obtain
                            some advantage from it? But who has any right to find fault with a man who chooses to enjoy
                            a pleasure that has no annoying consequences, or one who avoids a pain that produces no
                            resultant pleasure?"
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
        ;
}

export default Dashboard;
