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
        Employee.getEmployeeDetails({ id: props.id }).then((response) => {
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
                            Name:
                        </Typography>
                        <Typography variant="body2" style={{ paddingTop: 10, fontSize: '16px' }}>
                            {details?.user?.name}
                        </Typography>

                    </Grid>
                    <Grid item xs={12} sm={6}>
                        <Typography variant="body1" component="h2" style={{ fontWeight: 'bold', fontSize: '1.1rem' }}>
                            Email:
                        </Typography>
                        <Typography variant="body2" style={{ paddingTop: 10, fontSize: '16px' }}>
                            {details?.email}
                        </Typography>
                    </Grid>
                </Grid>
                <Divider className={classes.divider} />
                <Grid container spacing={2}>
                    <Grid item xs={12} sm={6}>
                        <Typography variant="body1" component="h2" style={{ fontWeight: 'bold', fontSize: '1.0rem' }}>
                            Role:

                        </Typography>
                        <Typography variant="body2" style={{ paddingTop: 10, fontSize: '16px' }}>
                            {details?.role?.name}
                        </Typography>

                    </Grid>
                    <Grid item xs={12} sm={6}>
                        <Typography variant="body1" component="h2" style={{ fontWeight: 'bold', fontSize: '1.0rem' }}>
                            Joining Date

                        </Typography>
                        <Typography variant="body2" style={{ paddingTop: 10, fontSize: '16px' }}>
                            {details?.joining_date?.slice(8, 10)}-{details?.joining_date?.slice(5, 7)}-{details?.joining_date?.slice(0, 4)}
                        </Typography>

                    </Grid>
                </Grid>
                <Divider className={classes.divider} />
                <Grid container spacing={2}>
                    <Grid item xs={12} sm={6}>
                        <Typography variant="body1" component="h2" style={{ fontWeight: 'bold', fontSize: '1.0rem' }}>
                            Phone Number:
                        </Typography>
                        <Typography variant="body2" style={{ paddingTop: 10, fontSize: '16px' }} >
                            {details?.phone_number}
                        </Typography>
                    </Grid>
                    <Grid item xs={12} sm={6}>
                        <Typography variant="body1" component="h2" style={{ fontWeight: 'bold', fontSize: '1.0rem' }}>
                            Emergency Contacts:

                        </Typography>
                        <Typography variant="body2" style={{ paddingTop: 10, fontSize: '16px' }} >
                            {details?.emergency_contacts}
                        </Typography>

                    </Grid>

                </Grid>

                <Divider className={classes.divider} />
                <Grid container spacing={2}>
                    <Grid item xs={12} sm={6}>
                        <Typography variant="body1" component="h2" style={{ fontWeight: 'bold', fontSize: '1.0rem' }}>
                            Employment Status :
                        </Typography>
                        <Typography variant="body2" style={{ paddingTop: 10, fontSize: '16px' }} >


                            {details?.employment_status}
                        </Typography>
                    </Grid>
                    <Grid item xs={12} sm={6}>
                        <Typography variant="body1" component="h2" style={{ fontWeight: 'bold', fontSize: '1.0rem' }}>
                            Employeee Level:

                        </Typography>
                        <Typography variant="body2" style={{ paddingTop: 10, fontSize: '16px' }} >
                            {details?.employee_level}
                        </Typography>

                    </Grid>
                </Grid>

                <Divider className={classes.divider} />
                <Grid container spacing={2}>
                    <Grid item xs={12} sm={6}>
                        <Typography variant="body1" component="h2" style={{ fontWeight: 'bold', fontSize: '1.0rem' }}>
                            Eligible Leaves:

                        </Typography>
                        <Typography variant="body2" style={{ paddingTop: 10, fontSize: '16px' }} >
                            {details?.is_eligible_for_leaves}
                        </Typography>

                    </Grid>
                    <Grid item xs={12} sm={6}>
                        <Typography variant="body1" component="h2" style={{ fontWeight: 'bold', fontSize: '1.0rem' }}>
                            Address :
                        </Typography>
                        <Typography variant="body2" style={{ paddingTop: 10, fontSize: '16px' }} >
                            {details?.address}
                        </Typography>
                    </Grid>

                </Grid>
            </CardContent>
        </Card>
    );
};

export default Details;
