
import React, { useState } from 'react';
import { DataGrid } from '@mui/x-data-grid';
import { Button, Divider, Grid, IconButton, Tooltip, Typography } from '@mui/material';
import { MoreOptionsDropdown } from '../../../common/MoreAction';
import ReactSelect from 'react-select';
import { useForm } from 'react-hook-form';
import SelectX from '../../../../form/SelectX';
import TextInput from '../../../../form/TextInput';
import CheckCircleOutlineIcon from '@mui/icons-material/CheckCircleOutline';
import SearchIcon from '@mui/icons-material/Search';
import SearchTransactionPopup from '../searchTransactions/popup';
import DetailView from '../../transactions/DetailView';




const Transactions = () => {
    const [open, setOpen] = useState(false);
    const [editId, setEditId] = useState()
    const { register, handleSubmit, watch, formState: { errors }, control, setValue, getValues, reset } = useForm();
    const [ID, setID] = useState(null)

    const [detailViewId, setDetailViewId] = useState()
    const columns = [
        { field: 'transaction', headerName: 'Transaction', width: 270 },
        { field: 'billamount', headerName: 'Bill Amount', width: 130 },
        { field: 'amount', headerName: 'Total Amount', width: 100 },
        // { field: 'description', headerName: 'Description', width: 200 },
        {
            field: "",
            width: 10,
            renderCell: (params) => <MoreOptionsDropdown params={params} setEditId={setEditId} setID={setDetailViewId} hide={true} />,
        },
    ];
    const dummyData = [
        { id: 1, transaction: 'Electronic Gadgets Repair', amount: 1200, billamount: 1000 },

        // Add more dummy data as needed
    ];
    const SearchHandler = () => {
        setOpen(true)
    }
    const fetchTransactions = (e) => {
        return new Promise((resolve) => {
            setTimeout(() => {
                const data = [
                    { id: 0, name: "Transaction 1" },
                    { id: 1, name: "Transaction 2" },
                ];
                resolve(data);
            }, 1000);
        });
    };

    return (
        <div style={{ height: 250, width: '100%' }}>
            {open && <SearchTransactionPopup setOpen={setOpen} open={open} />}

            {
                detailViewId &&
                <DetailView id={detailViewId} handleClose={setDetailViewId} />
            }
            <DataGrid rows={dummyData} columns={columns} pageSize={5} />
            <Divider />
            <Typography m={2} > Add New</Typography >
            <Grid container padding={1} alignItems={'end'} mt={2} justifyContent={'space-around'}>

                <Grid item sm={6} >
                    <SelectX
                        label={"Select Transaction"}
                        options={fetchTransactions}
                        control={control}
                        name={'transaction'}
                        defaultValue={watch('transaction')}
                    />
                </Grid>
                <Grid item xs={1} sx={{ cursor: 'pointer' }} onClick={SearchHandler}>
                    <IconButton aria-label="delete" disabled color="primary"
                    >
                        <SearchIcon sx={{ color: 'black' }} />
                    </IconButton>
                </Grid>
                <Grid item xs={3}>
                    <TextInput
                        label="Amount"
                        name='amount'
                        control={control} />
                </Grid>
                <Tooltip title="save" arrow  >
                    <Grid item xs={1} sx={{ cursor: 'pointer' }}>
                        <IconButton aria-label="delete" disabled color="primary" >
                            <CheckCircleOutlineIcon sx={{ color: 'green' }} />
                        </IconButton>

                    </Grid>
                </Tooltip>
            </Grid>
        </div >

    );
};

export default Transactions;
