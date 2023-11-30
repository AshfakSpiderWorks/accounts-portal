import { DialogContent, Divider, Grid, Typography } from '@mui/material'
import { makeStyles } from "@material-ui/core"
import React from 'react'

function Details() {


    const useStyles = makeStyles((theme) => ({
        card: {
            margin: theme.spacing(2),
            padding: theme.spacing(2),
            boxShadow: "1px 2px 2px 2px rgba(0, 0, 0, 0.3)",
        },
        title: {
            fontWeight: "bold",
        },
        divider: {
            margin: theme.spacing(1.3, 0),
        },
        select: {
            minWidth: 200,
        },
    }))
    const classes = useStyles()
    return (
        <DialogContent>
            <Grid container spacing={2}>
                <Grid item xs={12} sm={12}>
                    <Typography
                        variant="body1"
                        component="h2"
                        style={{ fontWeight: "400", fontSize: "13px" }}
                    >
                        Title:
                    </Typography>
                    <Typography
                        variant="body2"
                        style={{ paddingTop: 10, fontSize: "16px" }}
                    >

                    </Typography>
                </Grid>
            </Grid>
            <Divider className={classes.divider} />



            <Grid container spacing={2}>
                <Grid item xs={12} sm={6}>
                    <Typography
                        variant="body1"
                        component="h2"
                        style={{ fontWeight: "400", fontSize: "13px" }}
                    >
                        Business Account:
                    </Typography>
                    <Typography
                        variant="body2"
                        style={{ fontWeight: "400", fontSize: "13px" }}
                    >

                    </Typography>
                </Grid>
                <Grid item xs={12} sm={6}>
                    <Typography
                        variant="body1"
                        component="h2"
                        style={{ fontWeight: "400", fontSize: "13px" }}
                    >
                        Tax Account:
                    </Typography>
                    <Typography
                        variant="body2"
                        style={{ paddingTop: 10, fontSize: "16px" }}
                    >

                    </Typography>
                </Grid>
            </Grid>
            <Divider className={classes.divider} />
            <Grid container spacing={2}>
                <Grid item xs={12} sm={6}>
                    <Typography
                        variant="body1"
                        component="h2"
                        style={{ fontWeight: "400", fontSize: "13px" }}
                    >
                        Client :
                    </Typography>
                    <Typography
                        variant="body2"
                        style={{ paddingTop: 10, fontSize: "16px" }}
                    >

                    </Typography>
                </Grid>
                <Grid item xs={12} sm={6}>
                    <Typography
                        variant="body1"
                        component="h2"
                        style={{ fontWeight: "400", fontSize: "13px" }}
                    >
                        Payment Profile:
                    </Typography>
                    <Typography
                        variant="body2"
                        style={{ paddingTop: 10, fontSize: "16px" }}
                    >

                    </Typography>
                </Grid>
            </Grid>
            <Divider className={classes.divider} />
            <Grid container spacing={2}>
                <Grid item xs={12} sm={6}>
                    <Typography
                        variant="body1"
                        component="h2"
                        style={{ fontWeight: "400", fontSize: "13px" }}
                    >
                        Invoice Category:
                    </Typography>
                    <Typography
                        variant="body2"
                        style={{ paddingTop: 10, fontSize: "16px" }}
                    >

                    </Typography>
                </Grid>
                <Grid item xs={12} sm={6}>
                    <Typography
                        variant="body1"
                        component="h2"
                        style={{ fontWeight: "400", fontSize: "13px" }}
                    >
                        Status:
                    </Typography>
                    <Typography
                        variant="body2"
                        style={{ paddingTop: 10, fontSize: "16px" }}
                    >

                    </Typography>
                </Grid>
            </Grid>
            <Divider className={classes.divider} />

            <Grid container spacing={2}>
                <Grid item xs={12} sm={6}>
                    <Typography
                        variant="body1"
                        component="h2"
                        style={{ fontWeight: "400", fontSize: "13px" }}
                    >
                        Invoice Code:
                    </Typography>
                    <Typography
                        variant="body2"
                        style={{ paddingTop: 10, fontSize: "16px" }}
                    >

                    </Typography>
                </Grid>
                <Grid item xs={12} sm={6}>
                    <Typography
                        variant="body1"
                        component="h2"
                        style={{ fontWeight: "400", fontSize: "13px" }}
                    >
                        Invoice Date:
                    </Typography>
                    <Typography
                        variant="body2"
                        style={{ paddingTop: 10, fontSize: "16px" }}
                    >

                    </Typography>
                </Grid>
            </Grid>
            <Divider className={classes.divider} />
            <Grid container spacing={2}>
                <Grid item xs={12} sm={6}>
                    <Typography
                        variant="body1"
                        component="h2"
                        style={{ fontWeight: "400", fontSize: "13px" }}
                    >
                        Payment Channel:
                    </Typography>
                    <Typography
                        variant="body2"
                        style={{ paddingTop: 10, fontSize: "16px" }}
                    >

                    </Typography>
                </Grid>
                <Grid item xs={12} sm={6}>
                    <Typography
                        variant="body1"
                        component="h2"
                        style={{ fontWeight: "400", fontSize: "13px" }}
                    >
                        Payment Date :
                    </Typography>
                    <Typography
                        variant="body2"
                        style={{ paddingTop: 10, fontSize: "16px" }}
                    >

                    </Typography>
                </Grid>

            </Grid>
            <Divider className={classes.divider} />
            <Grid container spacing={2}>
                <Grid item xs={12} sm={6}>
                    <Typography
                        variant="body1"
                        component="h2"
                        style={{ fontWeight: "400", fontSize: "13px" }}
                    >
                        Default Currency:
                    </Typography>
                    <Typography
                        variant="body2"
                        style={{ paddingTop: 10, fontSize: "16px" }}
                    >

                    </Typography>
                </Grid>    <Grid item xs={12} sm={6}>
                    <Typography
                        variant="body1"
                        component="h2"
                        style={{ fontWeight: "400", fontSize: "13px" }}
                    >
                        Local Currency :
                    </Typography>
                    <Typography
                        variant="body2"
                        style={{ paddingTop: 10, fontSize: "16px" }}
                    >

                    </Typography>
                </Grid>

            </Grid>
            <Divider className={classes.divider} />
            <Grid container spacing={2}>
                <Grid item xs={12} sm={6}>
                    <Typography
                        variant="body1"
                        component="h2"
                        style={{ fontWeight: "400", fontSize: "13px" }}
                    >
                        Foreign Currency :
                    </Typography>
                    <Typography
                        variant="body2"
                        style={{ paddingTop: 10, fontSize: "16px" }}
                    >

                    </Typography>
                </Grid>
                <Grid item xs={12} sm={6}>
                    <Typography
                        variant="body1"
                        component="h2"
                        style={{ fontWeight: "400", fontSize: "13px" }}
                    >
                        Conversion Rate :
                    </Typography>
                    <Typography
                        variant="body2"
                        style={{ paddingTop: 10, fontSize: "16px" }}
                    >

                    </Typography>
                </Grid>

            </Grid>

            <Divider className={classes.divider} />
            <Grid container spacing={2}>
                <Grid item xs={12} sm={12}>
                    <Typography
                        variant="body1"
                        component="h2"
                        style={{ fontWeight: "400", fontSize: "13px" }}
                    >
                        Warning Notes:
                    </Typography>
                    <Typography
                        variant="body2"
                        style={{ paddingTop: 10, fontSize: "16px" }}
                    >

                    </Typography>
                </Grid>
            </Grid>
            <Divider className={classes.divider} />
            <Grid container spacing={2}>
                <Grid item xs={12} sm={12}>
                    <Typography
                        variant="body1"
                        component="h2"
                        style={{ fontWeight: "400", fontSize: "13px" }}
                    >
                        Audit Remarks:
                    </Typography>
                    <Typography
                        variant="body2"
                        style={{ paddingTop: 10, fontSize: "16px" }}
                    >

                    </Typography>
                </Grid>
            </Grid>
            <Divider className={classes.divider} />
            <Grid container spacing={2}>
                <Grid item xs={12} sm={12}>
                    <Typography
                        variant="body1"
                        component="h2"
                        style={{ fontWeight: "400", fontSize: "13px" }}
                    >
                        Private Remarks:
                    </Typography>
                    <Typography
                        variant="body2"
                        style={{ paddingTop: 10, fontSize: "16px" }}
                    >

                    </Typography>
                </Grid>
            </Grid>
            <Divider className={classes.divider} />
            <Grid container spacing={2}>
                <Grid item xs={12} sm={12}>
                    <Typography
                        variant="body1"
                        component="h2"
                        style={{ fontWeight: "400", fontSize: "13px" }}
                    >
                        Description:
                    </Typography>
                    <Typography
                        variant="body2"
                        style={{ paddingTop: 10, fontSize: "16px" }}
                    >

                    </Typography>
                </Grid>
            </Grid>
        </DialogContent>
    )
}

export default Details