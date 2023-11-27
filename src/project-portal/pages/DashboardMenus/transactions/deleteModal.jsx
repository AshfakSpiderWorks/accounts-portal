import * as React from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import { useState } from 'react';
import { toast } from 'react-hot-toast';
import { Grid } from '@material-ui/core';
import { useEffect } from 'react';
import { blue, red } from '@material-ui/core/colors';
import { LoadingButton } from '@mui/lab';
import Category from '.';
import { categories } from '../../../../api/Endpoints/Category';
import { VendorsApi } from '../../../../api/Endpoints/Vendors';
import { Inventories } from '../../../../api/Endpoints/Inventory';
import { VendorPayments } from '../../../../api/Endpoints/VendorPayments';
import { TaxAccount } from '../../../../api/Endpoints/TaxAccount';
import { SubscriptionsApi } from '../../../../api/Endpoints/Subscriptions';
import { TransactionsApi } from '../../../../api/Endpoints/Transactions';


const style = {
    position: 'absolute',
    top: '25%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 450,
    bgcolor: 'background.paper',
    // border: '2px solid #000',
    borderRadius: '7px',
    boxShadow: 24,
    p: 4,

};

export default function DeleteMoadal(props) {
    const [open, setOpen] = React.useState(false);
    const handleOpen = () => setOpen(true);
    const handleClose = () => {
        props.handleOpen(false)
        setOpen(false);
    }
    const [alerts, setAlerts] = useState({
        type: '',
        message: '',
        active: false
    })

    const [formButtonStatus, setFormButtonStatus] = useState({
        label: "Delete",
        loading: false,
        disabled: false,
    });

    const removeDocument = () => {
        // setLoading(true)
        setFormButtonStatus({ ...formButtonStatus, loading: true });
        TransactionsApi.delete({ id: props.id }).then((response) => {
            console.log(response);
            setAlerts({ active: true, message: response.data.message, type: response.data.status })
            props.refresh()
            toast.success(response.data.message)
            handleClose()
            setTimeout(() => { setAlerts({}) }, 2000)
        }).catch(error => {
            console.log(error);
        })


    }

    const color = red[400];
    const Bstyle = {
        // bgcolor: color,
        // height: '30px',
        color: 'red',
        border: '1px solid',
        borderColor: 'black',
        '&:hover': {
            color: 'white',
            backgroundColor: color,
        },
    }

    const cancelColor = blue[800]
    const cancelB = {
        // bgcolor: cancelColor,
        // color: 'white',
        marginTop: 3,
        marginRight: 3,
        marginLeft: 'auto',
        border: '1px solid',
        borderColor: 'black',
        '&:hover': {
            color: 'black',
            backgroundColor: 'lightblue',
        },
    }


    useEffect(() => {
        if (props.id) {
            console.log(props.id);
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
                    <Grid>
                        <h2>Confirm Delete</h2>
                    </Grid>
                    <Grid>
                        <p>Are you sure you want to delete this {props.statement}?</p>
                    </Grid>
                    <Grid style={{ display: 'flex', alignItems: 'end' }}>

                        <Button sx={cancelB} onClick={handleClose}>
                            Cancel
                        </Button>
                        <LoadingButton loading={formButtonStatus.loading} disabled={formButtonStatus.disabled} sx={Bstyle} onClick={removeDocument}>
                            {formButtonStatus.label}
                        </LoadingButton>

                    </Grid>
                </Box>
            </Modal>
        </div>
    );
}