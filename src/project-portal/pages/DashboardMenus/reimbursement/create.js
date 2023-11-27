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
    Slide, Typography
} from "@mui/material";
import MonthPickerComponent from '../../../form/Monthpicker';
import { DatePicker } from '@mui/lab';
import * as yup from "yup";
import dayjs from 'dayjs';
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import TextInput from '../../../form/TextInput';
import DateInput from '../../../form/DateInput';
import { LoadingButton } from "@mui/lab";
import toast from "react-hot-toast";
import SelectX from '../../../form/SelectX';
import moment from "moment";
import { ErrorMessage } from '@hookform/error-message';
import AddIcon from "@mui/icons-material/Add";
import { Account } from "../../../../api/Endpoints/Account";
import CurrentDateInput from '../../../form/CurrenDateInput';
import { Project } from "../../../../api/Endpoints/Project";
import ReactSelector from 'react-select';
import { faHouseFloodWaterCircleArrowRight } from '@fortawesome/free-solid-svg-icons';
import { Employee } from '../../../../api/Endpoints/Employee';
import { ReimbursementApi } from '../../../../api/Endpoints/Reimbursement';

const Transition = React.forwardRef(function Transition(props, ref) {
    return <Slide direction="up" ref={ref} {...props} />;
});





const scheme = yup.object().shape({
    title: yup.string().required(),
    description: yup.string(),
    date_of_activity: yup.string(),
    manager_name: yup.object(),
    status: yup.string(),
    amount: yup.string(),
})


const CurrentStatus = [
    { value: "Not Started", label: 'Not Started' },
    { value: "Development In Progress", label: 'Development In Progress' },
    { value: "Under Maintenance", label: 'Under Maintenance' },
    { value: "Testing In Progress", label: 'Testing In Progress' },
    { value: "Completed", label: 'Completed' },
    { value: "Live ", label: 'Live ' },
];

const Create = (props) => {
    const { register, handleSubmit, watch, formState: { errors }, control, Controller, setValue, getValues, reset } = useForm({})
    const [selectedPriority, setSelectedPriority] = useState(3);
    const [open, setOpen] = React.useState(false);
    const [refresh, setRefresh] = React.useState(false);
    const [loading, setLoading] = React.useState(false);

    const handleClose = () => {
        props.setEditId()
        setOpen(false);
    };

    const handleClickOpen = () => {
        props.onNew()
    };
    //component variables
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

    const fetchClient = (e) => {
        let cleint_id = watch('client_id')
        return Account.get({ keyword: e }).then(response => {
            if (typeof response.data.data.data !== "undefined") {
                return response.data.data.data;
            } else {
                return [];
            }
        })
    }

    const prioriyTask = () => {

    }

        ;


    const handlePriorityChange = (id) => {
        setSelectedPriority(id);
    }


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


    const yearList = [];
    for (let year = 2020; year <= 2030; year++) {
        yearList.push({ value: year.toString(), label: year.toString() });
    }


    const Months = [
        {
            value: "January ", label: "January "
        },
        {
            value: "February", label: "February"
        },
        {
            value: "March", label: "March"
        },

        {
            value: "April", label: "April"
        },
        {
            value: "May", label: "May"
        },
        {
            value: "June", label: "June"
        },
        {
            value: "July", label: "July"
        },
        {
            value: "August", label: "August"
        },
        {
            value: "September", label: "September"
        },
        {
            value: "October", label: "October"
        },
        {
            value: "November", label: "November"
        },
        {
            value: "December", label: "December"
        },



    ];






    const onSubmit = (data) => {
        console.log(data);
        setFormButtonStatus({ ...formButtonStatus, loading: true });
        setAlerts({ active: false, message: "Internal server error", type: "error" })


        let date = moment(data.date_of_activity).format('YYYY-MM-DD');

        let dataToSubmit = {
            id: props.editId,
            title: data.title,
            description: data.description,
            date_of_activity: date,
            reports_to_id: data.manager_name?.id,
            status: data.status,
            amount: data.amount
        };

        console.log(dataToSubmit);
        let action;

        if (props.editId > 0) {
            console.log("dataToSubmit", dataToSubmit);
            action = ReimbursementApi.update(dataToSubmit)
        } else {
            action = ReimbursementApi.add(dataToSubmit)
        }
        action.then(response => {
            console.log("this is response data", response.data);
            setFormButtonStatus({ label: "Submitted", loading: false, disabled: true });
            setAlerts({ active: true, message: response.data.message, type: response.data.status })
            setFormButtonStatus({ label: "Create", loading: false, disabled: false });
            toast.success(response.data.message)
            props.onUpdate();
            setOpen(false);
            setTimeout(() => { setAlerts({}) }, 2000)
        }).catch(errors => {
            console.log(errors);
            toast.error("Internal server error");
            setAlerts({ active: true, message: "Internal server error", type: "error" })
            setFormButtonStatus({ label: "Create", loading: false, disabled: false });
        })
    }




    const fetchReimbursementDetails = async () => {
        let reimbursement = await ReimbursementApi.getDetails({ id: props.editId });
        console.log(reimbursement);
        if (reimbursement.data.status === "success") {
            console.log("successs");
            let data = reimbursement.data.data;
            console.log(data);
            setValue('title', data.title);
            setValue('amount', data.amount);
            setValue('manager_name', { id: data.report_to?.id, name: data.report_to?.name });
            setValue('date_of_activity', data.date_of_activity);
            setValue('status', data.status);
            setValue('description', data.description);
        }
    };



    const fetchEmployees = (e) => {
        return Employee.get({ keyword: e }).then(response => {
            console.log("this is projec name resonse", response.data.data.data);
            if (typeof response.data.data.data !== "undefined") {
                console.log(response.data.data.data);
                return response.data.data.data;
            } else {
                return [];
            }
        })
    }

    console.log("initial edit id  vlaue", props.editId);
    useEffect(() => {
        if (parseInt(props.editId) > 0) {
            fetchReimbursementDetails()
            setOpen(true);
        } else if (Number(props.editId) === 0) {
            console.log("edit id is false");
            setOpen(true);
        }

    }, [])

    useEffect(() => {
        setRefresh(Math.random())
    }, [watch('projects_id')])



    return (
        <div>
            <Button variant="contained" onClick={handleClickOpen}>
                {props.icon ? <AddIcon style={{
                    display: 'flex',
                    alignItems: 'center',
                    flexWrap: 'wrap',
                }} /> : "Create Reimbursement"}
            </Button>

            <Dialog
                open={open}
                PaperProps={{ sx: { width: "50%", height: "100%", position: "fixed", right: 0, top: 0, bottom: 0, m: 0, p: 0, borderRadius: 0, maxHeight: '100%' } }}
                TransitionComponent={Transition}
                keepMounted
                onClose={handleClose}
                aria-describedby="alert-dialog-slide-description"
            >
                <DialogTitle >{parseInt(props.editId) > 0 ? "Edit a work Request" : "Create Reimbursement"}</DialogTitle>
                <DialogContent>
                    {!loading ?
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

                            <Grid item xs={12}>
                                <TextInput
                                    control={control}
                                    name="title"
                                    label="Title"
                                    value={watch('title')}
                                />
                            </Grid>

                            <Grid sx={{ mt: 2 }} item xs={12}>
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


                            {/* <Grid sx={{ p: 1, mt: 1 }} item xs={12}>
                                    <InputLabel sx={{
                                        color: "black",
                                        pb: 1,
                                    }}>Campaign Id</InputLabel>
                                    <ReactSelector


                                        name='status'
                                        isClearable={true}
                                        defaultValue={(watch('status'))}
                                        onChange={(selectedOption) => setValue('status', selectedOption.value)}
                                    />


                                </Grid> */}

                            <Grid container spacing={1} sx={{ mt: 2 }}>
                                <Grid item xs={6}>
                                    <DateInput
                                        control={control}
                                        name="date_of_activity"
                                        label="Date Of Activity"
                                        value={watch('date_of_activity')}
                                    />
                                </Grid>
                                <Grid item xs={6}>
                                    <TextInput
                                        control={control}
                                        name="amount"
                                        label="Amount"
                                        value={watch('amount')}
                                    />
                                </Grid>

                            </Grid>
                            <Grid sx={{ mt: 2 }} item xs={12}>
                                <SelectX
                                    key={refresh * 0.2}
                                    label={"Manager Name"}
                                    options={fetchEmployees}
                                    control={control}
                                    error={errors?.assign_to?.id ? errors?.assign_to?.id?.message : false}
                                    error2={errors?.assign_to?.message ? errors?.assign_to?.message : false}
                                    name={'manager_name'}
                                    defaultValue={watch('manager_name')}
                                />
                            </Grid>
                            <Grid sx={{ mt: 2 }} item xs={12}>
                                <InputLabel sx={{
                                    color: "black",
                                    pb: 1,
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
                            <Grid sx={{ mt: 2 }} item xs={12}>
                                <LoadingButton loading={formButtonStatus.loading} disabled={formButtonStatus.disabled}
                                    variant="outlined" type="submit">{formButtonStatus.label}</LoadingButton>
                            </Grid>

                        </form>
                        :
                        <>Loading...</>
                    }

                </DialogContent>
                <DialogActions>
                    <Button onClick={handleClose}>Close</Button>
                </DialogActions>
            </Dialog>
        </div >
    );
};

export default Create
