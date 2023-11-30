import { DialogContent, Divider, Grid, Typography } from '@mui/material'
import { makeStyles } from "@material-ui/core"
import React from 'react'

function VendorDetails() {


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
                        Vendor Name:
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
                        Contact Name:    <Typography
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
                        style={{ fontWeight: "400", fontSize: "13px" }}
                    >
                        Emails:    <Typography
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
                        style={{ fontWeight: "400", fontSize: "13px" }}
                    >
                        Phone:    <Typography
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
                        style={{ fontWeight: "400", fontSize: "13px" }}
                    >
                        Address:
                    </Typography>
                    <Typography
                        variant="body2"
                        style={{ paddingTop: 10, fontSize: "16px" }}
                    >

                    </Typography>
                </Grid>
            </Grid>
        </DialogContent >
    )
}

export default VendorDetails