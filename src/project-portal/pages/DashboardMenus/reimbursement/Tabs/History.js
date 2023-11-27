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

const History = () => {
    const classes = useStyles();

    return (
        <Card className={classes.card}>
            <CardContent>
                <Grid container spacing={2}>
                    <Grid item xs={12} sm={6}>
                        <Typography variant="body1" component="h2" style={{ fontWeight: 'bold', fontSize: '1.1rem' }}>
                            Type:
                        </Typography>
                        <Typography variant="body2" style={{ paddingTop: 10, fontSize: '16px' }}>
                            Test
                        </Typography>

                    </Grid>
                    <Grid item xs={12} sm={6}>
                        <Typography variant="body1" component="h2" style={{ fontWeight: 'bold', fontSize: '1.1rem' }}>
                            Field Name:
                        </Typography>
                        <Typography variant="body2" style={{ paddingTop: 10, fontSize: '16px' }}>
                            Test                        </Typography>
                    </Grid>
                </Grid>
                <Divider className={classes.divider} />
                <Grid container spacing={2}>
                    <Grid item xs={12} sm={6}>
                        <Typography variant="body1" component="h2" style={{ fontWeight: 'bold', fontSize: '1.0rem' }}>
                            Old Value:

                        </Typography>
                        <Typography variant="body2" style={{ paddingTop: 10, fontSize: '16px' }}>

                            30000
                        </Typography>

                    </Grid>
                    <Grid item xs={12} sm={6}>
                        <Typography variant="body1" component="h2" style={{ fontWeight: 'bold', fontSize: '1.0rem' }}>
                            New Value:
                        </Typography>
                        <Typography variant="body2" style={{ paddingTop: 10, fontSize: '16px' }} >
                            31000
                        </Typography>
                    </Grid>
                </Grid>
                <Divider className={classes.divider} />
                <Grid container spacing={2}>
                    <Grid item xs={12} sm={6}>
                        <Typography variant="body1" component="h2" style={{ fontWeight: 'bold', fontSize: '1.0rem' }}>
                            Changed By:

                        </Typography>
                        <Typography variant="body2" style={{ paddingTop: 10, fontSize: '16px' }} >

                            Jhone
                        </Typography>

                    </Grid>
                    <Grid item xs={12} sm={6}>
                        <Typography variant="body1" component="h2" style={{ fontWeight: 'bold', fontSize: '1.0rem' }}>
                            Changed Date :
                        </Typography>
                        <Typography variant="body2" style={{ paddingTop: 10, fontSize: '16px' }} >
                            10-08-2022
                        </Typography>
                    </Grid>
                </Grid>
            </CardContent>
        </Card>
    );
};

export default History;
