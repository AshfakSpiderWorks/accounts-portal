import PageHeader from "../../common/page-header";
import { useEffect, useState } from "react";
import Paper from '@mui/material/Paper';
import Box from '@mui/material/Box';
import { DataGrid, GridColDef, GridValueGetterParams } from '@mui/x-data-grid';
import { Backdrop, Button, Card, CircularProgress } from "@mui/material";
import CreateCategory from "./create";
import { categories } from "../../../../api/Endpoints/Category";
import DeleteMoadal from "./deleteModal";
import DetailView from "./DetailView";
import { blue, red } from "@mui/material/colors";

const Category = () => {
  const [refresh, setRefresh] = useState(false)
  const [editId, setEditId] = useState()
  const [pageNumber, setPageNumber] = useState(0);
  const [list, setList] = useState([]);
  const [loading, setLoading] = useState(false);
  const [rowsDetails, setrowsDetails] = useState({})
  const [deleteId, setDeleteId] = useState(false)
  const [detailViewId, setDetailViewId] = useState(false)


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

  const handleEdit = (id) => {
    setRefresh(Math.random);
    setEditId(parseInt(id));
  }

  const DetailViewOpen =(id)=>{
    setDetailViewId(id)
  }

  const columns = [
    {
      field: 'name', headerName: 'Name', width: 250,
      renderCell: (params) => (
        <p style={TitleB} onClick={() => DetailViewOpen(params.id)} >
          {params.row.name}

        </p>
        // <p  onClick={viewTabs}>{params.row.title}</p>
      ),
    },
    {
      field: 'description', headerName: 'Description', width: 450, renderCell: (params) => <>{params.row.description}</>
    },
    {
      field: 'edit', headerName: '', width: 100,
      renderCell: (params) => (
        <Button sx={EditBstyle} onClick={() => handleEdit(params.id)}>Edit</Button>
      ),
    },
    {
      field: 'delete', headerName: '', width: 100, renderCell: (params) => <Button sx={Bstyle} onClick={() => deleteCategory(params.id)}>Delete</Button>
    },

  ];

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

  const fetchList = () => {
    setLoading(true)
    categories.list({ page: Number(pageNumber) + 1 }).then((response) => {
      console.log(response.data.data);
      setList(response.data.data)
      setLoading(false)
    })
  }

  const deleteCategory = (id) => {
    console.log(id);
    setDeleteId(id)
  }

  const TitleB = {
    color: 'blue',
    cursor: 'pointer',
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
        <DeleteMoadal id={deleteId} handleOpen={setDeleteId} refresh={handleUpdate} statement={'Category'} />
      }
      <PageHeader title={'Inventory Category'} />

      <Card sx={{ p: 2, display: "flex", justifyContent: "end" }} variant="outlined">
        <CreateCategory rowdetails={rowsDetails} key={refresh} onNew={handleCreate} onUpdate={handleUpdate} editId={editId} setEditId={setEditId} />
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

export default Category;
