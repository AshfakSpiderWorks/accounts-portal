import { IconButton, Menu, MenuItem } from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import InfoIcon from '@mui/icons-material/Info';
import { useState } from 'react';
import DataUsageIcon from '@mui/icons-material/DataUsage';
export const MoreOptionsDropdown = ({ params,
    setEditId,
    setID,
    setDeletePopup,
    setOpen,
    setTaskPopup,
    setAssignID,
    showchageStatus,
    addHandler,
    hide,
    showTaskIcon }) => {
    const [anchorEl, setAnchorEl] = useState(null);

    // console.log(setID);

    const handleClick = (event) => {
        setAnchorEl(event.currentTarget);
    };

    const handleClose = () => {
        setAnchorEl(null);

    };


    const handleEdit = (id) => {
        addHandler()

        setOpen && setOpen(true)

        {
            setEditId &&
                setEditId(parseInt(id));
        }


        handleClose()
    }


    const AssingTask = (value) => {
        setAssignID(value.row?.assign_to)
        setID(value.id)
        setTaskPopup(true)
    }
    const viewHanlder = () => {
        setID(1)
        handleClose()
        addHandler && addHandler()

    }

    const ChangeStatus = (value) => {
        {
            setOpen && setOpen(true)
        }
        handleClose();
    }

    const handleDelete = (id) => {
        setID(id)
        setDeletePopup(true)
        handleClose();
    };

    return (
        <>
            <IconButton size="small" onClick={handleClick}>
                <MoreVertIcon />
            </IconButton>
            <Menu anchorEl={anchorEl} open={Boolean(anchorEl)} onClose={handleClose}>
                {/* {
                    showTaskIcon && <MenuItem onClick={() => AssingTask(params)}>
                        <AddTaskIcon sx={{ fontSize: 14, mr: 1., color: 'black' }} />
                        Assign Task
                    </MenuItem>} */}

                {showchageStatus &&
                    <MenuItem onClick={() => ChangeStatus(params)}>
                        <DataUsageIcon sx={{ fontSize: 14, mr: 1., color: 'black' }} />
                        Status
                    </MenuItem>
                }
                <MenuItem onClick={() => viewHanlder(params.id)}>
                    <InfoIcon sx={{ fontSize: 14, mr: 1., color: 'blue' }} />
                    Details
                </MenuItem>
                {!hide &&
                    <>

                        <MenuItem MenuItem onClick={() => handleEdit(params.id)}>
                            <EditIcon sx={{ fontSize: 14, mr: 1, color: "blue" }} />
                            Edit
                        </MenuItem>
                        <MenuItem MenuItem onClick={handleClose}>
                            <DeleteIcon sx={{ fontSize: 14, mr: 1, color: "red" }} />
                            Delete
                        </MenuItem>
                    </>

                }


            </Menu >
        </>
    );
};
