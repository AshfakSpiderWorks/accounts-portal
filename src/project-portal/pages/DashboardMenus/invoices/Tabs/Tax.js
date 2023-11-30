import { FormControlLabel, Grid, Checkbox } from '@mui/material';
import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import TextInput from '../../../../form/TextInput';
import SelectX from '../../../../form/SelectX';
import { LoadingButton } from '@mui/lab';

function Tax() {
    const [formButtonStatus, setFormButtonStatus] = useState({
        label: "Submit",
        loading: false,
        disabled: false,
    })
    const {
        register,
        handleSubmit,
        watch,
        formState: { errors },
        control,
        setValue,
        getValues,
        reset,
    } = useForm();
    const fetchYears = (e) => {
        return new Promise((resolve) => {
            setTimeout(() => {
                const yearData = [];
                const currentYear = new Date().getFullYear();
                for (let year = 2000; year <= currentYear; year++) {
                    yearData.push({ id: year, name: year.toString() });
                }

                resolve(yearData);
            }, 1000);
        });
    };

    return (
        <Grid container p={2}>
            <Grid item xs={10}>
                <TextInput
                    control={control}
                    // placeholder="Enter product Name"
                    name="gst_number"
                    label="GST Number"
                    value={watch('gst_number')}
                />
            </Grid>
            <Grid container spacing={2} alignItems={'end'} pt={2}>

                <Grid item xs={5}  >
                    <SelectX
                        label="GST Filing"
                        options={fetchYears}
                        placeholder="Year"
                        control={control}
                        name={"gst_years"}
                        defaultValue={watch("gst_years")}
                    />
                </Grid>
                <Grid item xs={5}>
                    <SelectX
                        options={fetchYears}
                        placeholder="Month"
                        control={control}
                        name={"gst_month"}
                        defaultValue={watch("gst_month")}
                    />
                </Grid>

            </Grid>
            <Grid container spacing={2} alignItems={'end'} pt={2}>
                <Grid item sm={4} mt={1}>
                    <FormControlLabel
                        control={<Checkbox />}
                        label="GST Excempted"
                    />
                </Grid>
                <Grid item sm={6} mt={1}>
                    <FormControlLabel
                        control={<Checkbox />}
                        label="GST Verified"
                    />
                </Grid>
            </Grid>
            <Grid item xs={10} pt={2}>
                <TextInput
                    control={control}
                    // placeholder="Enter product Name"
                    name="gst-remarks"
                    label="GST Remarks"
                    value={watch('gst-remarks')}
                    isMultiline
                    row={3}
                />
            </Grid>

            <Grid container spacing={2} alignItems={'end'} pt={3}>
                <Grid item xs={4}>
                    <TextInput
                        control={control}
                        // placeholder="Enter product Name"
                        name="tds"
                        label="TDS Amount"
                        value={watch('tds')}
                    />
                </Grid>
                <Grid item xs={4}  >
                    <SelectX
                        label="TDS Filing"
                        options={fetchYears}
                        placeholder="Year"
                        control={control}
                        name={"years"}
                        defaultValue={watch("years")}
                    />
                </Grid>
                <Grid item xs={4}>
                    <SelectX
                        options={fetchYears}
                        placeholder="Month"
                        control={control}
                        name={"month"}
                        defaultValue={watch("month")}
                    />
                </Grid>

            </Grid>
            <Grid item sm={12} mt={1} p={1}>
                <FormControlLabel
                    control={<Checkbox />}
                    label="TDS Verified"
                />
            </Grid><Grid sx={{ mt: 1 }} p={1} item xs={12}>
                <LoadingButton
                    loading={formButtonStatus.loading}
                    disabled={formButtonStatus.disabled}
                    variant="outlined"
                    type="submit"
                >
                    {formButtonStatus.label}
                </LoadingButton>
            </Grid>
        </Grid >
    );
}

export default Tax;
