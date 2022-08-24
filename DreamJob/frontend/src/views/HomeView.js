import Welcome from '../assets/images/welcome.png'
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import * as React from "react";
const windowHeight = window.innerHeight - 69;

function HomeView()
{

    return(
        <Grid container alignItems="center" justifyContent="center"  sx={{
            minHeight: windowHeight,
            bgcolor:'#78adb4'
        }}>
            <Grid item >
                <Typography variant="h6" component="div" gutterBottom align='center' color="#FFFFFF" fontSize='2rem' >
                    Bine ați venit pe Dream Jobs!
                </Typography>
                <img src={Welcome} alt="Dream Jobs"/>
            </Grid>
        </Grid>
    )
}

export default HomeView;