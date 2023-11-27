import { Backdrop, Button, Card, CircularProgress, TextField } from "@mui/material";
import PageHeader from "../../common/page-header";
import Create from "./create"
import { useState } from "react";
import { Employee } from "../../../../api/Endpoints/Employee";
import { useEffect } from "react";
import { DataGrid } from "@mui/x-data-grid";
import moment from "moment";
import DetailTab from "./TabMenus";

const Employees = () => {

    const DetailView = (id) => {
        setSearchKeyword()
        setTabs(id)
    }

    const columns = [
        // { field: 'id', headerName: 'ID', width: 100 },
        {
            field: 'name', headerName: 'Name', width: 200, renderCell: (params) => (
                <>
                    <p style={TitleB} onClick={() => DetailView(params.row.employee_id)}>{params.value}</p>
                </>
            )
        },

        {
            field: 'email', headerName: 'Email', width: 250, renderCell: (params) => <>{params.value}</>
        },
        {
            field: 'role', headerName: 'Role', width: 250, renderCell: (params) => <>{params.value}</>
        },
        // { field: 'start_date', headerName: 'Start date', width: 200, renderCell: (params) => { return moment(params.value).format('MMM Mo dddd') } },



    ]

    const TitleB = {
        color: 'blue',
        cursor: 'pointer',
    }

    const [refresh, setRefresh] = useState(false)
    const [editId, setEditId] = useState()
    const [pageNumber, setPageNumber] = useState(0);
    const [list, setList] = useState([]);
    const [loading, setLoading] = useState(false);
    const [Tabs, setTabs] = useState(false)
    const [searchKeyword, setSearchKeyword] = useState();


    const handleCreate = () => {
        setEditId(0)
        setRefresh(Math.random)
    }
    const handleUpdate = () => {
        setPageNumber();
        setPageNumber(0);
    }

    const handlePageChange = (page) => {
        setPageNumber(page)
    }





    const handleSearchEntry = (event) => {
        setSearchKeyword(event.target.value);
    }


    const fetchTable = () => {
        setLoading(true);
        Employee.get({ keyword: searchKeyword, page: Number(pageNumber) + 1 }).then(response => {
            setList(response.data.data);
            console.log(response.data.data);
            setLoading(false);
        })
    }

    useEffect(() => {
        fetchTable();
    }, [pageNumber, searchKeyword, Tabs])


    return (
        <>

            <PageHeader title={"Employee master"} />
            {Tabs ? (<DetailTab id={Tabs} setTabs={setTabs} />
            ) : (
                <>
                    <Card sx={{ p: 2, display: "flex", justifyContent: "space-between" }} variant="outlined">
                        <TextField
                            sx={{}}
                            id="outlined-name"
                            autoFocus
                            label="Search Employee"
                            onChange={handleSearchEntry}
                        />

                        {/* <Create key={refresh} onNew={handleCreate} onUpdate={handleUpdate} editId={editId} setEditId={setEditId} /> */}

                    </Card >
                    <Card sx={{ m: 2 }} variant="outlined">
                        <Backdrop
                            sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }}
                            open={loading}
                        >
                            <CircularProgress color="inherit" />
                        </Backdrop>
                        {typeof list.data === "object" &&
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

export default Employees;
