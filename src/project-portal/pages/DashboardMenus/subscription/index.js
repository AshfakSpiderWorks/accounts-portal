import PageHeader from "../../common/page-header";
import { useEffect, useState } from "react";
import Paper from '@mui/material/Paper';
import Box from '@mui/material/Box';
import { DataGrid, GridColDef, GridValueGetterParams } from '@mui/x-data-grid';
import { Backdrop, Button, Card, CircularProgress } from "@mui/material";
import CreateInventory from "./create";
import { Inventories } from "../../../../api/Endpoints/Inventory";
import { blue, red } from "@mui/material/colors";
import DetailView from "./DetailView";
import DeleteMoadal from "./deleteModal";
import CreateTaxAccounts from "./create";
import { TaxAccount } from "../../../../api/Endpoints/TaxAccount";
import CreateSubscriptions from "./create";
import { SubscriptionsApi } from "../../../../api/Endpoints/Subscriptions";
import moment from "moment";

const Subscriptions = () => {
  const [refresh, setRefresh] = useState(false)
  const [editId, setEditId] = useState()
  const [pageNumber, setPageNumber] = useState(0);
  const [list, setList] = useState([]);
  const [loading, setLoading] = useState(false);
  const [rowsDetails, setrowsDetails] = useState({})
  const [detailViewId, setDetailViewId] = useState(false)
  const [deleteId, setDeleteId] = useState(false)




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
    SubscriptionsApi.list({ page: Number(pageNumber) + 1 }).then((response) => {
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
      field: 'title', headerName: 'Title', width: 250,
      renderCell: (params) => (
        <p style={TitleB} onClick={() => DetailViewOpen(params.id)} >
          {params.row.title}
        </p>
        // <p  onClick={viewTabs}>{params.row.title}</p>
      ),
    },
    {
      field: 'amount', headerName: 'Amount', width: 150, renderCell: (params) => <>{params.row.amount} {params.row.currency?.name}</>
    },
    {
      field: 'start_date', headerName: 'Start Date', width: 150, renderCell: (params) => <>{moment(params.row.start_date).format('DD-MM-YYYY')}</>
    },
    {
      field: 'end_date', headerName: 'End Date', width: 150, renderCell: (params) => <>{moment(params.row.end_date).format('DD-MM-YYYY')}</>
    },
    {
      field: 'payment_cycle', headerName: 'Payment Cycle', width: 150, renderCell: (params) => <>{params.row.payment_cycle}</>
    },
    {
      field: 'edit', headerName: '', width: 200,
      renderCell: (params) => (
        <Button sx={EditBstyle} onClick={() => handleEdit(params.id)}>Edit</Button>
      )
    },
    {
      field: 'delete', headerName: '', width: 100, renderCell: (params) => <Button sx={Bstyle} onClick={() => deleteItem(params.id)} color="error">Delete</Button>
    },
  ];


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


  const DetailViewOpen = (id) => {
    setDetailViewId(id)
  }

  useEffect(() => {
    fetchList()
  }, [pageNumber])


  return (
    <>
      {
        detailViewId &&
        <DetailView id={detailViewId} handleClose={setDetailViewId} />
      }

      {
        deleteId &&
        <DeleteMoadal id={deleteId} handleOpen={setDeleteId} refresh={handleUpdate} statement={'Subscription'} />
      }

      <PageHeader title={'Subscriptions'} />

      <Card sx={{ p: 2, display: "flex", justifyContent: "end" }} variant="outlined">
        <CreateSubscriptions key={refresh} onNew={handleCreate} onUpdate={handleUpdate} editId={editId} setEditId={setEditId} />
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

  )
};

export default Subscriptions;
