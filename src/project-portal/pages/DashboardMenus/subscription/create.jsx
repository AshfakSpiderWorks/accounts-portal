import React, { useEffect, useState } from 'react';
import { Button, Card, Dialog, DialogActions, DialogContent, DialogTitle, Grid, Slide, Typography, Checkbox, InputLabel, TextField } from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import { yupResolver } from "@hookform/resolvers/yup/dist/yup";
import * as yup from "yup";
import { useForm } from "react-hook-form";
import SelectX from '../../../form/SelectX'
import TextInput from '../../../form/TextInput'
import DateInput from '../../../form/DateInput'
import { ErrorMessage } from "@hookform/error-message";
import { LoadingButton } from "@mui/lab";
import { Employee } from '../../../../api/Endpoints/Employee';
import { Departments } from '../../../../api/Endpoints/Departments';
import { Currency } from '../../../../api/Endpoints/Currency';
import ReactSelector from 'react-select';
import { toast } from 'react-hot-toast';
import { SubscriptionsApi } from '../../../../api/Endpoints/Subscriptions';
import moment from 'moment';


const Transition = React.forwardRef(function Transition(props, ref) {
    return <Slide direction="up" ref={ref} {...props} />;
});

const scheme = yup.object().shape({
    currency: yup.object().required(),
    title: yup.string().required(),
    description: yup.string().required(),
    amount: yup.string().required(),
    payment_cycle: yup.string().required(),
    subscription_start_date: yup.string().required(),
    subscription_end_date: yup.string().required(),
    // joining_date: yup.date(),
    // remarks: yup.string(),
});


const CreateSubscriptions = (props) => {

    const { register, handleSubmit, watch, formState: { errors }, control, setValue, getValues, reset } = useForm({ resolver: yupResolver(scheme), criteriaMode: "all" });
    const [open, setOpen] = useState(false)
    const [loading, setLoading] = useState(false)

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

    const PaymentCycle = [
        { label: 'Daily', value: 'Daily' },
        { label: 'Weekly', value: 'Weekly' },
        { label: 'Monthly', value: 'Monthly' },
        { label: 'Quarterly', value: 'Quarterly' },
        { label: 'Semi Annually', value: 'Semi Annually' },
        { label: 'Annually', value: 'Annually' },
        { label: 'One Time', value: 'One Time' }
    ]


    const fetchCurrency = (e) => {
        return Currency.get({ keyword: e }).then(response => {
            if (typeof response.data.data !== "undefined") {
                return response.data.data
            } else {
                return [];
            }
        })
    }

    const onSubmit = (data) => {
        console.log(data);
        setFormButtonStatus({ ...formButtonStatus, loading: true });
        setAlerts({ active: false, message: "Internal server error", type: "error" })

        let start_date = moment(data.subscription_start_date).format('YYYY-MM-DD');
        let end_date = moment(data.subscription_end_date).format('YYYY-MM-DD');

        let dataToSubmit = {
            id: props.editId,
            title: data.title,
            currency_id: data.currency.id,
            payment_cycle: data.payment_cycle,
            amount: data.amount,
            start_date:start_date,
            end_date:end_date,
            description: data.description,
            // purchase_details: data.purchase_details
        }

        console.log(dataToSubmit);
        let action;

        if (props.editId > 0) {
            console.log(dataToSubmit);
            action = SubscriptionsApi.update(dataToSubmit)
        } else {
            console.log(dataToSubmit);
            action = SubscriptionsApi.add(dataToSubmit)
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

    const fetchSubscriptionDetails = async () => {
        let Subscription = await SubscriptionsApi.getDetails({ id: props.editId });
        console.log(Subscription);
        if (Subscription.data.status === "success") {
          console.log("successs");
          let data = Subscription.data.data;
          setValue('title', data.title);
          setValue('currency', { id: data.currency?.id, name: data.currency?.name });
          setValue('amount',data.amount);
          setValue('payment_cycle',data.payment_cycle);
          setValue('subscription_start_date',data.start_date);
          setValue('subscription_end_date',data.end_date);
          setValue('description', data.description);
        }
      };

    useEffect(() => {

        if (parseInt(props.editId) > 0) {
            fetchSubscriptionDetails()
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
                }} /> : "Create Subscription"}
            </Button>
            <Dialog
                open={open}
                PaperProps={{ sx: { width: "50%", height: "100%", position: "fixed", right: 0, top: 0, bottom: 0, m: 0, p: 0, borderRadius: 0, maxHeight: '100%' } }}
                TransitionComponent={Transition}
                keepMounted
                onClose={handleClose}
                aria-describedby="alert-dialog-slide-description"
            >
                <DialogTitle >{parseInt(props.editId) > 0 ? "Edit Subscriptions" : "Create Subscriptions"}</DialogTitle>

                <DialogContent>
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
                        <Grid container>
                            <Grid sx={{}} item xs={12}>
                                <TextInput control={control}
                                    // placeholder="Enter product Name"
                                    name="title"
                                    label="Title"
                                    value={watch('title')} />
                            </Grid>

                            <Grid sx={{ pt: 2 }} item xs={12}>
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

                            <Grid container spacing={1} sx={{ pt: 2 }}>
                                <Grid item xs={6}>
                                    <TextInput control={control}
                                        // placeholder="Enter product Name"
                                        name="amount"
                                        label="Amount"
                                        value={watch('amount')} />
                                </Grid>

                                <Grid item xs={6}>
                                    <SelectX
                                        // key={refresh * 0.2}
                                        label={"Currency"}
                                        options={fetchCurrency}
                                        control={control}
                                        error={errors?.assign_to?.id ? errors?.assign_to?.id?.message : false}
                                        error2={errors?.assign_to?.message ? errors?.assign_to?.message : false}
                                        name={'currency'}
                                        defaultValue={watch('currency')}
                                    />
                                </Grid>
                            </Grid>

                            <Grid sx={{ pt: 2 }} item xs={12}>
                                <InputLabel sx={{
                                    color: "black",
                                    fontSize: "14px",
                                    pb: .5
                                }}>Payment Cycle</InputLabel>
                                <ReactSelector
                                    styles={{ menu: provided => ({ ...provided, zIndex: 9999 }) }}
                                    // label="Payment Cycle"
                                    options={PaymentCycle}
                                    value={
                                        PaymentCycle.filter(option =>
                                            option.label === watch('payment_cycle'))
                                    }
                                    name='payment_cycle'
                                    // isClearable={true}
                                    defaultValue={(watch('payment_cycle'))}
                                    onChange={(selectedOption) => setValue('payment_cycle', selectedOption?.value || "")}
                                />
                            </Grid>


                            <Grid container spacing={1} sx={{ pt: 2 }}>
                                <Grid item xs={6}>
                                    <DateInput
                                        control={control}
                                        name="subscription_start_date"
                                        label="Subscription Start Date"
                                        value={watch('subscription_start_date')}
                                    />
                                </Grid>

                                <Grid item xs={6}>
                                    <DateInput
                                        control={control}
                                        name="subscription_end_date"
                                        label="Subscription End Date"
                                        value={watch('subscription_end_date')}
                                    />
                                </Grid>
                            </Grid>



                            {/* <Grid sx={{ p: 1 }} item xs={12}>
                                            <TextInput control={control} name="Subscription"
                                                label="Subscription"
                                                value={watch('Subscription')} />
                                        </Grid> */}

                            {/* <Grid sx={{ p: 1 }} item xs={12} alignItems={'center'} display={'flex'}>
                                <Grid xs={6}>
                                    <Typography variant='subtitle_1'>Amount</Typography>
                                </Grid>
                                <Grid xs={6}>

                                    <TextInput control={control} name="Amount"

                                    // value={editValues.Amount} 
                                    />
                                </Grid>
                            </Grid> */}

                            {/* <Grid sx={{ p: 1 }} item xs={12} alignItems={'center'} display={'flex'}>
                            <Grid xs={6}>
                                <Typography variant='subtitle_1'>Payment Cycle</Typography>
                            </Grid>
                            <Grid xs={6}>
                                <SelectX
                                    options={fetchPaymentCycle}
                                    control={control}
                                    name={'paymentcycle'}
                                // defaultValue={editValues.PaymentCycle}
                                />
                            </Grid>
                        </Grid> */}


                            <Grid sx={{ pt: 2 }} item xs={12}>
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
        </div >
    )
}

export default CreateSubscriptions;
