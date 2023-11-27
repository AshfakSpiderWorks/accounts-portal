import * as React from 'react';
import PropTypes from 'prop-types';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import Divider from '@mui/material/Divider';
import { Backdrop, Button, Card, CircularProgress, TextField } from "@mui/material";
import Details from './Tabs/Details';
import Attachments from './Tabs/Attachments';
import History from './Tabs/History';

function TabPanel(props) {
    const { children, value, index, ...other } = props;

    return (
        <div
            role="tabpanel"
            hidden={value !== index}
            id={`simple-tabpanel-${index}`}
            aria-labelledby={`simple-tab-${index}`}
            {...other}
        >
            {value === index && (
                <Box sx={{ p: 3 }}>
                    <Typography>{children}</Typography>
                </Box>
            )}
        </div>
    );
}

TabPanel.propTypes = {
    children: PropTypes.node,
    index: PropTypes.number.isRequired,
    value: PropTypes.number.isRequired,
};

function a11yProps(index) {
    return {
        id: `simple-tab-${index}`,
        'aria-controls': `simple-tabpanel-${index}`,
    };
}

export default function BasicTabs(props) {
    const [value, setValue] = React.useState(0);

    const handleChange = (event, newValue) => {
        setValue(newValue);
    };

    return (
        <>

            <Box sx={{ width: '100%', mt: 1 }}>
                <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
                    <Tabs value={value} onChange={handleChange} aria-label="basic tabs example" sx={{ ml: 2 }}>
                        <Tab label="Details" {...a11yProps(0)} />
                        <Tab label="History" {...a11yProps(1)} />

                    </Tabs>
                </Box>
                <TabPanel value={value} index={0}>
                    <Details id={props.id} />
                </TabPanel>
                <TabPanel value={value} index={1}>
                    <History />
                </TabPanel>
                <TabPanel value={value} index={2}>

                </TabPanel>
                <TabPanel value={value} index={3}>

                </TabPanel>
                <TabPanel value={value} index={4}>

                </TabPanel>

            </Box>
            <Divider />

            <div style={{ width: '95%', display: 'flex', justifyContent: 'end', marginTop: 5 }}>
                <Button variant="contained" onClick={() => props.setTabs(false)} style={{ width: 'fit-content', mr: 7 }}>
                    Cancel
                </Button>

            </div>
        </>
    );
}
