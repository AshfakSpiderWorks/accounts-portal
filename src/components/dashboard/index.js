import React, { useEffect, useState } from 'react';
import {
    Avatar, Badge,
    Box,
    Grid,
    IconButton,
    List,
    ListItem,
    ListItemAvatar,
    ListItemButton,
    ListItemText,
    Typography,
    Stack,
    Button
} from "@mui/material";

import PageHeader from "./page-header";
import AddIcon from '@mui/icons-material/Add';
import { AvatarGroup } from "@mui/lab";

const DashboardIndex = () => {

    const options = [
        { value: 'chocolate', label: 'Chocolate' },
        { value: 'strawberry', label: 'Strawberry' },
        { value: 'vanilla', label: 'Vanilla' }
    ];

    const priorities = [
        { value: '#ffdedb', label: 'high' },
        { value: '#fdf1dc', label: 'intermediate' },
        { value: '#cfecff', label: 'low' }
    ];

    const tasks = [
        { title: 'Create monthly report on Dentique', assigned_to: 'Amala das', created_by: "Krishnedu", due_date: "10-01-2022", status: "assigned", priority: 'high' },
        { title: 'Create monthly report on Dentique', assigned_to: 'Amala das', created_by: "Tony sir", due_date: "10-01-2022", status: "assigned", priority: 'high' },
        { title: 'Create monthly report on Dentique', assigned_to: 'Amala das', created_by: "Tony sir", due_date: "10-01-2022", status: "assigned", priority: 'intermediate' },
        { title: 'Create monthly report on Dentique', assigned_to: 'Amala das', created_by: "Jishnu", due_date: "10-01-2022", status: "assigned", priority: 'low' },
    ]


    useEffect(() => {
    }, [])



    return (
        <Grid container sx={{ p: 2 }}>
            <Grid item xs={12}>
                <PageHeader />
                <Stack spacing={2} direction="row">
                    <Button variant="text">Text</Button>
                </Stack>
                <Button variant="text">Text</Button>
            </Grid>
            <Grid container xs={3} sx={{ my: 2, p: 2 }} >

                <div style={{
                    width: "100%",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "space-between",
                }}>

                    Tasks <AddIcon style={{
                        display: 'flex',
                        alignItems: 'center',
                        flexWrap: 'wrap',
                    }} />
                </div>




                <Box component="span" sx={{ display: 'block', width: '100%' }}>
                    <List>
                        {tasks.map(obj => {
                            let bgColor = priorities.filter(ob => ob.label === obj.priority);
                            bgColor = bgColor[0].value;

                            return <div className="assign_list">
                                <span className="ass-prty">High</span>
                                <span className="ass-sm-txt">SEO, Tist School of international </span>
                                <h3>create monthly report on TIST</h3>
                                <span className="ass-srt-btn">Not Started</span>
                                <hr className="main-hr" />
                                <div className="assign-ser flex-cen align-items-center">
                                    <div className="ass-name">Assigned To<br /><strong>Me</strong></div>
                                    <div className="ass-date flex-cen align-items-center">
                                        <span className="add-due-date">DUE</span>
                                        <span className="add-left-tim">10 Days Left <br /> 12th Oct</span>
                                        <hr className="sub-hr" />
                                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="24"
                                            height="24">
                                            <path fill="none" d="M0 0h24v24H0z" />
                                            <path
                                                d="M13.172 12l-4.95-4.95 1.414-1.414L16 12l-6.364 6.364-1.414-1.414z" />
                                        </svg>


                                    </div>
                                    <div className="ass-name text-rigt">Assigned By<br /><strong>Jishnu</strong></div>
                                </div>
                            </div>

                        })}
                    </List>
                </Box>

            </Grid>


            <Grid container xs={3} sx={{ my: 2, p: 2 }} >



                <Box component="span" sx={{ display: 'block', width: '100%' }}>

                    <div style={{
                        width: "100%",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "space-between",
                    }}>

                        Activities <AddIcon style={{
                            display: 'flex',
                            alignItems: 'center',
                            flexWrap: 'wrap',
                        }} />
                    </div>

                    <List>
                        {tasks.map(obj => {
                            let bgColor = priorities.filter(ob => ob.label === obj.priority);
                            bgColor = '#ededed';

                            return <ListItemButton sx={{ background: bgColor, mb: 1, borderRadius: 1 }}>
                                <ListItemText
                                    primary={obj.title}
                                    secondary={<>
                                        <Typography variant={'caption'}>Assigned to {obj.assigned_to} by {obj.created_by}</Typography>
                                        <Typography variant={'subtitle2'}>{obj.due_date} ({obj.priority})</Typography>
                                    </>
                                    }
                                />
                            </ListItemButton>
                        })}
                    </List>
                </Box>



            </Grid>

            <Grid container xs={3} sx={{ my: 2, p: 2 }} >



                <Box component="span" sx={{ display: 'block', width: '100%' }}>

                    <div style={{
                        width: "100%",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "space-between",
                    }}>

                        Announcement <AddIcon style={{
                            display: 'flex',
                            alignItems: 'center',
                            flexWrap: 'wrap',
                        }} />
                    </div>

                    <List>
                        {tasks.map(obj => {
                            let bgColor = priorities.filter(ob => ob.label === obj.priority);
                            bgColor = '#ededed';

                            return <ListItemButton sx={{ background: bgColor, mb: 1, borderRadius: 1 }}>
                                <ListItemText
                                    primary={obj.title}
                                    secondary={<>
                                        <Typography variant={'caption'}>Assigned to {obj.assigned_to} by {obj.created_by}</Typography>
                                        <Typography variant={'subtitle2'}>{obj.due_date} ({obj.priority})</Typography>

                                    </>
                                    }
                                />
                            </ListItemButton>
                        })}
                    </List>
                </Box>



            </Grid>


            <Grid container xs={3} sx={{ my: 2, p: 2 }} >



                <Box component="span" sx={{ display: 'block', width: '100%' }}>

                    <div style={{
                        width: "100%",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "space-between",
                    }}>

                        Active Projects <AddIcon style={{
                            display: 'flex',
                            alignItems: 'center',
                            flexWrap: 'wrap',
                        }} />
                    </div>

                    <List>
                        {tasks.map(obj => {
                            let bgColor = priorities.filter(ob => ob.label === obj.priority);
                            bgColor = '#ededed';

                            return <ListItemButton sx={{ background: bgColor, mb: 1, borderRadius: 1 }}>
                                <ListItemText
                                    primary={obj.title}
                                    secondary={<>
                                        <Typography variant={'caption'}>Assigned to {obj.assigned_to} by {obj.created_by}</Typography>
                                        <Typography variant={'caption'}>Assigned to {obj.assigned_to} by {obj.created_by}</Typography>
                                        <AvatarGroup max={4}>
                                            <Avatar alt="Remy Sharp" src="/static/images/avatar/1.jpg" />
                                            <Avatar alt="Travis Howard" src="/static/images/avatar/2.jpg" />
                                            <Avatar alt="Cindy Baker" src="/static/images/avatar/3.jpg" />
                                            <Avatar alt="Agnes Walker" src="/static/images/avatar/4.jpg" />
                                            <Avatar alt="Trevor Henderson" src="/static/images/avatar/5.jpg" />
                                        </AvatarGroup>
                                    </>
                                    }
                                />
                            </ListItemButton>
                        })}
                    </List>
                </Box>



            </Grid>
        </Grid>
    );
};

export default DashboardIndex;
