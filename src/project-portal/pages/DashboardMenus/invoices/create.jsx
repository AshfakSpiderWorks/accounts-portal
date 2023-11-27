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


const CreateInvoices = (props) => {

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
        // props.setEditId(undefined)
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

    useEffect(() => {
        if (parseInt(props.editId) > 0) {
            setEditValues(props.rowdetails.row)
            setOpen(true);
            console.log(editValues);
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
                }} /> : "Create Invoices"}
            </Button>
            <Dialog
                open={open}
                PaperProps={{ sx: { width: "50%", height: "100%", position: "fixed", right: 0, top: 0, bottom: 0, m: 0, p: 0, borderRadius: 0, maxHeight: '100%' } }}
                TransitionComponent={Transition}
                keepMounted
                onClose={handleClose}
                aria-describedby="alert-dialog-slide-description"
            >
                <DialogTitle >{parseInt(props.editId) > 0 ? "Edit Invoice" : "Create Business Invoice"}</DialogTitle>

                <DialogContent>

                                <form onSubmit={handleSubmit(onSubmit)}>
                                    <Grid container>

                                        <Grid sx={{ p: 1 }} item xs={12} alignItems={'center'} display={'flex'}>
                                            <Grid xs={6}>
                                                <Typography variant='subtitle_1'>Title</Typography>
                                            </Grid>
                                            <Grid xs={6}>

                                                <TextInput control={control} name="title"

                                                    value={editValues.Name} />
                                            </Grid>
                                        </Grid>

                                        <Grid sx={{ p: 1 }} item xs={12} alignItems={'center'} display={'flex'}>
                                            <Grid xs={12}>
                                                <Typography variant='subtitle_1'>Payment Profile</Typography>
                                            </Grid>
                                            <Grid xs={12}>
                                                <SelectX
                                                    options={fetchBusinessCountry}
                                                    control={control}
                                                    name={'payment_profile'}
                                                    defaultValue={watch('payment_profile')}
                                                />
                                            </Grid>
                                        </Grid>


                                        {/* <Grid sx={{ p: 1 }} item xs={12}>
                                            <SelectX
                                                label={"Payment Profile"}
                                                options={fetchBusinessCountry}
                                                control={control}
                                                name={'payment_profile'}
                                                defaultValue={watch('payment_profile')}
                                            />
                                        </Grid> */}

                                        <Grid sx={{ p: 1 }} item xs={12} alignItems={'center'} display={'flex'}>
                                            <Grid xs={12}>
                                                <Typography variant='subtitle_1'>Payment Channel</Typography>
                                            </Grid>
                                            <Grid xs={12}>
                                                <SelectX
                                                    options={fetchBusinessCountry}
                                                    control={control}
                                                    name={'payment_channel'}
                                                    defaultValue={watch('payment_channel')}
                                                />
                                            </Grid>
                                        </Grid>

                                        {/* <Grid sx={{ p: 1 }} item xs={12}>
                                            <SelectX
                                                label={"Payment Channel"}
                                                options={fetchBusinessCountry}
                                                control={control}
                                                name={'payment_channel'}
                                                defaultValue={watch('payment_channel')}
                                            />
                                        </Grid> */}

                                        <Grid sx={{ p: 1 }} item xs={12} alignItems={'center'} display={'flex'}>
                                            <Grid xs={12}>
                                                <Typography variant='subtitle_1'>Currency</Typography>
                                            </Grid>
                                            <Grid xs={12}>

                                                <TextInput control={control} name="currency"

                                                    value={editValues.Currency} />
                                            </Grid>
                                        </Grid>

                                        {/* <Grid sx={{ p: 1 }} item xs={12}>
                                            <TextInput control={control} name="currency"
                                                label="Currency"
                                                value={watch('currency')} />
                                        </Grid> */}

                                        <Grid sx={{ p: 1 }} item xs={12} alignItems={'center'} display={'flex'}>
                                            <Grid xs={6}>
                                                <Typography variant='subtitle_1'>Alternate Currency</Typography>
                                            </Grid>
                                            <Grid xs={6}>

                                                <TextInput control={control} name="alternate_currency"

                                                    value={watch('alternate_currency')} />
                                            </Grid>
                                        </Grid>

                                        {/* <Grid sx={{ p: 1 }} item xs={12}>
                                            <TextInput control={control} name="alternate_currency"
                                                label="Alternate Currency"
                                                value={watch('alternate_currency')} />
                                        </Grid> */}

                                        <Grid sx={{ p: 1 }} item xs={12} alignItems={'center'} display={'flex'}>
                                            <Grid xs={6}>
                                                <Typography variant='subtitle_1'>Conversion Rate</Typography>
                                            </Grid>
                                            <Grid xs={6}>

                                                <TextInput control={control} name="Conversion_rate"

                                                    value={watch('Conversion_rate')} />
                                            </Grid>
                                        </Grid>

                                        {/* <Grid sx={{ p: 1 }} item xs={12}>
                                            <TextInput control={control} name="Conversion_rate"
                                                label="Conversion Rate"
                                                value={watch('Conversion_rate')} />
                                        </Grid> */}

                                        <Grid sx={{ p: 1 }} item xs={12}>
                                            <TextInput control={control} name="description" isMultiline
                                                label={"Description"}

                                            />
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

export default CreateInvoices;
