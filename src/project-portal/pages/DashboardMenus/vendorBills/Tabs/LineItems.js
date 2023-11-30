
import React, { useState } from 'react';
import { DataGrid } from '@mui/x-data-grid';
import { Button, Divider } from '@mui/material';
import AddLIstItems from '../addLIstItems/popup';
import { MoreOptionsDropdown } from '../../../common/MoreAction';






const LineItems = ({ isInvoiceTab }) => {
    const [open, setOpen] = useState(false);
    const [editId, setEditId] = useState()

    const [ID, setID] = useState(null)
    const columns = [
        { field: 'title', headerName: 'Title', width: 270 },
        { field: 'billAmount', headerName: 'Bill Amount', width: 130 },
        { field: 'totalAmount', headerName: 'Total Amount', width: 100 },

        {
            field: "",
            width: 10,
            renderCell: (params) => <MoreOptionsDropdown params={params} setEditId={setEditId} setID={setID} addHandler={addHandler} />,
        },
    ];

    const dummyData = [
        { id: 1, title: 'Product 1', description: 'Description 1', quantity: 5, billAmount: 100, sgst: 5, cgst: 5, igst: 0, vat: 10, discount: 15, totalAmount: 120 },

        // Add more dummy data as needed
    ];
    const addHandler = () => {
        setOpen(true)
    }
    return (
        <div style={{ height: 330, width: '100%' }}>
            {open && <AddLIstItems setOpen={setOpen} open={open} ID={ID} setID={setID} invoicetab={isInvoiceTab} />}

            <DataGrid rows={dummyData} columns={columns} pageSize={5} />
            <Divider />
            <Button variant='outlined' onClick={addHandler} sx={{ mt: 3 }}>Add Line Item</Button >
        </div>

    );
};

export default LineItems;
