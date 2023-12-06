import React, { useState } from 'react';
import { Button, Dialog, DialogActions, DialogContent, DialogTitle } from "@mui/material";
import PropTypes from 'prop-types';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import { useEffect } from 'react';
import Details from './Tabs/Details';
import VendorDetails from './Tabs/VendorDetails';
import Transactions from '../vendorBills/Tabs/Transactions';
import LineItems from '../vendorBills/Tabs/LineItems';
import Tax from './Tabs/Tax';
import EditTransactions from './Tabs/Edit';
const Modal = ({ ID, setshowDetailView, onNew, onUpdate, editId, setEditId }) => {

    const [open, setOpen] = useState(false);


    useEffect(() => {
        if (ID > 0 || editId > 0) {
            setOpen(true)
        }

    }, [ID])




    const handleClose = () => {
        setOpen(false)
        setEditId && setEditId(0)
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
                <Box sx={{ borderBottom: 1, borderColor: 'divider', }}>
                    <Tabs value={value} onChange={handleChange} aria-label="basic tabs example" variant='scrollable' >
                        {editId > 0 ?
                            <Tab label={"Edit"}{...a11yProps(0)} />
                            :
                            <Tab label={"Details"}{...a11yProps(0)} />
                        }

                        <Tab label="Vendor Details" {...a11yProps(1)} />
                        <Tab label="Tax" {...a11yProps(2)} />
                        <Tab label="Line Items" {...a11yProps(3)} />
                        <Tab label="Transactions" {...a11yProps(4)} />
                        <Tab label="Bonus" {...a11yProps(5)} />
                        <Tab label="Notes & Attachments" {...a11yProps(6)} />
                        {/* {editId > 0 && <Tab label="Meeting  Minutes" {...a11yProps(2)} />} */}

                    </Tabs>
                </Box>
                {editId > 0 ? (
                    <TabPanel value={value} index={0}>
                        <EditTransactions
                            onUpdate={onUpdate}
                            editId={editId}
                            setEditId={setEditId} />
                    </TabPanel>
                ) : (
                    <TabPanel value={value} index={0}>
                        <Details />
                    </TabPanel>
                )}

                <TabPanel value={value} index={editId > 0 ?  : null}>
                    <VendorDetails />
                </TabPanel>
                <TabPanel value={value} index={1}>
                    <Tax />
                </TabPanel>
                <TabPanel value={value} index={3}>
                    <LineItems isInvoiceTab={true} />
                </TabPanel>
                <TabPanel value={value} index={4}>
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

            </Box >
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
