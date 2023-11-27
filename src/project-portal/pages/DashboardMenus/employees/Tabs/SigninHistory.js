import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import {
    Button,
    Dialog,
    DialogActions,
    DialogContent,
    DialogContentText,
    Card,
    CardContent,
    Typography,
    Grid,
    Divider,
    Select,
    MenuItem,
    DialogTitle,
    InputLabel,
    TextareaAutosize,
    TextField,
    Slide,
    Backdrop,
    CircularProgress,
} from "@mui/material";
import { useEffect } from 'react';
import { useState } from 'react';
import { DataGrid } from '@mui/x-data-grid';
import { blue } from '@mui/material/colors';
const useStyles = makeStyles((theme) => ({
    card: {
        margin: theme.spacing(2),
        padding: theme.spacing(2),
        boxShadow: '1px 2px 2px 2px rgba(0, 0, 0, 0.3)',
    },
    title: {
        fontWeight: 'bold',
    },
    divider: {
        margin: theme.spacing(2, 0),
    },
    select: {
        minWidth: 200,
    },
}));

const SigninHistory = (props) => {
    const classes = useStyles();
    const [details, setDetails] = useState({})
    const [editId, setEditId] = useState();
    const [list, setList] = useState([]);
    const [listType, setListType] = useState();
    const [searchKeyword, setSearchKeyword] = useState();
    const [pageNumber, setPageNumber] = useState(0);
    const [selectedPreQualifierId, setSelectedPreQualifierId] = useState();
    const [refresh, setRefresh] = useState(0);
    const [openEditModal, setOpenEditModal] = useState(false)
    const [loading, setLoading] = useState(false);
    const [editedid, setEditedID] = useState(null)

    const handleListingSearchChange = (keyword) => { setSearchKeyword(keyword); setPageNumber(0); }
    const handlePageChange = (page) => {
        // fetchTable()
        setPageNumber(page)
    }
    const handleUpdate = () => {
        setPageNumber();
        setPageNumber(0);
        console.log('test');
    }

    const handleCreate = () => {
        setEditId(0);
        setRefresh(Math.random)
    }

    const handleSearchEntry = (event) => {
        setSearchKeyword(event.target.value);
    }

    // const fetchList = () => {
    //     setLoading(true)
    //     let projectId = localStorage.getItem('project_id')
    //     WorkOrders.list({ keyword: searchKeyword, page: Number(pageNumber) + 1, work_request_id: props.id }).then((response) => {
    //         console.log(response.data.data);
    //         setList(response.data.data)
    //         setLoading(false)
    //     })
    // }


    const TitleB = {
        color: 'blue',
        cursor: 'pointer',
    }

    const columns = [
        {
            field: 'name', headerName: 'Name', flex: 0.1, renderCell: (params) => (
                <p style={TitleB} >{params.row.title}</p>
            ),
        },
        {
            field: 'email', headerName: 'Email', flex: 0.1, renderCell: (params) => <>{params.row.description}</>
        },
        {
            field: 'signin', headerName: 'Sign In', flex: 0.1, renderCell: (params) => <>{params.row.priority}</>
        },
        {
            field: 'signout', headerName: 'Sign Out', flex: 0.1, renderCell: (params) => <>{params.row.status}</>
        },
        // {
        //     field: 'requestDate', headerName: 'Request Date', flex: 0.1, renderCell: (params) => <>
        //         {params.row.start_date.slice(8, 10)}-{params.row.start_date.slice(5, 7)}-{params.row.start_date.slice(0, 4)}
        //     </>
        // },
        // {
        //     field: 'dueDate', headerName: 'Due Date', flex: 0.1, renderCell: (params) => <>
        //         {params.row.expected_completion_date.slice(8, 10)}-{params.row.expected_completion_date.slice(5, 7)}-{params.row.expected_completion_date.slice(0, 4)}
        //     </>
        // },
        // {
        //     field: 'edit', headerName: '', width: 200,
        //     renderCell: (params) => (
        //         <Button sx={Bstyle} onClick={() => handleEdit(params)}>Edit</Button>
        //     ),
        // }


    ];

    const color = blue[400];
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



    useEffect(() => {
        console.log(props.id);
        // fetchList()
    }, [searchKeyword, listType, pageNumber])

    return (
        // <Card className={classes.card}>

        //     <Backdrop
        //         sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }}
        //         open={loading}
        //     >
        //         <CircularProgress color="inherit" />
        //     </Backdrop>


        // </Card>
        <>

            <Card sx={{}} variant="outlined" >
                <Backdrop
                    sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }}
                    open={loading}
                >
                    <CircularProgress color="inherit" />
                </Backdrop>
                {
                    list &&
                    <DataGrid
                        autoHeight={true}
                        paginationMode="server"
                        rows={list?.data}
                        columns={columns}
                        page={pageNumber}
                        pageSize={10}
                        rowsPerPageOptions={[10]}
                        onPageChange={handlePageChange}
                        // checkboxSelection
                        density={'compact'}
                        rowCount={list.total}
                        showCellVerticalBorder
                        showColumnVerticalBorder
                    />
                }
            </Card >
        </>

    );
};

export default SigninHistory;
