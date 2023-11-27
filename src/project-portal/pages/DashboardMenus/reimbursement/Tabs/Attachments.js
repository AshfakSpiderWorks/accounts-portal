import React, { useState, useEffect } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import DeleteIcon from '@material-ui/icons/Delete';
import CloudUploadIcon from '@material-ui/icons/CloudUpload';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import moment from "moment";

import {
    Backdrop,
    Button,
    Card,
    CircularProgress,
    Divider,
    List,
    Box,
    Modal,
    IconButton,
    ListItemIcon,
    ListItem,
    ListItemText,
    TextField,
    Typography
} from "@mui/material";

const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: '40%',
    maxHeight: '80vh',
    borderRadius: '8px',
    bgcolor: 'background.paper',
    boxShadow: 24,
    p: 4,
};



function Attachments() {

    const [user, setUser] = useState({ name: '', email: '' });
    const [loading, setLoading] = useState(false);
    const [selectedFiles, setSelectedFiles] = useState([]);
    const [textValue, setTextValue] = useState('');
    const [open, setOpen] = useState(false);


    const handleOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

    const handleFileChange = (event) => {
        setSelectedFiles([event.target.files[0]]);
    };
    console.log(selectedFiles);
    const handleTextChange = (event) => {
        setTextValue(event.target.value);
    };

    const handleRemoveFile = (file) => {
        setSelectedFiles((prevFiles) => prevFiles.filter((prevFile) => prevFile !== file));
    };






    const handleSubmit = (event) => {
        event.preventDefault();

        handleClose();
    };


    return (

        <div>
            {loading ? (
                <Backdrop open={true}
                >
                    <CircularProgress color="inherit" />
                </Backdrop>
            ) : (
                (
                    <>

                        <div className='flex' style={{ width: '100', display: 'flex', justifyContent: "end", marginRight: 10 }}>


                            < Button variant="contained" sx={{ width: "180px", }}
                                onClick={handleOpen}  >Add Attachment</Button >
                            <Modal
                                open={open}
                                onClose={handleClose}
                                aria-labelledby="modal-modal-title"
                                aria-describedby="modal-modal-description"
                            >
                                <Box sx={style}>
                                    <Typography id="modal-modal-title" variant="h4" component="h2" sx={{ textAlign: "center", pb: 5 }}>
                                        Attach Document
                                    </Typography>
                                    <form onSubmit={handleSubmit}>
                                        <input
                                            type="file"
                                            id="file-upload"
                                            style={{ display: 'none' }}
                                            onChange={handleFileChange}
                                        />

                                        <TextField
                                            id="text-input"
                                            label="Document Title"
                                            variant="outlined"
                                            value={textValue}
                                            onChange={handleTextChange}
                                            fullWidth
                                            autoFocus
                                            required
                                            margin="normal"
                                            sx={{ mt: 2 }}
                                        />
                                        <label htmlFor="file-upload">
                                            <Button
                                                variant="contained"
                                                startIcon={<CloudUploadIcon />}
                                                component="span"
                                                sx={{
                                                    mt: 2,

                                                }}
                                            >
                                                Choose File
                                            </Button>

                                        </label>
                                        <List sx={{ mt: 2, maxHeight: 200, overflowY: 'auto' }}>
                                            {selectedFiles &&
                                                selectedFiles.map((file) => (
                                                    <ListItem key={file.name}>
                                                        <ListItemIcon>
                                                            <CloudUploadIcon />
                                                        </ListItemIcon>
                                                        <ListItemText primary={file.name} />
                                                        <IconButton
                                                            startIcon={<CloudUploadIcon />}
                                                            edge="end"
                                                            onClick={() => handleRemoveFile(file)}
                                                        >
                                                            <DeleteIcon />
                                                        </IconButton>
                                                    </ListItem>
                                                ))}
                                        </List>
                                        <div style={{ display: "flex", justifyContent: "end" }}>
                                            <Button
                                                variant="contained"
                                                type="submit"
                                                sx={{
                                                    mt: 2, mr: 2,
                                                    background: "gray",
                                                    '&:hover': {
                                                        backgroundColor: 'gray',
                                                    },
                                                }}
                                                onClick={handleClose}
                                            >
                                                Cancel
                                            </Button>

                                            <Button variant="contained" type="submit" sx={{ mt: 2 }}>
                                                Submit
                                            </Button>

                                        </div>
                                    </form>

                                </Box>
                            </Modal>

                        </div >
                        <Card sx={{ mt: 5 }} variant="outlined">
                            <TableContainer component={Paper}>
                                <Table sx={{ minWidth: 650 }} size="small" aria-label="a dense table">
                                    <TableHead>
                                        <TableRow>
                                            <TableCell>NO</TableCell>
                                            <TableCell>Title</TableCell>
                                            <TableCell>File Name</TableCell>
                                            <TableCell>Status</TableCell>
                                            <TableCell>File Size</TableCell>
                                            <TableCell> </TableCell>
                                        </TableRow>
                                    </TableHead>
                                    <TableBody>

                                        <TableRow

                                            sx={{ '&:last-child td, &:last-child th': { border: 0 }, marginTop: 5 }}
                                        >
                                            <TableCell>1</TableCell>
                                            <TableCell>Screenshot(1).jpg </TableCell>
                                            <TableCell>Travelling Bill</TableCell>
                                            <TableCell>New</TableCell>
                                            <TableCell>1.26 MB</TableCell>
                                            <TableCell>delete</TableCell>
                                        </TableRow>
                                    </TableBody>
                                </Table>
                            </TableContainer>

                        </Card>

                    </>
                )

            )
            }
        </div >

    );
}

export default Attachments;
