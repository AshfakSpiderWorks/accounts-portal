import React, { useState } from 'react';
import { Button, Card, Dialog, DialogActions, DialogContent, DialogTitle, Grid, Slide, Typography } from "@mui/material";
import * as yup from "yup";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup/dist/yup";
import { Organisations } from '../../../../api/Endpoints/Organisation';
import SelectX from '../../../form/SelectX'
import TextInput from '../../../form/TextInput'
import DateInput from '../../../form/DateInput'
import { Departments } from '../../../../api/Endpoints/Departments';
import { Employee } from '../../../../api/Endpoints/Employee';
import { LoadingButton } from "@mui/lab";
import toast from "react-hot-toast";
import { ErrorMessage } from "@hookform/error-message";
import AddIcon from "@mui/icons-material/Add";
import { useEffect } from 'react';
import moment from 'moment';

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

    const handleClickOpen = () => {
        props.onNew()
    };

    const handleClose = () => {
        props.setEditId(undefined)
        setOpen(false);
    };


    const [formButtonStatus, setFormButtonStatus] = useState({
        label: "Submit",
        loading: false,
        disabled: false,
    });

    const fetchOrganisations = (e) => {
        return Organisations.get({ keyword: e }).then(response => {
            if (typeof response.data.data.data !== "undefined") {
                return response.data.data.data;
            } else {
                return [];
            }
        })
    }

    const fetchDepartments = (e) => {
        return Departments.get({ keyword: e }).then(response => {
            if (typeof response.data.data.data !== "undefined") {
                return response.data.data.data;
            } else {
                return [];
            }
        })
    }

    const fetchEmployeeRoles = (e) => {
        return Employee.getRoles({ keyword: e }).then(response => {
            if (typeof response.data.data.data !== "undefined") {
                return response.data.data.data;
            } else {
                return [];
            }
        })
    }

    const onSubmit = (data) => {
        setFormButtonStatus({ ...formButtonStatus, loading: true });
        let JoinDate = moment(data.joining_date).format('YYYY-MM-DD');
        let dataToSubmit = {
            parant_organisations_id: data.parant_organisations_id.id,
            name: data.name,
            email: data.email,
            phone_number: data.phone_number,
            departments_id: data.departments_id.id,
            employee_roles_id: data.employee_roles_id.id,
            address: data.address,
            emergency_contacts: data.emergency_contacts,
            joining_date: JoinDate,
            remarks: data.remarks,
        };


        let action;
        if (props.editId > 0) {
            console.log("this si datatosubmit", dataToSubmit);
            action = Employee.update(dataToSubmit);
        } else {
            console.log("this si datatosubmit", dataToSubmit);
            action = Employee.add(dataToSubmit);

        }

        action.then(response => {
            setFormButtonStatus({ label: "Submitted", loading: false, disabled: true });
            setFormButtonStatus({ label: "Create", loading: false, disabled: false });
            if (response.data.errors) {
                toast.error("The email or phone number has already been taken")
                return
            }
            toast.success(response.data.message)
            props.onUpdate();
            setOpen(false)
        }).catch(errors => {
            toast.error("Internal server error");
            setFormButtonStatus({ label: "Create", loading: false, disabled: false });
            setOpen(false)
        })
    }



    useEffect(() => {
        if (parseInt(props.editId) > 0) {
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
                }} /> : "Create Employee"}
            </Button>

            <Dialog
                open={open}
                PaperProps={{ sx: { width: "50%", height: "100%", position: "fixed", right: 0, top: 0, bottom: 0, m: 0, p: 0, borderRadius: 0, maxHeight: '100%' } }}
                TransitionComponent={Transition}
                keepMounted
                onClose={handleClose}
                aria-describedby="alert-dialog-slide-description"
            >
                <DialogTitle >{parseInt(props.editId) > 0 ? "Edit Employee" : "Create Employee"}</DialogTitle>
                <DialogContent>
                    <form onSubmit={handleSubmit(onSubmit)}>
                        <Grid container>
                            <Grid sx={{ p: 1 }} item xs={12}>
                                <SelectX
                                    label={"Choose an organization"}
                                    options={fetchOrganisations}
                                    control={control}
                                    name={'parant_organisations_id'}
                                    defaultValue={watch('parant_organisations_id')}
                                    error={errors?.parant_organisations_id?.id ? errors?.parant_organisations_id?.id?.message : false}
                                    error2={errors?.parant_organisations_id?.message ? errors?.parant_organisations_id?.message : false}
                                />
                            </Grid>

                            <Grid sx={{ p: 1 }} item xs={12}>
                                <TextInput control={control} name="name"
                                    label="Name"
                                    value={watch('name')} />
                            </Grid>


                            <Grid sx={{ p: 1 }} item xs={12}>
                                <TextInput control={control} name="email"
                                    label="Email"
                                    value={watch('email')} />
                            </Grid>


                            <Grid sx={{ p: 1 }} item xs={12}>
                                <TextInput control={control} name="phone_number"
                                    label="Phone number"
                                    value={watch('phone_number')} />
                            </Grid>

                            <Grid sx={{ p: 1 }} item xs={12}>
                                <SelectX
                                    label={"Choose a department"}
                                    options={fetchDepartments}
                                    control={control}
                                    name={'departments_id'}
                                    defaultValue={watch('departments_id')}
                                />
                            </Grid>

                            <Grid sx={{ p: 1 }} item xs={12}>
                                <SelectX
                                    defaultOptions
                                    label={"Choose a role to employee"}
                                    options={fetchEmployeeRoles}
                                    control={control}
                                    name={'employee_roles_id'}
                                    defaultValue={watch('employee_roles_id')}
                                />
                            </Grid>

                            <Grid sx={{ p: 1 }} item xs={12}>
                                <TextInput control={control} name="address" isMultiline
                                    label="Address"
                                    value={watch('address')} />
                            </Grid>

                            <Grid sx={{ p: 1 }} item xs={12}>
                                <TextInput control={control} name="emergency_contacts"
                                    label="Emergency contact numbers"
                                    value={watch('emergency_contacts')} />
                            </Grid>


                            <Grid sx={{ p: 1 }} item xs={12}>
                                <DateInput
                                    control={control}
                                    name="joining_date"
                                    label="Joinging Date"
                                    value={watch('joining_date')}
                                />
                            </Grid>

                            <Grid sx={{ p: 1 }} item xs={12}>
                                <TextInput control={control} name="remarks" isMultiline
                                    label="Remarks"
                                    value={watch('remarks')} />
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
        </div >
    );
};

export default Create;
