import PageHeader from "../../common/page-header"
import CreateInvoices from "./create"
import { useEffect, useState } from "react"
import Paper from "@mui/material/Paper"
import Box from "@mui/material/Box"
import { DataGrid, GridColDef, GridValueGetterParams } from "@mui/x-data-grid"
import { Backdrop, Button, Card, CircularProgress } from "@mui/material"
import BasicTabs from "./TabMenu"
import EditIcon from "@mui/icons-material/Edit"
import DeleteIcon from "@mui/icons-material/Delete"
const Invoices = () => {
  const [refresh, setRefresh] = useState(false)
  const [editId, setEditId] = useState()
  const [pageNumber, setPageNumber] = useState(0)
  const [list, setList] = useState([])
  const [loading, setLoading] = useState(false)
  const [rowsDetails, setrowsDetails] = useState({})
  const [detailViewId, setDetailViewId] = useState(false)
  const [showDetailView, setshowDetailView] = useState(false)
  const handleCreate = () => {
    setEditId(0)
    setRefresh(Math.random)
  }

  const handleUpdate = () => {
    setPageNumber()
    setPageNumber(0)
  }

  const DetailViewOpen = (id) => {
    setDetailViewId(id)
    setshowDetailView(true)
  }
  const handleEdit = () => {
    setEditId(1)
  }
  const columns = [
    // { field: 'id', headerName: 'ID', width: 90 },
    {
      field: "title",
      headerName: "Title",
      width: 420,
      renderCell: (params) => (
        <p onClick={() => DetailViewOpen(params.id)}>{params.row.title}</p>
      ),
    },

    {
      field: "payment_profile",
      headerName: "Payment Profile",
      width: 150,
    },
    {
      field: "client",
      headerName: "Client",
      width: 100,
    },
    {
      field: "payment_date",
      headerName: "Payment Date",
      width: 150,
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
      width: 80,
      renderCell: (params) => (
        <Button ocolor="error">
          <DeleteIcon sx={{ color: "red", fontSize: 19 }} />
        </Button>
      ),
    },
  ]

  const rows = [
    {
      id: 1,
      title: "Invoice for Product Purchase",
      business_account: "Tony Jhon",
      client: "Test Client",
      payment_profile: "Test Profile",
      payment_date: "22-07-2023",
    },
  ]

  return (
    <>
      {showDetailView && (
        <BasicTabs setshowDetailView={setshowDetailView} ID={detailViewId} />
      )}
      <Card
        sx={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
        }}
        variant="outlined"
      >
        <PageHeader title={"Business Invoices"} />
        <CreateInvoices
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

export default Invoices
