import PageHeader from "../../common/page-header";
import { useEffect, useState } from "react";
import Paper from '@mui/material/Paper';
import Box from '@mui/material/Box';
import { DataGrid, GridColDef, GridValueGetterParams } from '@mui/x-data-grid';
import { Backdrop, Button, Card, CircularProgress } from "@mui/material";
import { blue, green, red } from "@mui/material/colors";
import DeleteMoadal from "./deleteModal";
import { TaxAccount } from "../../../../api/Endpoints/TaxAccount";
import Create from "./create";
import BasicTabs from "./TabMenus";
import PaymentModal from "./PaymentModal";
import { ReimbursementApi } from "../../../../api/Endpoints/Reimbursement";

const Reimbursement = () => {
    const [refresh, setRefresh] = useState(false)
    const [editId, setEditId] = useState()
    const [pageNumber, setPageNumber] = useState(0);
    const [list, setList] = useState([]);
    const [loading, setLoading] = useState(false);
    const [rowsDetails, setrowsDetails] = useState({})
    const [detailViewId, setDetailViewId] = useState(false)
    const [deleteId, setDeleteId] = useState(false)
    const [paymentId, setPaymentId] = useState(false)
    const [Tabs, setTabs] = useState(false)


    const payment = (id) => {
        setPaymentId(id)
    }

    const DetailView = (id) => {
        setTabs(id)
    }

    const handleCreate = () => {
        setEditId(0)
        setRefresh(Math.random)
    }

    const handlePageChange = (page) => {
        setPageNumber(page)
    }

    const handleUpdate = (details) => {
        // handleCreate()
        // setEditId()
        // console.log(editId);
        // setrowsDetails(details)
        // console.log(details);
        setPageNumber();
        setPageNumber(0);
    }

    const TitleB = {
        color: 'blue',
        cursor: 'pointer',
    }

    const fetchList = () => {
        setLoading(true)
        ReimbursementApi.list({ page: Number(pageNumber) + 1 }).then((response) => {
            console.log(response.data.data);
            setList(response.data.data)
            setLoading(false)
        })
    }

    const handleEdit = (id) => {
        setRefresh(Math.random);
        setEditId(parseInt(id));
    }

    const deleteItem = (id) => {
        console.log(id);
        setDeleteId(id)
    }

    const columns = [
        {
            field: 'title', headerName: 'Title', width: 350,
            renderCell: (params) => (
                <p style={TitleB} onClick={() => DetailView(params.id)} >
                    {params.row.title}

                </p>
                // <p  onClick={viewTabs}>{params.row.title}</p>
            ),
        },
        {
            field: 'status', headerName: 'Status', width: 150, renderCell: (params) => <>{params.row.status}</>
        },
        {
            field: 'amount', headerName: 'Amount', width: 150, renderCell: (params) => <>{params.row.amount}</>
        },
        {
            field: 'payment',
            headerName: '',
            width: 250,
            renderCell: (params) => (
                <>
                    <Button variant='contained' sx={paymentBstyle} onClick={() => payment(params.id)}>
                        Payment
                    </Button>
                </>
            )
        },
        // {
        //   field: 'category', headerName: 'Category', width: 250, renderCell: (params) => <>{params.row.category?.name}</>
        // },
        {
            field: 'edit', headerName: '', width: 100,
            renderCell: (params) => (
                <Button sx={EditBstyle} onClick={() => handleEdit(params.id)}>Edit</Button>
            )
        },
        {
            field: 'delete', headerName: '', width: 100, renderCell: (params) => <Button sx={Bstyle} onClick={() => deleteItem(params.id)} color="error">Delete</Button>
        },
    ];

    const paymentColor = green[400];
    const paymentBstyle = {
        bgcolor: paymentColor,
        height: '30px',
        color: 'white',
        marginLeft: 'auto',
        '&:hover': {
            color: 'black',
            backgroundColor: 'lightgreen',
        },
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
        fetchList()
    }, [pageNumber])


    return (
        <>

            {
                deleteId &&
                <DeleteMoadal id={deleteId} handleOpen={setDeleteId} refresh={handleUpdate} statement={'Data'} />
            }
            {
                paymentId &&
                <PaymentModal id={paymentId} handleOpen={setPaymentId} refresh={handleUpdate} />
            }
            <PageHeader title={'Reimbursement'} />

            {Tabs ? (<BasicTabs id={Tabs} setTabs={setTabs} />
            ) : (
                <>

                    <Card sx={{ p: 2, display: "flex", justifyContent: "end" }} variant="outlined">
                        <Create key={refresh} onNew={handleCreate} onUpdate={handleUpdate} editId={editId} setEditId={setEditId} />
                    </Card >

                    <Card sx={{ m: 2 }} variant="outlined">
                        <Backdrop
                            sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }}
                            open={loading}
                        >
                            <CircularProgress color="inherit" />
                        </Backdrop>
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
            )}

        </>

    )
};

export default Reimbursement;
