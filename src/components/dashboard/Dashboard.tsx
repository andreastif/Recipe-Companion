import "./Dashboard.css"
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Box from '@mui/material/Box';

import LoggedInNav from "../navbars/loggedin/LoggedInNav.tsx";
import {SyntheticEvent, useState} from "react";
import RecipeTab from "../recipetab/RecipeTab.tsx";
import InspirationTab from "../inspirationtab/InspirationTab.tsx";
import useMediaQuery from "@mui/material/useMediaQuery";

enum TabType {
    Recipe,
    Inspiration
}

function Dashboard() {
    const isMobile = useMediaQuery('(max-width:768px)');

    const [currentTab, setCurrentTab] = useState(TabType.Recipe);

    const handleChange = (_event: SyntheticEvent, newValue: TabType) => {
        setCurrentTab(newValue);
    };

    const handleTabClick = () => {
        console.log("tab was switched: " + `${currentTab}`);
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
                                    value={currentTab}
                                    onChange={handleChange}
                                    onClick={handleTabClick}
                                    textColor="inherit"
                                    indicatorColor="secondary"
                                    aria-label="secondary tabs example"
                                    variant="fullWidth"
                                    centered
                                >
                                    <Tab value={TabType.Recipe} label="My Recipes" sx={{fontSize: isMobile ? "1rem" : "1.1rem"}}/>
                                    <Tab value={TabType.Inspiration} label="Inspiration" sx={{fontSize: isMobile ? "1rem" : "1.1rem"}}/>
                                    {/*<Tab value="three" label="Other"/>*/}
                                </Tabs>
                            </Box>
                        </div>
                        {currentTab === TabType.Recipe ?
                            <RecipeTab/> : <InspirationTab/>
                        }
                    </div>
                </div>
            </div>
        </>
    );
}

export default Dashboard;
