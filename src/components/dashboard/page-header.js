import React, { useEffect, useState } from 'react';
import { Box, Divider, Grid, Tab, Tabs, Typography } from "@mui/material";
import * as React from 'react';

import { Users } from "../../api/Endpoints/Users";

const PageHeader = () => {

    const [userData, setUserData] = useState();

    const fetchUserData = () => {
        Users.me().then(response => {
            setUserData(response.data.data)
        })
    }

    useEffect(() => {
        fetchUserData();
    }, [])

    return (
        <Grid>
            {/* <Stack spacing={2} direction="row">
                <Button variant="text">Text</Button>
            </Stack> */}
            <Box>


                <Box
                    sx={{
                        alignItems: 'center',
                        display: 'flex'
                    }}
                >
                    <Typography
                        color="textPrimary"
                        variant="h5"
                    >
                        {userData?.name}'s WorkBoard
                    </Typography>


                </Box>
            </Box>

        </Grid>
    );
};

export default PageHeader;
