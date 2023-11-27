import React from 'react';
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
} from "@mui/material";
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

const Details = () => {
    const classes = useStyles();

    return (
        <Card className={classes.card}>
            <CardContent>
                <Grid container spacing={2}>
                    <Grid item xs={12} sm={6}>
                        <Typography variant="body1" component="h2" style={{ fontWeight: 'bold', fontSize: '1.1rem' }}>
                            Vendor:
                        </Typography>
                        <Typography variant="body2" style={{ paddingTop: 10, fontSize: '16px' }}>
                            HP Laptop Service Center Kochi
                        </Typography>

                    </Grid>
                    <Grid item xs={12} sm={6}>
                        <Typography variant="body1" component="h2" style={{ fontWeight: 'bold', fontSize: '1.1rem' }}>
                            Title:
                        </Typography>
                        <Typography variant="body2" style={{ paddingTop: 10, fontSize: '16px' }}>
                            test
                        </Typography>
                    </Grid>
                </Grid>
                <Divider className={classes.divider} />
                <Grid container spacing={2}>
                    <Grid item xs={12} sm={6}>
                        <Typography variant="body1" component="h2" style={{ fontWeight: 'bold', fontSize: '1.0rem' }}>
                            Description:

                        </Typography>
                        <Typography variant="body2" style={{ paddingTop: 10, fontSize: '16px' }}>

                            Lorem, ipsum dolor sit amet consectetur adipisicing elit. Laudantium, cumque.
                        </Typography>

                    </Grid>
                    <Grid item xs={12} sm={6}>
                        <Typography variant="body1" component="h2" style={{ fontWeight: 'bold', fontSize: '1.0rem' }}>
                            Date Of Activity:

                        </Typography>
                        <Typography variant="body2" style={{ paddingTop: 10, fontSize: '16px' }}>

                            22/3/2022
                        </Typography>

                    </Grid>
                </Grid>
                <Divider className={classes.divider} />
                <Grid container spacing={2}>
                    <Grid item xs={12} sm={6}>
                        <Typography variant="body1" component="h2" style={{ fontWeight: 'bold', fontSize: '1.0rem' }}>
                            Amount:
                        </Typography>
                        <Typography variant="body2" style={{ paddingTop: 10, fontSize: '16px' }} >
                            3000$
                        </Typography>
                    </Grid>
                    <Grid item xs={12} sm={6}>
                        <Typography variant="body1" component="h2" style={{ fontWeight: 'bold', fontSize: '1.0rem' }}>
                            Manager name:

                        </Typography>
                        <Typography variant="body2" style={{ paddingTop: 10, fontSize: '16px' }} >

                            Jhone
                        </Typography>

                    </Grid>

                </Grid>
                <Divider className={classes.divider} />
                <Grid container spacing={2}>
                    <Grid item xs={12} sm={6}>
                        <Typography variant="body1" component="h2" style={{ fontWeight: 'bold', fontSize: '1.0rem' }}>
                            Status :
                        </Typography>
                        <Typography variant="body2" style={{ paddingTop: 10, fontSize: '16px' }} >


                            Manager Approved
                        </Typography>
                    </Grid>

                </Grid>
            </CardContent>
        </Card>
    );
};

export default Details;
