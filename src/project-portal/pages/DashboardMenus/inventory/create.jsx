import React, { useEffect, useState } from 'react';
import { Button, Card, Dialog, DialogActions, DialogContent, DialogTitle, Grid, InputLabel, Slide, TextField, Typography } from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import { yupResolver } from "@hookform/resolvers/yup/dist/yup";
import * as yup from "yup";
import { useForm } from "react-hook-form";
import SelectX from '../../../form/SelectX'
import TextInput from '../../../form/TextInput'
import { ErrorMessage } from "@hookform/error-message";
import { LoadingButton } from "@mui/lab";
import { Departments } from '../../../../api/Endpoints/Departments';
import DateInput from '../../../form/DateInput';
import moment from 'moment';
import { categories } from '../../../../api/Endpoints/Category';
import { VendorsApi } from '../../../../api/Endpoints/Vendors';
import { toast } from 'react-hot-toast';
import { Inventories } from '../../../../api/Endpoints/Inventory';


const Transition = React.forwardRef(function Transition(props, ref) {
    return <Slide direction="up" ref={ref} {...props} />;
});

const scheme = yup.object().shape({
    product_name: yup.string().required(),
    vendor: yup.object(),
    category: yup.object(),
    transaction_id: yup.string(),
    purchased_date: yup.string(),
    purchased_price: yup.string(),
});


const CreateInventory = (props) => {

    const { register, handleSubmit, watch, formState: { errors }, control, setValue, getValues, reset } = useForm({ resolver: yupResolver(scheme), criteriaMode: "all" });
    const [open, setOpen] = useState(false)
    const [loading, setLoading] = useState(false)
    const [editValues, setEditValues] = useState({})
    const [refresh, setRefresh] = React.useState(false);



    const [formButtonStatus, setFormButtonStatus] = useState({
        label: "Submit",
        loading: false,
        disabled: false,
    });

    const [alerts, setAlerts] = useState({
        type: '',
        message: '',
        active: false
    })


    const handleClickOpen = () => {
        props.onNew()
    };

    const handleClose = () => {
        props.setEditId()
        setOpen(false);
    };

    const onSubmit = (data) => {
        console.log(data);
        setFormButtonStatus({ ...formButtonStatus, loading: true });
        setAlerts({ active: false, message: "Internal server error", type: "error" })

        let date = moment(data.purchased_date).format('YYYY-MM-DD');

        let dataToSubmit = {
            id: props.editId,
            name: data.product_name,
            vendor_id: data.vendor.id,
            category_id: data.category.id,
            transaction_id: data.transaction_id,
            purchased_on: date,
            purchased_price: data.purchased_price,
            description: data.description,
            // purchase_details: data.purchase_details
        }

        console.log(dataToSubmit);
        let action;

        if (props.editId > 0) {
            console.log(dataToSubmit);
            action = Inventories.update(dataToSubmit)
        } else {
            console.log(dataToSubmit);
            action = Inventories.add(dataToSubmit)
        }
        action.then((response) => {
            console.log(response.data);
            setFormButtonStatus({ label: "Submitted", loading: false, disabled: true })
            setAlerts({ active: true, message: response.data.message, type: response.data.status })
            setFormButtonStatus({ label: "Create", loading: false, disabled: false })
            toast.success(response.data.message)
            props.onUpdate()
            setOpen(false)
            setTimeout(() => { setAlerts({}) }, 2000)
        }).catch(errors => {
            console.log(errors);
            setOpen(false)
            toast.error("server error")
            setAlerts({ active: true, message: "Internal server error", type: "error" })
            setFormButtonStatus({ label: "Create", loading: false, disabled: false });
        })

    }


    const fetchCategory = (e) => {
        return categories.list({ keyword: e }).then(response => {
            if (typeof response.data.data.data !== "undefined") {
                return response.data.data.data
            } else {
                return []
            }
        })
    }
    const fetchVendor = (e) => {
        return VendorsApi.list({ keyword: e }).then(response => {
            if (typeof response.data.data.data !== "undefined") {
                return response.data.data.data
            } else {
                return []
            }
        })
    }


    const fetchDetails = () => {
        setLoading(true)
        Inventories.getDetails({ id: props.editId }).then((response) => {
            console.log(response);
            let data = response.data.data
            setValue('product_name', data.name)
            setValue('vendor', { id: data.vendor.id, name: data?.vendor?.name })
            setValue('category', { id: data?.category?.id, name: data?.category?.name })
            setValue('transaction_id', data.transaction_id)
            setValue('purchased_date', data.purchased_on)
            setValue('purchased_price', data.purchased_price)
            setValue('description', data.description)
            // setValue('purchase_details', data.purchase_details)

            setLoading(false)
        })
    }


    useEffect(() => {
        if (parseInt(props.editId) > 0) {
            fetchDetails()
            setOpen(true);
        } else if (Number(props.editId) === 0) {
            setOpen(true);
        }

    }, [])

    return (
        <div>
            <Button variant="contained" onClick={handleClickOpen}>
                {props.icon ? <AddIcon style={{
                    display: 'flex',
                    alignItems: 'center',
                    flexWrap: 'wrap',
                }} /> : "Create Inventory"}
            </Button>
            <Dialog
                open={open}
                PaperProps={{ sx: { width: "50%", height: "100%", position: "fixed", right: 0, top: 0, bottom: 0, m: 0, p: 0, borderRadius: 0, maxHeight: '100%' } }}
                TransitionComponent={Transition}
                keepMounted
                onClose={handleClose}
                aria-describedby="alert-dialog-slide-description"
            >
                <DialogTitle >{parseInt(props.editId) > 0 ? "Edit Inventory" : "Create Inventory"}</DialogTitle>

                <DialogContent>

                    {
                        !loading ?
                        <form onSubmit={handleSubmit(onSubmit)}>

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

                            <Grid sx={{  }} item xs={12}>
                                <TextInput control={control}
                                    // placeholder="Enter product Name"
                                    name="product_name"
                                    label="Product Name"
                                    value={watch('product_name')} />
                            </Grid>

                            <Grid container spacing={1} sx={{  pt: 2 }}>
                                <Grid item xs={6}>
                                    <SelectX
                                        key={refresh * 0.2}
                                        label={"Vendor"}
                                        options={fetchVendor}
                                        control={control}
                                        error={errors?.assign_to?.id ? errors?.assign_to?.id?.message : false}
                                        error2={errors?.assign_to?.message ? errors?.assign_to?.message : false}
                                        name={'vendor'}
                                        defaultValue={watch('vendor')}
                                    />
                                </Grid>

                                <Grid item xs={6}>
                                    <SelectX
                                        key={refresh * 0.2}
                                        label={"Category"}
                                        options={fetchCategory}
                                        control={control}
                                        error={errors?.assign_to?.id ? errors?.assign_to?.id?.message : false}
                                        error2={errors?.assign_to?.message ? errors?.assign_to?.message : false}
                                        name={'category'}
                                        defaultValue={watch('category')}
                                    />
                                </Grid>
                            </Grid>

                            <Grid sx={{ pt:2 }} item xs={12}>
                                <TextInput control={control}
                                    name="transaction_id"
                                    label="Transaction ID"
                                    value={watch('transaction_id')} />
                            </Grid>

                            <Grid container spacing={1} sx={{  pt: 2 }}>
                                <Grid item xs={6}>
                                    <DateInput
                                        control={control}
                                        name="purchased_date"
                                        label="Purchased Date"
                                        value={watch('purchased_date')}
                                    />
                                </Grid>

                                <Grid item xs={6}>
                                    <TextInput
                                        control={control}
                                        name="purchased_price"
                                        label="Purchased Price"
                                        value={watch('purchased_price')}
                                    />
                                </Grid>
                            </Grid>

                            <Grid sx={{  pt: 2 }} item xs={12}>
                                <InputLabel sx={{
                                    color: "black",
                                    pb: 1
                                }}>Description </InputLabel>
                                <TextField
                                    {...register('description')}
                                    variant="outlined"
                                    fullWidth
                                    multiline
                                    rows={2}
                                    sx={{ width: '100%', }}
                                    required
                                />
                            </Grid>

                            {/* <Grid sx={{ p: 1, pt: 1 }} item xs={12}>
                            <InputLabel sx={{
                                color: "black",
                                pb: 1
                            }}>Purchase Details </InputLabel>
                            <TextField
                                {...register('purchase_details')}
                                variant="outlined"
                                fullWidth
                                multiline
                                rows={2}
                                sx={{ width: '100%', }}
                                required
                            />
                        </Grid> */}

                            <Grid sx={{ pt: 2 }} item xs={12}>
                                <LoadingButton loading={formButtonStatus.loading} disabled={formButtonStatus.disabled}
                                    variant="outlined" type="submit">{formButtonStatus.label}</LoadingButton>
                            </Grid>
                        </form>
                        :
                        <>Loading..</>
                    }
                </DialogContent>

                <DialogActions>
                    <Button onClick={handleClose}>Close</Button>
                </DialogActions>

            </Dialog>
        </div>
    )
}

export default CreateInventory;
