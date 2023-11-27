import React, { useEffect, useState } from 'react';
import { Button, Card, Dialog, DialogActions, DialogContent, DialogTitle, Grid, Slide, Typography } from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import { yupResolver } from "@hookform/resolvers/yup/dist/yup";
import * as yup from "yup";
import { useForm } from "react-hook-form";
import SelectX from '../../../form/SelectX'
import TextInput from '../../../form/TextInput'
import { ErrorMessage } from "@hookform/error-message";
import { LoadingButton } from "@mui/lab";
import { Departments } from '../../../../api/Endpoints/Departments';
import { VendorPayments } from '../../../../api/Endpoints/VendorPayments';


const Transition = React.forwardRef(function Transition(props, ref) {
    return <Slide direction="up" ref={ref} {...props} />;
});

const scheme = yup.object().shape({
    parant_organisations_id: yup.object().required(),
    name: yup.string().required(),
    email: yup.string().email(),
    phone_number: yup.string(),
    employee_roles_id: yup.object(),
    address: yup.string(),
    emergency_contacts: yup.string(),
    joining_date: yup.date(),
    remarks: yup.string(),
});


const Create = (props) => {

    const { register, handleSubmit, watch, formState: { errors }, control, setValue, getValues, reset } = useForm({ resolver: yupResolver(scheme), criteriaMode: "all" });
    const [open, setOpen] = useState(false)
    const [loading, setLoading] = useState(false)
    const [editValues, setEditValues] = useState({})


    const [formButtonStatus, setFormButtonStatus] = useState({
        label: "Submit",
        loading: false,
        disabled: false,
    });


    const handleClickOpen = () => {
        props.onNew()
    };

    const handleClose = () => {
        setTimeout(() => {
            props.setEditId(undefined)
        }, 400);
        setOpen(false);
    };

    const onSubmit = () => {
        console.log('hello');
    }


    const fetchBusinessCountry = (e) => {

        return Departments.get({ keyword: e }).then(response => {
            if (typeof response.data.data.data !== "undefined") {
                let data = [
                    { id: 0, name: 'INDIA' },
                    { id: 1, name: 'UAE' }
                ]
                return data
            } else {
                return response.data.data.data;
            }
        })
    }
    const fetchVendors = (e) => {
        return VendorPayments.vendors({ keyword: e }).then(response => {
            if (typeof response.data.data !== "undefined") {
                return response.data.data;
            } else {
                return [];
            }
        })
    }
    useEffect(() => {
        if (parseInt(props.editId) > 0) {
            setOpen(true);
        } else if (Number(props.editId) == 0) {
            setOpen(true);
        }

    }, [props.editId])

    return (
        <div>
            <Button variant="contained" onClick={handleClickOpen}>
                {props.icon ? <AddIcon style={{
                    display: 'flex',
                    alignItems: 'center',
                    flexWrap: 'wrap',
                }} /> : "Create Vendor Bill"}
            </Button>
            <Dialog
                open={open}
                PaperProps={{ sx: { width: "50%", height: "100%", position: "fixed", right: 0, top: 0, bottom: 0, m: 0, p: 0, borderRadius: 0, maxHeight: '100%' } }}
                TransitionComponent={Transition}
                keepMounted
                onClose={handleClose}
                aria-describedby="alert-dialog-slide-description"
            >
                <DialogTitle >{parseInt(props.editId) > 0 ? "Edit Vendor Bill" : "Create Vendor Bill"}</DialogTitle>

                <DialogContent>

                    <form onSubmit={handleSubmit(onSubmit)}>
                        <Grid container>

                            <Grid container p={1} spacing={2} >
                                <Grid sm={6} item>
                                    <TextInput control={control}
                                        name="title"
                                        label="Title"
                                    />
                                </Grid>
                                <Grid item sm={6}>
                                    <SelectX
                                        label={"Vendor"}
                                        options={fetchVendors}
                                        control={control}
                                        name={'vendor'}
                                        defaultValue={watch('vendor')}
                                    />
                                </Grid>
                            </Grid>

                            <Grid item xs={12}>

                                <Grid sx={{ p: 1 }} item xs={12}>
                                    <TextInput control={control}
                                        name="vendor_details"
                                        isMultiline
                                        label={"Vendor Details"}
                                        row={2}

                                    />
                                </Grid>
                            </Grid>


                            <Grid container p={1} spacing={2} >
                                <Grid sm={6} item>
                                    <TextInput control={control}
                                        name="vendor_id"
                                        label="Vendor Id"
                                    />
                                </Grid>
                                <Grid item sm={6}>
                                    <TextInput control={control}
                                        name="order_id"
                                        label="Order Id"
                                    />
                                </Grid>
                            </Grid>


                            <Grid container p={1} spacing={2} >
                                <Grid sm={12} item>
                                    <TextInput control={control}
                                        name="bill_number"
                                        label="Bill Number"
                                    />
                                </Grid>
                            </Grid>

                            <Grid container p={1} spacing={2} >
                                <Grid item sm={6}>
                                    <TextInput control={control}
                                        name="Invoice_number"
                                        label="Invoice Number"

                                    />
                                </Grid>
                                <Grid sm={6} item>
                                    <TextInput control={control}
                                        name="tax_id"
                                        label="Tax ID"
                                    />
                                </Grid>

                            </Grid>



                            <Grid item xs={12}>

                                <Grid sx={{ p: 1 }} item xs={12}>
                                    <TextInput control={control}
                                        name="description"
                                        isMultiline
                                        label={"Description"}
                                        row={4}

                                    />
                                </Grid>
                            </Grid>
                            <Grid sx={{ p: 1 }} item xs={12}>
                                <ErrorMessage
                                    errors={errors}
                                    name="multipleErrorInput"
                                    render={({ messages }) =>
                                        messages &&
                                        Object.entries(messages).map(([type, message]) => (
                                            <p key={type}>{message}</p>
                                        ))
                                    }
                                />

                                <LoadingButton loading={formButtonStatus.loading} disabled={formButtonStatus.disabled}
                                    variant="outlined" type="submit">{formButtonStatus.label}</LoadingButton>
                            </Grid>
                        </Grid>
                    </form>

                </DialogContent>

                <DialogActions>
                    <Button onClick={handleClose}>Close</Button>
                </DialogActions>

            </Dialog>
        </div>
    )
}

export default Create;
