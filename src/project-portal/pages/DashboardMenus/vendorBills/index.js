import PageHeader from "../../common/page-header"
import CreateInvoices from "./create"
import { useEffect, useState } from "react"
import Paper from "@mui/material/Paper"
import Box from "@mui/material/Box"
import { DataGrid, GridColDef, GridValueGetterParams } from "@mui/x-data-grid"
import { Backdrop, Button, Card, CircularProgress } from "@mui/material"
import Create from "./create"
import BasicTabs from "./TabMenu"

const Index = () => {
    const [refresh, setRefresh] = useState(false)
    const [editId, setEditId] = useState()
    const [pageNumber, setPageNumber] = useState(0)
    const [detailViewId, setDetailViewId] = useState(false)
    const [loading, setLoading] = useState(false)
    const [showDetailView, setshowDetailView] = useState(false)

    const handleCreate = () => {
        setEditId(0)
        setRefresh(Math.random)
    }

    const handleUpdate = () => {
        setPageNumber()
        setPageNumber(0)
    }

    const handleEdit = () => {
        setEditId(1)
    }


    const DetailViewOpen = (id) => {
        setDetailViewId(id)
        setshowDetailView(true)
    }

    const columns = [
        // { field: 'id', headerName: 'ID', width: 90 },
        {
            field: 'title', headerName: 'Title', width: 280,
            renderCell: (params) => (
                <p onClick={() => DetailViewOpen(params.id)} >
                    {params.row.title}
                </p >

            ),
        },
        {
            field: "venodr_name",
            headerName: "Vendor Name",
            width: 260,
            headerClassName: 'custom-header',
        },
        {
            field: "bill_amount",
            headerName: "Bill Amount",
            width: 140,
            headerClassName: 'custom-header',
        },
        {
            field: "total_amount",
            headerName: "Total Amount",
            width: 130,
            headerClassName: 'custom-header',
        },
        {
            field: "total_amount",
            headerName: "Total Amount",
            width: 130,
            headerClassName: 'custom-header',
        },
        {
            field: 'Edit',
            headerName: '',
            width: 80,
            renderCell: (params) => (
                <>
                    <Button onClick={() => handleEdit(params.id)}>
                        Edit
                    </Button>
                </>
            )
        },
        {
            field: 'delete',
            headerName: '',
            width: 70,
            renderCell: (params) => (
                <>
                    <Button >
                        Delete
                    </Button>
                </>
            )
        },
    ]

    const rows = [
        { id: 1, title: "System Repair Cost", venodr_name: "Dronacharya Electronics Systems", bill_amount: 4000, total_amount: 4500 },

    ]

    return (
        <>
            {
                showDetailView && <BasicTabs setshowDetailView={setshowDetailView} ID={detailViewId} />
            }


            <PageHeader title={"Vendor Bills"} />

            <Card
                sx={{ p: 2, display: "flex", justifyContent: "end" }}
                variant="outlined"
            >
                <Create
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

export default Index
