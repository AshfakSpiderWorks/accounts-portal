import React, { useEffect, useState } from 'react';
import { useAppSettings } from "../../../../hooks/use-app-settings";
import Create from './create';
import moment from "moment";
import { Backdrop, Button, Card, CircularProgress, List, TextField } from "@mui/material";
import { PreQualifiers } from "../../../../api/Endpoints/PreQualifiers";
import { DataGrid } from "@mui/x-data-grid";
import PageHeader from "../../common/page-header";
import { VendorPayments } from '../../../../api/Endpoints/VendorPayments';
import BasicTabs from './TabMenus';
import { blue, red } from '@mui/material/colors';
import DetailView from './DetailView';
import DeleteMoadal from './deleteModal';

function VendorPayment() {


    const [accounts, setAccounts] = useState([]);
    const [searchKeyword, setSearchKeyword] = useState();
    const [pageNumber, setPageNumber] = useState(0);
    const [selectedPreQualifierId, setSelectedPreQualifierId] = useState();
    const [refresh, setRefresh] = useState(0)
    const [loading, setLoading] = useState(false);
    const [editId, setEditId] = useState();
    const [Tabs, setTabs] = useState(false)
    const [list, setList] = useState([])
    const [detailViewId, setDetailViewId] = useState(false)
    const [deleteId, setDeleteId] = useState(false)

    const handleListingSearchChange = (keyword) => { setSearchKeyword(keyword); setPageNumber(0); }
    const handlePageChange = (page) => {
        setPageNumber(page)
    }

    // const handleLeadClick = (leadId) => { props.onPreQualifierIdChange(leadId); setSelectedPreQualifierId(leadId); }


    const handleEdit = (id) => {
        console.log("thsi si edit", id);
        setRefresh(Math.random);
        setEditId(parseInt(id));
    }


    const handleCreateNew = () => {

    }


    const handleUpdate = () => {
        setPageNumber();
        setPageNumber(0);
    }

    const viewTabs = () => {
        setTabs(true)
    }

    const handleCreate = () => {
        setEditId(0)
        setRefresh(Math.random)
    }

    // ...

    const fetchTable = () => {
        setLoading(true);
        VendorPayments.get({ keyword: searchKeyword }).then(response => {
            console.log(response.data.data);
            setList(response.data.data)
            setLoading(false)
        }).catch(error => {
            console.log("Error fetching table data:", error);
            setLoading(false);
        });
    };

    const DetailViewOpen = (id) => {
        setDetailViewId(id)
    }

    const deleteItem = (id) => {
        console.log(id);
        setDeleteId(id)
    }


    const columns = [
        {
            field: 'name', headerName: 'Name', width: 350,
            renderCell: (params) => (
                <p style={TitleB} onClick={() => DetailViewOpen(params.id)} >
                    {params.row.title}

                </p>
                // <p  onClick={viewTabs}>{params.row.title}</p>
            )
        },
        {
            field: 'vendor',
            headerName: 'Vendor',
            width: 250,
            renderCell: (params) => {
                return <>{params.value?.name}</>;
            }
        },

        // {
        //     field: 'report_to',
        //     headerName: 'Manager Name',
        //     width: 200,
        //     renderCell: (params) => {
        //         return <span>{params.value?.name}</span>;
        //     }
        // },
        { field: 'status', headerName: "Status", width: 400 },
        {
            field: 'Edit',
            headerName: '',
            width: 100,
            renderCell: (params) => (
                <>
                    <Button variant='contained' onClick={() => handleEdit(params.id)}>
                        Edit
                    </Button>
                </>
            )
        },
        {
            field: 'delete', headerName: '', width: 100, renderCell: (params) => <Button sx={Bstyle} onClick={() => deleteItem(params.id)} color="error">Delete</Button>
        },
    ];

    const TitleB = {
        color: 'blue',
        cursor: 'pointer',
    }

    const color = red[400];
    const Bstyle = {
        bgcolor: color,
        height: '30px',
        color: 'white',
        marginLeft: 'auto',
        '&:hover': {
            color: 'black',
            backgroundColor: 'lightblue',
        },
    }

    const editColor = blue[400];
    const EditBstyle = {
        bgcolor: editColor,
        height: '30px',
        color: 'white',
        marginLeft: 'auto',
        '&:hover': {
            color: 'black',
            backgroundColor: 'lightblue',
        },
    }

    useEffect(() => {
        fetchTable();
    }, [searchKeyword, pageNumber])


    return (




        <>
            {
                detailViewId &&
                <DetailView id={detailViewId} handleClose={setDetailViewId} />
            }

            {
                deleteId &&
                <DeleteMoadal id={deleteId} handleOpen={setDeleteId} refresh={handleUpdate} statement={'Vendor Payment'} />
            }

            <>
                {loading ? <Backdrop
                    sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }}
                    open={loading}
                >
                    <CircularProgress color="inherit" />
                </Backdrop> : null}

                <PageHeader title={'Vendors Payments'} onCreateNew={handleCreateNew} />

                <Card sx={{ m: 2, p: 2, display: 'flex', justifyContent: 'end' }} variant="outlined" >

                    <Create key={refresh} onNew={handleCreate} onUpdate={handleUpdate} editId={editId} setEditId={setEditId} />

                </Card>

                <Card sx={{ m: 2 }} variant="outlined">
                    {list &&
                        <DataGrid
                            paginationMode="server"
                            rows={list?.data}
                            columns={columns}
                            page={pageNumber}
                            pageSize={10}
                            rowHeight={30}
                            rowCount={list?.total}
                            rowsPerPageOptions={[10]}
                            onPageChange={handlePageChange}
                            autoHeight
                            density={"comfortable"}
                        />
                    }
                </Card>

            </>


        </>
    )
}



export default VendorPayment


