import Grid from "@mui/material/Grid";
import AddTestForm from "../components/AddTestForm";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import React from "react";


const windowHeight = window.innerHeight - 69;

function AddTestView(){


    return(
        <Grid container sx={{paddingTop: '3%',bgcolor:'#78adb4', minHeight: windowHeight}} justifyContent="center" >
            <Box
                sx={
                    (theme)=>({
                        width:'50%',
                        padding: theme.spacing(3),
                        border: 10,
                        m: 1,
                        bgcolor:'rgba(239,237,237,0.53)',
                        borderColor: '#268991',
                        borderRadius:'16px'

                    })}>
                <AddTestForm/>
            </Box>
        </Grid>
    )

}

export default AddTestView;