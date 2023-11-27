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
            margin: theme.spacing(2, 0),
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
                        style={{ fontWeight: "bold", fontSize: "1.1rem" }}
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
                <Grid item xs={12} sm={12}>
                    <Typography
                        variant="body1"
                        component="h2"
                        style={{ fontWeight: "bold", fontSize: "1.1rem" }}
                    >
                        Vendor :    <Typography
                            variant="body2"
                            style={{ paddingTop: 10, fontSize: "16px", display: 'inline' }}
                        >

                        </Typography>
                    </Typography>

                </Grid>
            </Grid>
            <Divider className={classes.divider} />

            <Grid container spacing={2}>
                <Grid item xs={12} sm={12}>
                    <Typography
                        variant="body1"
                        component="h2"
                        style={{ fontWeight: "bold", fontSize: "1.1rem" }}
                    >
                        Vendor Details:
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
                        style={{ fontWeight: "bold", fontSize: "1.0rem" }}
                    >
                        Vendor Id:
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
                        style={{ fontWeight: "bold", fontSize: "1.0rem" }}
                    >
                        Order Id:
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
                        style={{ fontWeight: "bold", fontSize: "1.0rem" }}
                    >
                        Tax ID:
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
                        style={{ fontWeight: "bold", fontSize: "1.0rem" }}
                    >
                        Invoice Number:
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
                        style={{ fontWeight: "bold", fontSize: "1.0rem" }}
                    >
                        Bill Number:
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
                        style={{ fontWeight: "bold", fontSize: "1.0rem" }}
                    >
                        Bill Amount:
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
                        style={{ fontWeight: "bold", fontSize: "1.0rem" }}
                    >
                        SGST:
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
                        style={{ fontWeight: "bold", fontSize: "1.0rem" }}
                    >
                        CGST:
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
                        style={{ fontWeight: "bold", fontSize: "1.0rem" }}
                    >
                        IGST:
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
                        style={{ fontWeight: "bold", fontSize: "1.0rem" }}
                    >
                        VAT:
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
                        style={{ fontWeight: "bold", fontSize: "1.0rem" }}
                    >
                        TDS:
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
                        style={{ fontWeight: "bold", fontSize: "1.0rem" }}
                    >
                        Total Amount:
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
                        style={{ fontWeight: "bold", fontSize: "1.1rem" }}
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