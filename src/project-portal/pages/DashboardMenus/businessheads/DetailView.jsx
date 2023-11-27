import { Button, Dialog, DialogActions, DialogContent, DialogTitle, Divider, Grid, Slide, Typography, } from '@mui/material';
import { makeStyles } from '@mui/styles';
import React from 'react'
import { useState } from 'react';
import { useEffect } from 'react';
import { categories } from '../../../../api/Endpoints/Category';
import { VendorsApi } from '../../../../api/Endpoints/Vendors';
import { VendorPayments } from '../../../../api/Endpoints/VendorPayments';
import { TaxAccount } from '../../../../api/Endpoints/TaxAccount';
import { SubscriptionsApi } from '../../../../api/Endpoints/Subscriptions';
import { BusinessAccount } from '../../../../api/Endpoints/BusinessAccount';

const Transition = React.forwardRef(function Transition(props, ref) {
    return <Slide direction="up" ref={ref} {...props} />;
});

const useStyles = makeStyles((theme) => ({
    card: {
        margin: theme.spacing(2),
        padding: theme.spacing(2),
        boxShadow: '1px 2px 2px 2px rgba(0, 0, 0, 0.3)',
    },
    title: {
        fontWeight: 'bold',
    },
    divider: {
        margin: theme.spacing(2, 0),
    },
    select: {
        minWidth: 200,
    },
}));

const DetailView = (props) => {

    const classes = useStyles();
    const [open, setOpen] = React.useState(true);
    // const handleClickOpen = () => { props.onNew(); };
    const handleClose = () => {
        props.handleClose(false)
        // setOpen(false); 
    };
    const [details, setDetails] = useState()
    const [loading, setLoading] = useState(false);

    const fetchActivityDetails = () => {
        setLoading(true)
        BusinessAccount.getDetails({ id: props.id }).then((response) => {
            setDetails(response.data.data)
            setLoading(false)
            console.log(response.data.data);
        }).catch(errors => {
            console.log(errors);
        })

    }

    const handleStorageChange = () => {
        console.log('testing');
    };

    useEffect(() => {

        fetchActivityDetails()
    }, [props.id])

    return (
        <>

            <Dialog
                open={open}
                PaperProps={{ sx: { width: "50%", height: "100%", position: "fixed", right: 0, top: 0, bottom: 0, m: 0, p: 0, borderRadius: 0, maxHeight: '100%' } }}
                TransitionComponent={Transition}
                keepMounted
                onClose={handleClose}
                aria-describedby="alert-dialog-slide-description"
            >
                <DialogTitle >Detail View</DialogTitle>
                <DialogContent>
                    <Grid container spacing={2}>
                        <Grid item xs={12} sm={6}>
                            <Typography variant="body1" component="h2" style={{ fontWeight: 'bold', fontSize: '1.1rem' }}>
                                Name:
                            </Typography>
                            <Typography variant="body2" style={{ paddingTop: 10, fontSize: '16px' }}>
                                {details?.title}
                            </Typography>

                        </Grid>
                    </Grid>
                    <Divider className={classes.divider} />

                    <Grid container spacing={2}>
                        <Grid item xs={12} sm={6}>
                            <Typography variant="body1" component="h2" style={{ fontWeight: 'bold', fontSize: '1.0rem' }}>
                                Country:

                            </Typography>
                            <Typography variant="body2" style={{ paddingTop: 10, fontSize: '16px' }}>
                                {details?.country?.name}
                            </Typography>

                        </Grid>
                        <Grid item xs={12} sm={6}>
                            <Typography variant="body1" component="h2" style={{ fontWeight: 'bold', fontSize: '1.0rem' }}>
                                Currency:
                            </Typography>
                            <Typography variant="body2" style={{ paddingTop: 10, fontSize: '16px' }} >
                                {details?.default_currency?.name}
                            </Typography>
                        </Grid>
                    </Grid>
                    <Divider className={classes.divider} />

                    {/* <Grid container spacing={2}>
                        <Grid item xs={12} sm={6}>
                            <Typography variant="body1" component="h2" style={{ fontWeight: 'bold', fontSize: '1.1rem' }}>
                                Start date:
                            </Typography>
                            <Typography variant="body2" style={{ paddingTop: 10, fontSize: '16px' }}>
                                {details?.start_date?.slice(8, 10)}-{details?.start_date?.slice(5, 7)}-{details?.start_date?.slice(0, 4)}
                            </Typography>

                        </Grid>
                        <Grid item xs={12} sm={6}>
                            <Typography variant="body1" component="h2" style={{ fontWeight: 'bold', fontSize: '1.1rem' }}>
                                End Date:
                            </Typography>
                            <Typography variant="body2" style={{ paddingTop: 10, fontSize: '16px' }}>
                                {details?.end_date?.slice(8, 10)}-{details?.end_date?.slice(5, 7)}-{details?.end_date?.slice(0, 4)}
                            </Typography>

                        </Grid>
                    </Grid>
                    <Divider className={classes.divider} /> */}

                    {/* <Grid container spacing={2}>
                        <Grid item xs={12} sm={6}>
                            <Typography variant="body1" component="h2" style={{ fontWeight: 'bold', fontSize: '1.1rem' }}>
                                Website:
                            </Typography>
                            <Typography variant="body2" style={{ paddingTop: 10, fontSize: '16px' }}>
                                {details?.website}
                            </Typography>

                        </Grid>
                    </Grid>
                    <Divider className={classes.divider} /> */}

                    {/* <Grid container spacing={2}>
                        <Grid item xs={12} sm={6}>
                            <Typography variant="body1" component="h2" style={{ fontWeight: 'bold', fontSize: '1.0rem' }}>
                                payment Cycle:
                            </Typography>
                            <Typography variant="body2" style={{ paddingTop: 10, fontSize: '16px' }} >
                                {details?.payment_cycle}
                            </Typography>
                        </Grid>
                         <Grid item xs={12} sm={6}>
                            <Typography variant="body1" component="h2" style={{ fontWeight: 'bold', fontSize: '1.1rem' }}>
                                Description:
                            </Typography>
                            <Typography variant="body2" style={{ paddingTop: 10, fontSize: '16px' }}>
                                {details?.description}
                            </Typography>

                        </Grid> 
                    </Grid>
                    <Divider className={classes.divider} /> */}
                    <Grid container spacing={2}>
                        <Grid item xs={12} sm={6}>
                            <Typography variant="body1" component="h2" style={{ fontWeight: 'bold', fontSize: '1.1rem' }}>
                                Description:
                            </Typography>
                            <Typography variant="body2" style={{ paddingTop: 10, fontSize: '16px' }}>
                                {details?.description}
                            </Typography>

                        </Grid>
                    </Grid>
                    <Divider className={classes.divider} />


                    {/* 
                    <Grid container spacing={2}>
                        <Grid item xs={12} sm={6}>
                            <Typography variant="body1" component="h2" style={{ fontWeight: 'bold', fontSize: '1.0rem' }}>
                                Cost Model:

                            </Typography>
                            <Typography variant="body2" style={{ paddingTop: 10, fontSize: '16px' }} >

                                {details?.cost_model}
                            </Typography>

                        </Grid>
                        <Grid item xs={12} sm={6}>
                            <Typography variant="body1" component="h2" style={{ fontWeight: 'bold', fontSize: '1.0rem' }}>
                                Status :
                            </Typography>
                            <Typography variant="body2" style={{ paddingTop: 10, fontSize: '16px' }} >


                                {details?.status}
                            </Typography>
                        </Grid>
                    </Grid> */}

                </DialogContent>
                <DialogActions>
                    <Button onClick={handleClose}>Close</Button>
                </DialogActions>
            </Dialog>

        </>
    )
}

export default DetailView;
