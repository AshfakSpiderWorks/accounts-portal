import React, { useEffect, useState } from 'react';
import { Box, Button, Dialog, DialogActions, DialogContent, DialogTitle, Grid, Typography } from '@mui/material';
import TextInput from '../../../../form/TextInput';
import { useForm } from 'react-hook-form';
import { LoadingButton } from '@mui/lab';
import DetailView from '../../transactions/DetailView';
import SelectX from '../../../../form/SelectX';
import Select from 'react-select'
import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup/dist/yup';
import { WorkOrders } from '../../../../../api/Endpoints/WorkOrders';


const AddLIstItems = ({ open, setOpen, ID, setID, invoicetab }) => {
    const validationSchema = yup.object().shape({
        title: yup.string().required('Title is required'),
        price: yup.number().required('Price is required').positive('Price must be positive'),
        qty: yup.number().required('Quantity is required').positive('Quantity must be positive'),
        // Add more validations for other fields as needed
    });

    const { register, handleSubmit, formState: { errors }, control, setValue, watch } = useForm(
    );
    const fetchTransactions = (e) => {
        return new Promise((resolve) => {
            setTimeout(() => {
                const data = [
                ];
                resolve(data);
            }, 1000);
        });
    };

    const [TotalValue, setTotalValue] = useState(33)
    const [formButtonStatus, setFormButtonStatus] = useState({
        label: "Submit",
        loading: false,
        disabled: false,
    });
    const handleClose = () => {
        setOpen(false);
        setID(null)
    };



    const findNetValue = (price, qty) => {
        const result = price * qty
        setValue('net_value', result)
    }

    const findTaxAmount = (fieldName, netvalue, percentage) => {
        const taxAmount = percentage * netvalue;
        setValue(fieldName, taxAmount)
        findTotalAmount()
    }


    const findTotalAmount = () => {
        const netValue = watch('net_value')
        if (netValue === undefined) {
            setTotalValue(0)
            return
        }
        const sgstPercentage = watch('sgst')
        const cgstPercentage = watch('cgst')
        const vatPercentage = watch('vat')
        const igstPercentage = watch('igst')
        const TotalAmountAfterCalc = netValue + sgstPercentage + cgstPercentage + vatPercentage + igstPercentage

        setTotalValue(TotalAmountAfterCalc)
    }




    const fetchPercentage = (e) => {
        return new Promise((resolve) => {
            setTimeout(() => {
                const data = [];
                for (let i = 8; i <= 25; i++) {
                    data.push({ id: i, name: `${i}%` });
                }
                resolve(data);
            }, 1000);
        });
    };
    const fetchWorkOrders = (e) => {
        return WorkOrders.get({ keyword: e }).then((response) => {
            return response.data.data.data
        })
    }
    useEffect(() => {
        try {
            if (watch('price') || watch('qty')) {
                const price = watch('price');
                const quantity = watch('qty');
                findNetValue(price, quantity);
            }

            if (watch('net_value') && watch('sgst-drop')) {
                const percentage = watch('sgst-drop').id
                const netValue = watch('net_value')
                findTaxAmount('sgst', netValue, percentage)
            } else {
                setValue('sgst', null)
                findTotalAmount()
            }


            if (watch('net_value') && watch('cgst-drp')) {
                const percentage = watch('cgst-drp').id
                const netValue = watch('net_value')
                findTaxAmount('cgst', netValue, percentage)
            } else {
                setValue('cgst', null)
                findTotalAmount()
            }
            if (watch('net_value') && watch('igst-drp')) {
                const percentage = watch('igst-drp').id
                const netValue = watch('net_value')
                findTaxAmount('igst', netValue, percentage)
            } else {
                setValue('igst', null)
                findTotalAmount()
            }

            if (watch('net_value') && watch('vat-drp')) {
                const percentage = watch('vat-drp').id
                const netValue = watch('net_value')
                findTaxAmount('vat', netValue, percentage)
            } else {
                setValue('vat', null)
                findTotalAmount()
            }

        } catch (error) {

        }


    }, [
        watch('price'),
        watch('qty'),
        watch('sgst-drop'),
        watch('cgst-drp'),
        watch('igst-drp'),
        watch('vat-drp')]);

    return (
        <div>

            <Dialog open={open} onClose={handleClose} fullWidth maxWidth="sm">
                <DialogContent>
                    <Grid container padding={1}>
                        {invoicetab &&
                            <>

                                <Grid sm={8} item padding={1}>
                                    <SelectX
                                        label={"Work Order"}
                                        options={fetchWorkOrders}
                                        control={control}
                                        name={'work_orders'}
                                        defaultValue={watch('work_orders')}
                                    />
                                </Grid>
                            </>
                        }
                        <Grid container p={1} spacing={2} >
                            <Grid sm={12} item>
                                <TextInput control={control}
                                    name="title"
                                    label="Title"
                                />
                            </Grid>

                        </Grid>
                        <Grid container p={1} spacing={2} >
                            <Grid sm={4} item>
                                <TextInput control={control}
                                    name="price"
                                    label="Price"
                                    type={'number'}
                                />
                            </Grid>
                            <Grid sm={4} item>
                                <TextInput control={control}
                                    name="qty"
                                    label="Quantity"
                                    type={'number'}
                                />

                            </Grid>
                            <Grid sm={4} item>
                                <TextInput control={control}
                                    name="net_value"
                                    label="Net Value"
                                    isreadOnly={true}
                                />

                            </Grid>
                        </Grid>
                        <Grid container p={1} spacing={2} alignItems={'end'}>
                            <Grid sm={3} item>
                                <TextInput control={control}
                                    name="sgst"
                                    label="SGST"
                                    isreadOnly={true}
                                />

                            </Grid>
                            <Grid sm={3} item >
                                <SelectX
                                    options={fetchPercentage}
                                    control={control}
                                    name={'sgst-drop'}
                                    defaultValue={watch('sgst-drop')}

                                />
                            </Grid>
                            <Grid sm={3} item>
                                <TextInput control={control}
                                    name="cgst"
                                    label="CGST"
                                    isreadOnly={true}
                                />

                            </Grid>
                            <Grid sm={3} item >
                                <SelectX
                                    options={fetchPercentage}
                                    control={control}
                                    name={'cgst-drp'}

                                />
                            </Grid>


                        </Grid>
                        <Grid container p={1} spacing={2} alignItems={'end'}>
                            <Grid sm={3} item>
                                <TextInput control={control}
                                    name="igst"
                                    label="IGST"
                                    isreadOnly={true}
                                />

                            </Grid>
                            <Grid sm={3} item >
                                <SelectX
                                    options={fetchPercentage}
                                    control={control}
                                    name={'igst-drp'}

                                />
                            </Grid>
                            <Grid sm={3} item>
                                <TextInput control={control}
                                    name="vat"
                                    label="VAT"
                                    isreadOnly={true}
                                />

                            </Grid>
                            <Grid sm={3} item >
                                <SelectX
                                    options={fetchPercentage}
                                    control={control}
                                    name={'vat-drp'}

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

                    </Grid>
                </DialogContent>
                <DialogActions sx={{ justifyContent: 'space-between' }}>

                    <Box>
                        {TotalValue != NaN && <Typography>Total Amount : {TotalValue}</Typography>}

                    </Box>

                    <Box>


                        <Button onClick={handleClose} variant="outlined" color="error" >
                            Close
                        </Button>

                        {ID == null && (
                            <LoadingButton loading={formButtonStatus.loading} disabled={formButtonStatus.disabled}
                                variant="outlined" type="submit" sx={{ ml: 1 }}>{formButtonStatus.label}</LoadingButton>

                        )}
                    </Box>


                </DialogActions>
            </Dialog>
        </div >
    );
};

export default AddLIstItems;
