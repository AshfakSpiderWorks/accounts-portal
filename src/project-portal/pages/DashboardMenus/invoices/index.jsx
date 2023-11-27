import PageHeader from "../../common/page-header"
import CreateInvoices from "./create"
import { useEffect, useState } from "react"
import Paper from "@mui/material/Paper"
import Box from "@mui/material/Box"
import { DataGrid, GridColDef, GridValueGetterParams } from "@mui/x-data-grid"
import { Backdrop, Button, Card, CircularProgress } from "@mui/material"

const Invoices = () => {
  const [refresh, setRefresh] = useState(false)
  const [editId, setEditId] = useState()
  const [pageNumber, setPageNumber] = useState(0)
  const [list, setList] = useState([])
  const [loading, setLoading] = useState(false)
  const [rowsDetails, setrowsDetails] = useState({})

  const handleCreate = () => {
    setEditId(0)
    setRefresh(Math.random)
  }

  const handleUpdate = (details) => {
    handleCreate()
    setEditId(3)
    console.log(editId)
    setrowsDetails(details)
    console.log(details)
    setPageNumber()
    setPageNumber(0)
  }

  const columns = [
    // { field: 'id', headerName: 'ID', width: 90 },
    {
      field: "Name",
      headerName: "Name",
      width: 150,
      editable: true,
    },
    {
      field: "PaymentProfile",
      headerName: "Payment Profile",
      width: 150,
      editable: true,
    },
    {
      field: "Currency",
      headerName: "Currency",
      width: 150,
      editable: true,
    },
  ]

  const rows = [
    { id: 1, Name: "Snow", PaymentProfile: "Demo", Currency: "INR" },
    { id: 2, Name: "Lannister", PaymentProfile: "Demo", Currency: "INR" },
    { id: 3, Name: "Lannister", PaymentProfile: "Demo", Currency: "INR" },
  ]

  return (
    <>
      <PageHeader title={"Invoices"} />

      <Card
        sx={{ p: 2, display: "flex", justifyContent: "end" }}
        variant="outlined"
      >
        <CreateInvoices
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

export default Invoices
