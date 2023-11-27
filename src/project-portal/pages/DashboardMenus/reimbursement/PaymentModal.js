import React, { useEffect, useState } from 'react';
import {
    Button,
    Dialog,
    DialogActions,
    DialogContent,
    DialogContentText,
    DialogTitle, Grid,
    InputLabel,
    TextareaAutosize,
    Select,
    TextField,
    Card,
    Slide, Typography
} from "@mui/material";
import * as yup from "yup";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import DateInput from '../../../form/DateInput'
import TextInput from '../../../form/TextInput';
import SelectX from "../../../form/SelectX";
import toast from "react-hot-toast";
import { LoadingButton } from "@mui/lab";
import moment from "moment";
import { ErrorMessage } from '@hookform/error-message';
import AddIcon from "@mui/icons-material/Add";
import CurrentDateInput from '../../../form/CurrenDateInput';
import ReactSelector from 'react-select';
import TimeInput from '../../../form/DateInput';
import Modal from '@mui/material/Modal';
import Box from '@mui/material/Box';
import { blue } from '@mui/material/colors';


const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 500,
    bgcolor: 'background.paper',
    borderRadius: 2,
    boxShadow: 24,
    p: 4,
};

const Transition = React.forwardRef(function Transition(props, ref) {
    return <Slide direction="up" ref={ref} {...props} />;
});





const scheme = yup.object().shape({
    payment_remarks: yup.string().required(),
    payment_date: yup.string().required(),
    transaction_id: yup.string(),
})

export default function PaymentModal(props) {
    const { register, handleSubmit, watch, formState: { errors }, control, Controller, setValue, getValues, reset } = useForm({ resolver: yupResolver(scheme) });
    const [open, setOpen] = useState(false);
    const handleOpen = () => setOpen(true);
    const handleClose = () => {
        props.handleOpen(false)
        setOpen(false);
    }


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

    const approvelstatus = [
        { value: "New", label: 'New' },
        { value: 'Manager Approval Pending', label: 'Manager Approval Pending' },
        { value: 'Manager_Approved', label: 'Manager Approved' },
        { value: 'finance approved', label: 'Finance Approved' },
        { value: 'User Action Required', label: 'User Action Required' },
        { value: 'paid', label: 'Paid' },
        { value: 'On Hold', label: 'On Hold' },
        { value: 'rejected', label: 'Rejected' },
    ];

    const onSubmit = (data) => {
        console.log(data);
        setFormButtonStatus({ ...formButtonStatus, loading: true });
        setAlerts({ active: false, message: "Internal server error", type: "error" })



        // let dataToSubmit = {
        //     name: data.guest_name,
        //     email: data.guest_email,
        //     phone: data.guest_phonenumber
        // }


        // Guest.CreateGuest(dataToSubmit).then((response) => {
        //     console.log(response);
        //     setFormButtonStatus({ label: "Submitted", loading: false, disabled: true })
        //     setAlerts({ active: true, message: response.data.message, type: response.data.status })
        //     setFormButtonStatus({ label: "Create", loading: false, disabled: false })
        //     toast.success(response.data.message)
        //     props.onUpdate()
        //     props.onSubmit(response.data.data)
        //     setOpen(false)
        //     setTimeout(() => { setAlerts({}) }, 2000)
        // }).catch(errors => {
        //     console.log(errors);
        //     setOpen(false)
        //     toast.error("server error")
        //     setAlerts({ active: true, message: "Internal server error", type: "error" })
        //     setFormButtonStatus({ label: "Create", loading: false, disabled: false });
        // })
    }

    const Bstyle = {
        bgcolor: blue[400],
        height: '30px',
        color: 'white',
        marginLeft: 'auto',
        '&:hover': {
            color: 'black',
            backgroundColor: 'lightblue',
        },
    }


    useEffect(() => {
        if (props.id) {
            handleOpen()
        }
    }, [])

    return (
        <div>
            <Modal
                open={open}
                onClose={handleClose}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
            >
                <Box sx={style}>
                    <Typography sx={{marginBottom:2}} id="modal-modal-title" variant="h6" component="h2">
                        Payment Deatils
                    </Typography>

                    <form onSubmit={handleSubmit(onSubmit)}>

                        <Grid sx={{ p: 1, mt: 3 }} item xs={12}>
                            <TextInput control={control}
                                name="payment_remarks"
                                isMultiline
                                label="Payment Remarks"
                                value={watch('payment_remarks')} />
                        </Grid>

                        <Grid container spacing={2} sx={{ display: 'flex',p:1 }}>
                            <Grid sx={{   }} item xs={6} sm={6}>
                                <TextInput control={control}
                                    name="amount"
                                    label="Amount"
                                    value={watch('amount')} />

                            </Grid>
                            <Grid sx={{ p: 1 }} item xs={6} sm={6}>
                                <InputLabel sx={{
                                    color: "black",
                                    fontSize: '14px',
                                    fontWeight: 500,
                                    pb: .5,
                                }}>Status</InputLabel>
                                <ReactSelector
                                    value={
                                        approvelstatus.filter(option =>
                                            option.label === watch('status'))
                                    }
                                    options={approvelstatus}
                                    name='status'
                                    // isClearable={true}
                                    defaultValue={(watch('status'))}
                                    onChange={(selectedOption) => setValue('status', selectedOption.value || '')}
                                />


                            </Grid>
                        </Grid>
                        <Grid sx={{ p: 1 }} item xs={12}>
                            <DateInput
                                control={control}
                                name="payment_date"
                                label="Payment Date"
                                value={watch('payment_date')}
                            />
                        </Grid>
                        <Grid sx={{ p: 1 }} item xs={12}>
                            <TextInput control={control}
                                name="transaction_id"
                                label="Transaction ID"
                                value={watch('transaction_id')} />
                        </Grid>



                        <Grid sx={{ p: 1, display: 'flex', justifyContent: 'space-between' }} item xs={12}>
                            <Grid>
                                <LoadingButton loading={formButtonStatus.loading} disabled={formButtonStatus.disabled}
                                    variant="outlined" type="submit">{formButtonStatus.label}
                                </LoadingButton>
                            </Grid>
                            <Grid>
                                <Button onClick={handleClose}>
                                    Close
                                </Button>
                            </Grid>
                        </Grid>
                    </form>
                </Box>
            </Modal>
        </div>
    );
}