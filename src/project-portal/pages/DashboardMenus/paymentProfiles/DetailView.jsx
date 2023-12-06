import {
  Box,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Divider,
  Grid,
  Slide,
  Typography,
} from "@mui/material"
import { makeStyles } from "@mui/styles"
import React from "react"
import { useState } from "react"
import { useEffect } from "react"
import { categories } from "../../../../api/Endpoints/Category"
import { VendorsApi } from "../../../../api/Endpoints/Vendors"
import { VendorPayments } from "../../../../api/Endpoints/VendorPayments"
import { TaxAccount } from "../../../../api/Endpoints/TaxAccount"
import { SubscriptionsApi } from "../../../../api/Endpoints/Subscriptions"
import { TransactionsApi } from "../../../../api/Endpoints/Transactions"
import { ring } from "ldrs"

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />
})

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

const DetailView = (props) => {
  const classes = useStyles()
  const [open, setOpen] = React.useState(true)
  // const handleClickOpen = () => { props.onNew(); };
  const handleClose = () => {
    props.handleClose(false)
    // setOpen(false);
  }
  const [details, setDetails] = useState()
  const [loading, setLoading] = useState(false)

  const fetchActivityDetails = () => {
    setLoading(true)
    ring.register()
    TransactionsApi.getDetails({ id: props.id })
      .then((response) => {
        setDetails(response.data.data)
        setLoading(false)
      })
      .catch((errors) => {
        console.log(errors)
        setLoading(false)
      })
  }

  useEffect(() => {
    fetchActivityDetails()
  }, [props.id])

  return (
    <>
      <Dialog
        open={open}
        PaperProps={{
          sx: {
            width: "50%",
            height: "100%",
            position: "fixed",
            right: 0,
            top: 0,
            bottom: 0,
            m: 0,
            p: 0,
            borderRadius: 0,
            maxHeight: "100%",
          },
        }}
        TransitionComponent={Transition}
        keepMounted
        onClose={handleClose}
        aria-describedby="alert-dialog-slide-description"
      >
        <DialogTitle>Details</DialogTitle>

        {!loading ? (
          <DialogContent>
            <Grid container spacing={2}>
              <Grid item xs={12} sm={6}>
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
                ></Typography>
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
                  Profie Type:
                </Typography>
                <Typography
                  variant="body2"
                  style={{ paddingTop: 10, fontSize: "16px" }}
                ></Typography>
              </Grid>
              <Grid item xs={12} sm={6}>
                <Typography
                  variant="body1"
                  component="h2"
                  style={{ fontWeight: "400", fontSize: "13px" }}
                >
                  Profile:
                </Typography>
                <Typography
                  variant="body2"
                  style={{ paddingTop: 10, fontSize: "16px" }}
                ></Typography>
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
                  {details?.payment_channel?.title}
                </Typography>
              </Grid>
              <Grid item xs={12} sm={6}>
                <Typography
                  variant="body1"
                  component="h2"
                  style={{ fontWeight: "400", fontSize: "13px" }}
                >
                  Tax ID:
                </Typography>
                <Typography
                  variant="body2"
                  style={{ paddingTop: 10, fontSize: "16px" }}
                >
                  {details?.transaction_type}
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
                  Billing Country:
                </Typography>
                <Typography
                  variant="body2"
                  style={{ paddingTop: 10, fontSize: "16px" }}
                >
                  {details?.payment_channel?.title}
                </Typography>
              </Grid>
              <Grid item xs={12} sm={6}>
                <Typography
                  variant="body1"
                  component="h2"
                  style={{ fontWeight: "400", fontSize: "13px" }}
                >
                  Billing Currency:
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
                  Billing Address
                </Typography>
                <Typography
                  variant="body2"
                  style={{ paddingTop: 10, fontSize: "16px" }}
                ></Typography>
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
                  Account Contact Name:
                </Typography>
                <Typography
                  variant="body2"
                  style={{ paddingTop: 10, fontSize: "16px" }}
                >
                  {details?.payment_channel?.title}
                </Typography>
              </Grid>
              <Grid item xs={12} sm={6}>
                <Typography
                  variant="body1"
                  component="h2"
                  style={{ fontWeight: "400", fontSize: "13px" }}
                >
                  Account Contact Phone:
                </Typography>
              </Grid>
            </Grid>{" "}
            <Divider className={classes.divider} />{" "}
            <Grid container spacing={2}>
              <Grid item xs={12} sm={6}>
                <Typography
                  variant="body1"
                  component="h2"
                  style={{ fontWeight: "400", fontSize: "13px" }}
                >
                  Invoice Mail IDs:
                </Typography>
                <Typography
                  variant="body2"
                  style={{ paddingTop: 10, fontSize: "16px" }}
                ></Typography>
              </Grid>
            </Grid>{" "}
            <Divider className={classes.divider} />{" "}
            <Grid container spacing={2}>
              <Grid item xs={12} sm={6}>
                <Typography
                  variant="body1"
                  component="h2"
                  style={{ fontWeight: "400", fontSize: "13px" }}
                >
                  Remarks:
                </Typography>
                <Typography
                  variant="body2"
                  style={{ paddingTop: 10, fontSize: "16px" }}
                ></Typography>
              </Grid>
            </Grid>
          </DialogContent>
        ) : (
          <Box id="loader-circle">
            <l-ring
              size="40"
              stroke="3"
              bg-opacity="0"
              speed="2"
              color="blue"
            />
          </Box>
        )}
        <DialogActions>
          <Button onClick={handleClose}>Close</Button>
        </DialogActions>
      </Dialog>
    </>
  )
}

export default DetailView
