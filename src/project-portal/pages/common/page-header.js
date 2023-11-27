import React from 'react';
import { Box, Button, Grid, Typography } from "@mui/material";
import { RefreshOutlined } from "@mui/icons-material";

const PageHeader = (props) => {
    return (
        <Grid sx={{ mx: 2, my: 2 }}>

            <Box>
                <Box
                    sx={{
                        alignItems: 'center',
                        display: 'flex'
                    }}
                >
                    <Typography
                        color="textPrimary"
                        variant="h4"
                    >
                        {props.title}
                        {props.refresh &&
                            <Button onClick={() => props.onRefresh()}><RefreshOutlined /></Button>
                        }
                    </Typography>
                    <Box sx={{ flexGrow: 1 }} />

                </Box>
            </Box>
        </Grid>
    );
};

export default PageHeader;
