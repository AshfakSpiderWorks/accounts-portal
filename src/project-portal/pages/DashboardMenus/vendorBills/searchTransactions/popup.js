import React, { useState } from 'react';
import { Box, Button, Checkbox, Dialog, DialogActions, DialogContent, DialogTitle, FormControlLabel, Grid, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Typography } from '@mui/material';
import TextInput from '../../../../form/TextInput';
import { useForm } from 'react-hook-form';
import { LoadingButton } from '@mui/lab';
import { Paymentchannels } from '../../../../../api/Endpoints/PaymentChannels';
import SelectX from '../../../../form/SelectX';
import DateInput from '../../../../form/DateInput';

const SearchTransactionPopup = ({ setOpen, ID, open }) => {

    const { register, handleSubmit, watch, formState: { errors }, control, setValue, getValues, reset } = useForm();

    const [formButtonStatus, setFormButtonStatus] = useState({
        label: "Search",
        loading: false,
        disabled: false,
    });
    const handleClose = () => {
        setOpen(false);
    };


    const fetchPaymentChannels = (e) => {
        return Paymentchannels.list({ keyword: e }).then(response => {
            if (typeof response.data.status !== "undefined") {
                return response.data.data.data;
            } else {
                return [];
            }
        })
    }
    return (
        <div>

            <Dialog open={open} onClose={handleClose} fullWidth maxWidth="sm">
                <DialogContent>
                    <Grid container padding={1}>
                        <Grid container p={1} spacing={2} >
                            <Grid sm={6} item>
                                <TextInput control={control}
                                    name="transid"
                                    label="Transaction ID"
                                />
                            </Grid>
                            <Grid sm={6} item>
                                <TextInput control={control}
                                    name="reference"
                                    label="Reference"
                                />

                            </Grid>

                        </Grid>

                        <Grid item sm={8} padding={1}>
                            <SelectX
                                label={"Payment Channels"}
                                options={fetchPaymentChannels}
                                control={control}
                                name={'payment_channels'}
                                defaultValue={watch('payment_channels')}
                            />
                        </Grid>

                        <Grid container p={1} spacing={2} alignItems={'end'} padding={1}>
                            <Grid sm={5} item>
                                <TextInput
                                    control={control}
                                    name="from_amount"
                                    placeholder="From"
                                    label="Amount"
                                    type="number"
                                />
                                <Box mt={1}>
                                    <TextInput
                                        control={control}
                                        name="to_amount"
                                        placeholder="To"
                                        type="number"
                                    />
                                </Box>


                            </Grid>
                            <Grid sm={5} item>
                                <DateInput
                                    control={control}
                                    name="from_date"
                                    label="Transaction Date"
                                    placeholder="From"
                                    value={watch('from_date')}
                                />
                                <Box mt={1}>
                                    <DateInput
                                        control={control}
                                        name="to_date"
                                        placeholder="To"
                                        value={watch('to_date')}
                                    />
                                </Box>


                            </Grid>

                            <Grid sm={2} item>
                                <Button variant='outlined' color='warning'>Search</Button>
                            </Grid>
                        </Grid>
                        <Typography>Transactions : </Typography>
                        <Grid item xs={12} sx={{ width: '100%', height: '150px', border: '1px solid #ccc', borderRadius: '8px' }}>
                            <Grid padding={1}>

                                <Grid display={'flex'} mt={1} >
                                    <TableContainer component={Paper} sx={{ padding: 1 }}>
                                        <Table>
                                            <TableBody>
                                                <TableRow>
                                                    <TableCell>
                                                        <FormControlLabel control={<Checkbox />} label="Test Transaction 3" />
                                                    </TableCell>
                                                    <TableCell>10-2-2023</TableCell>
                                                    <TableCell>25000₹</TableCell>
                                                </TableRow>
                                                <TableRow>
                                                    <TableCell>
                                                        <FormControlLabel control={<Checkbox />} label="Test Transaction 3" />
                                                    </TableCell>
                                                    <TableCell>11-4-2023</TableCell>
                                                    <TableCell>30000₹</TableCell>
                                                </TableRow>
                                                {/* Add more rows as needed */}
                                            </TableBody>
                                        </Table>
                                    </TableContainer>
                                </Grid>
                            </Grid>
                        </Grid>

                    </Grid>
                </DialogContent>
                <DialogActions sx={{ justifyContent: 'end' }}>


                    <Box>

                        <Button onClick={handleClose} variant="outlined" color="error" sx={{ mr: 2 }}>
                            Close
                        </Button>

                        <Button onClick={handleClose} variant="outlined" color="primary" >
                            Save
                        </Button>


                    </Box>


                </DialogActions>
            </Dialog>
        </div >
    );
};

export default SearchTransactionPopup;
