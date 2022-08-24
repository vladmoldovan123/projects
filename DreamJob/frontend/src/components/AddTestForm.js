import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import React from "react";
import Grid from "@mui/material/Grid";
import Divider from "@mui/material/Divider";
import AddIcon from "@mui/icons-material/Add";
import Button from "@mui/material/Button";

function AddTestForm(){



    const handleClickOpen=()=>{

    }

    return(

        <form>
            <Grid container sx={{width:"100%"}}>
                <Grid item xs={8}>
                    <Typography variant="h4" component="div" gutterBottom align='left' color="#268991" fontSize='2rem' sx={{marginLeft:"3%"}}>
                        Creează test
                    </Typography>
                </Grid>
                <Grid item container xs={4} justifyContent="flex-end">
                    <Button variant="contained" startIcon={<AddIcon />} sx={{marginBottom:"3%"}} onClick={handleClickOpen}>
                        Adaugă
                    </Button>
                </Grid>
            </Grid>
            <Divider sx={{marginBottom:"1%",marginLeft:"1%", borderColor: '#268991', borderWidth:"medium", bgcolor:'#268991'}} />

            <Grid
                sx={(theme)=>({
                    '& .MuiFormControl-root':{
                        width:'95%',
                        margin:theme.spacing(1),
                    }
                })}
                container>

            </Grid>
        </form>
    )

}

export default AddTestForm;