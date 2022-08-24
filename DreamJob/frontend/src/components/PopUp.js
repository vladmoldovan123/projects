import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import * as React from "react";


function PopUp(props){



    return(
        <Grid container alignItems="center" justifyContent="center" sx={{
        }}>
            <Box sx={
                (theme)=>({
                    padding: theme.spacing(3),
                    margin:0,
                    border: 10,
                    bgcolor:'rgba(239,237,237,1)',
                    borderColor: '#268991',

                })}>
                <Typography variant="h6" component="div" gutterBottom align='center' color="#268991" fontSize='2rem' >
                    {props.title}
                </Typography>
                <Typography variant="h6" component="div" gutterBottom color="#268991" fontSize='1.5rem' >
                    {props.message}
                </Typography>
            </Box>
        </Grid>
    )
}

export default PopUp;