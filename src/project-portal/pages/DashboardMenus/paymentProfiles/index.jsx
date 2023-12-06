import PageHeader from "../../common/page-header"
import CreatePaymentProfiles from "./create"
import { useEffect, useState } from "react"
import Paper from "@mui/material/Paper"
import Box from "@mui/material/Box"
import { DataGrid, GridColDef, GridValueGetterParams } from "@mui/x-data-grid"
import { Backdrop, Button, Card, CircularProgress } from "@mui/material"
import EditIcon from "@mui/icons-material/Edit"
import DeleteIcon from "@mui/icons-material/Delete"
import DetailView from "./DetailView"
const Paymentprofiles = () => {
  const [refresh, setRefresh] = useState(false)
  const [editId, setEditId] = useState()
  const [pageNumber, setPageNumber] = useState(0)
  const [list, setList] = useState([])
  const [loading, setLoading] = useState(false)
  const [rowsDetails, setrowsDetails] = useState({})
  const [deleteId, setDeleteId] = useState(false)
  const [detailViewId, setDetailViewId] = useState(false)
  const handleCreate = () => {
    setEditId(0)
    setRefresh(Math.random)
  }

  const handleUpdate = (details) => {
    setPageNumber()
    setPageNumber(0)
  }
  const DetailViewOpen = (id) => {
    setDetailViewId(id)
  }
  const columns = [
    {
      field: "title",
      headerName: "Title",
      width: 270,
      editable: true,
      renderCell: (params) => (
        <p onClick={() => DetailViewOpen(params.id)}>{params.row.title}</p>
      ),
    },
    {
      field: "profile_type",
      headerName: "Profie Type",
      width: 130,
      editable: true,
    },
    {
      field: "profile",
      headerName: "Profile",
      width: 150,
      editable: true,
    },
    {
      field: "account_contact_name",
      headerName: "Account Name",
      width: 150,
      editable: true,
    },
    {
      field: "account_contact_phone",
      headerName: "Account Phone",
      width: 150,
      editable: true,
    },
    {
      field: "edit",
      headerName: "",
      width: 50,
      renderCell: (params) => (
        <Button onClick={() => handleEdit(params.id)}>
          <EditIcon sx={{ fontSize: 19 }} />
        </Button>
      ),
    },
    {
      field: "delete",
      headerName: "",
      width: 50,
      renderCell: (params) => (
        <Button onClick={() => deleteItem(params.id)} color="error">
          <DeleteIcon sx={{ color: "red", fontSize: 19 }} />
        </Button>
      ),
    },
  ]

  const rows = [
    {
      id: 1,
      title: "Xyz limited",
      profile_type: "Cleint",
      profile: "PH Metals",
      account_contact_name: "Test",
      account_contact_phone: 1245,
    },
  ]

  const handleEdit = (id) => {
    setRefresh(Math.random)
    setEditId(parseInt(id))
  }

  const deleteItem = (id) => {
    setDeleteId(id)
  }

  return (
    <>
      {detailViewId && (
        <DetailView id={detailViewId} handleClose={setDetailViewId} />
      )}

      <Card
        sx={{
          p: 0,
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
        }}
        variant="outlined"
      >
        <PageHeader title={"Payment Profiles"} />
        <CreatePaymentProfiles
          rowdetails={rowsDetails}
          key={refresh}
          onNew={handleCreate}
          onUpdate={handleUpdate}
          editId={editId}
          setEditId={setEditId}
        />
      </Card>

      <Card sx={{ m: 2 }} variant="outlined">
        <Backdrop
          sx={{ color: "#fff", zIndex: (theme) => theme.zIndex.drawer + 1 }}
          open={loading}
        >
          <CircularProgress color="inherit" />
        </Backdrop>
        <Box sx={{ height: 400, width: "100%" }}>
          <DataGrid
            onCellClick={handleUpdate}
            paginationMode="server"
            rows={rows}
            columns={columns}
            page={pageNumber}
            pageSize={10}
            rowHeight={20}
            rowsPerPageOptions={[10]}
            rowCount={rows.total}
            // onPageChange={handlePageChange}
            autoHeight
            density={"comfortable"}
          />
        </Box>
      </Card>
    </>
  )
}

export default Paymentprofiles
