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
import { toast } from 'react-hot-toast';
import { categories } from '../../../../api/Endpoints/Category';


const Transition = React.forwardRef(function Transition(props, ref) {
    return <Slide direction="up" ref={ref} {...props} />;
});

const scheme = yup.object().shape({
    name: yup.string().required(),
});


const CreateCategory = (props) => {

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

        let dataToSubmit = {
            id:props.editId,
            name: data.name,
            description: data.description
        }

        console.log(dataToSubmit);
        let action;

        if (props.editId > 0) {
            console.log(dataToSubmit);
            action = categories.update(dataToSubmit)
        } else {
            console.log(dataToSubmit);
            action = categories.add(dataToSubmit)
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

    const fetchDetails = () => {
        setLoading(true)
        categories.view({ id: props.editId }).then((response) => {
            console.log(response);
            let data = response.data.data
            setValue('name', data.name)
            setValue('description', data.description)
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
                }} /> : "Create Category"}
            </Button>
            <Dialog
                open={open}
                PaperProps={{ sx: { width: "50%", height: "100%", position: "fixed", right: 0, top: 0, bottom: 0, m: 0, p: 0, borderRadius: 0, maxHeight: '100%' } }}
                TransitionComponent={Transition}
                keepMounted
                onClose={handleClose}
                aria-describedby="alert-dialog-slide-description"
            >
                <DialogTitle >{parseInt(props.editId) > 0 ? "Edit Category" : "Create Category"}</DialogTitle>

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

                        <Grid sx={{}} item xs={12}>
                            <TextInput control={control}
                                // placeholder="Enter product Name"
                                name="name"
                                label="Name"
                                value={watch('name')} />
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

                        <Grid sx={{ pt: 2 }} item xs={12}>
                            <LoadingButton loading={formButtonStatus.loading} disabled={formButtonStatus.disabled}
                                variant="outlined" type="submit">{formButtonStatus.label}</LoadingButton>
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

export default CreateCategory;
