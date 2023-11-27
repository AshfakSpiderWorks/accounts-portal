import React, { useState } from 'react';
import { Button, Dialog, DialogActions, DialogContent, DialogTitle } from "@mui/material";
import PropTypes from 'prop-types';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import { useEffect } from 'react';
import Details from './Tabs/Details';
import LineItems from './Tabs/LineItems';
import Transactions from './Tabs/Transactions';
const Modal = ({ ID, setshowDetailView }) => {

    const [open, setOpen] = useState(false);


    useEffect(() => {
        if (ID > 0) {
            setOpen(true)
        }

    }, [ID])




    const handleClose = () => {
        setOpen(false)

        setshowDetailView(false)

    }



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
                    <Box pt={2}>
                        <Typography>{children}</Typography>
                    </Box>
                )
                }
            </div >
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

    function BasicTabs({ }) {
        const [value, setValue] = React.useState(0);

        const handleChange = (event, newValue) => {
            setValue(newValue);
        };


        return (
            <Box sx={{ width: '100%', mt: 0 }}>
                <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
                    <Tabs value={value} onChange={handleChange} aria-label="basic tabs example">
                        <Tab label={"Details"}{...a11yProps(0)} />
                        <Tab label="Line Items " {...a11yProps(1)} />
                        <Tab label="Transactions" {...a11yProps(2)} />
                        {/* {editId > 0 && <Tab label="Meeting  Minutes" {...a11yProps(2)} />} */}

                    </Tabs>
                </Box>
                <TabPanel value={value} index={0}>
                    <Details />
                </TabPanel>
                <TabPanel value={value} index={1}>
                    <LineItems />
                </TabPanel>
                <TabPanel value={value} index={2}>
                    <Transactions />
                </TabPanel>
                {/* <TabPanel value={value} index={1}>

                    <Attendees
                        fetchTable={() => fetchTable()}
                        projectID={projectID}
                        editId={editId}
                        onUpdate={onUpdate}
                        onNew={onNew}
                    />


                </TabPanel>
                <TabPanel value={value} index={2}>
                    < Index
                        meetingID={editId}
                        projectID={projectID}
                        editId={editId}
                        onUpdate={onUpdate}
                        onNew={onNew}
                    />
                </TabPanel> */}
                {/* <TabPanel value={value} index={2}>
                    <MeetingMinutes
                        projectID={projectID}
                        editId={editId}
                        onUpdate={onUpdate}
                        onNew={onNew}
                    />
                </TabPanel> */}

                {/* <TabPanel value={value} index={1}>
                    <DataTable viewID={viewID} />
                </TabPanel> */}

            </Box>
        );
    }

    return (
        <div>

            <Dialog
                open={open}
                PaperProps={{
                    sx: { width: "50%", height: "100%", position: "fixed", right: 0, top: 0, bottom: 0, m: 0, p: 0, borderRadius: 0, maxHeight: '100%' },
                }}
                onClose={handleClose}
                aria-describedby="alert-dialog-slide-description"
            >

                < DialogContent sx={{
                    paddingLeft: '18px',
                    paddingRight: '10px',
                }} >
                    <BasicTabs />
                </DialogContent>
                <DialogActions sx={{ pt: 0 }}>
                    <Button onClick={handleClose}>Close</Button>
                </DialogActions>
            </Dialog>
        </div >
    );
};

export default Modal;
