import React, { useEffect, useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import {
    Button,
    Dialog,
    DialogActions,
    DialogContent,
    DialogContentText,
    Card,
    CardContent,
    Typography,
    Grid,
    Divider,
    Select,
    MenuItem,
    DialogTitle,
    InputLabel,
    TextareaAutosize,
    TextField,
    Slide,
    Backdrop,
    CircularProgress,
} from "@mui/material";
import { Employee } from '../../../../../api/Endpoints/Employee';
import { ReimbursementApi } from '../../../../../api/Endpoints/Reimbursement';
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

const Details = (props) => {
    const classes = useStyles();
    const [details, setDetails] = useState({})
    const [loading, setLoading] = useState(false);

    const fetchEmployeeDetails = () => {
        setLoading(true)
        ReimbursementApi.getDetails({ id: props.id }).then((response) => {
            console.log(response);
            setDetails(response.data.data)
            // props.status(response.data?.data?.status)
            setLoading(false)
        }).catch(errors => {
            console.log(errors);
        })

    }


    useEffect(() => {
        console.log(props.id);
        fetchEmployeeDetails()
    }, [])

    return (
        <Card className={classes.card}>
            <Backdrop
                sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }}
                open={loading}
            >
                <CircularProgress color="inherit" />
            </Backdrop>
            <CardContent>
                <Grid container spacing={2}>
                    <Grid item xs={12} sm={6}>
                        <Typography variant="body1" component="h2" style={{ fontWeight: 'bold', fontSize: '1.1rem' }}>
                            Title:
                        </Typography>
                        <Typography variant="body2" style={{ paddingTop: 10, fontSize: '16px' }}>
                            {details?.title}
                        </Typography>

                    </Grid>

                </Grid>
                <Divider className={classes.divider} />
                <Grid container spacing={2}>
                    <Grid item xs={12} sm={6}>
                        <Typography variant="body1" component="h2" style={{ fontWeight: 'bold', fontSize: '1.1rem' }}>
                            Status:
                        </Typography>
                        <Typography variant="body2" style={{ paddingTop: 10, fontSize: '16px' }}>
                            {details?.status}
                        </Typography>
                    </Grid>
                    <Grid item xs={12} sm={6}>
                        <Typography variant="body1" component="h2" style={{ fontWeight: 'bold', fontSize: '1.0rem' }}>
                            Amount:

                        </Typography>
                        <Typography variant="body2" style={{ paddingTop: 10, fontSize: '16px' }}>
                            {details?.amount}
                        </Typography>

                    </Grid>
                   
                </Grid>
                <Divider className={classes.divider} />
                <Grid container spacing={2}>
                    <Grid item xs={12} sm={6}>
                        <Typography variant="body1" component="h2" style={{ fontWeight: 'bold', fontSize: '1.0rem' }}>
                            Report To:
                        </Typography>
                        <Typography variant="body2" style={{ paddingTop: 10, fontSize: '16px' }} >
                            {details?.report_to?.name}
                        </Typography>
                    </Grid>
                    <Grid item xs={12} sm={6}>
                        <Typography variant="body1" component="h2" style={{ fontWeight: 'bold', fontSize: '1.0rem' }}>
                            Date of Activity

                        </Typography>
                        <Typography variant="body2" style={{ paddingTop: 10, fontSize: '16px' }}>
                            {details?.date_of_activity?.slice(8, 10)}-{details?.date_of_activity?.slice(5, 7)}-{details?.date_of_activity?.slice(0, 4)}
                        </Typography>

                    </Grid>

                </Grid>

                <Divider className={classes.divider} />
                <Grid container spacing={2}>
                    <Grid item xs={12} sm={6}>
                        <Typography variant="body1" component="h2" style={{ fontWeight: 'bold', fontSize: '1.0rem' }}>
                            Description:

                        </Typography>
                        <Typography variant="body2" style={{ paddingTop: 10, fontSize: '16px' }} >
                            {details?.description}
                        </Typography>

                    </Grid>

                </Grid>
            </CardContent>
        </Card>
    );
};

export default Details;
