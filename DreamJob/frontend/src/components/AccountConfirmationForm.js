import Typography from "@mui/material/Typography";
import * as React from 'react';
import Box from "@mui/material/Box";
import Grid from '@mui/material/Grid';

function AccountConfirmationForm(){

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
                   Contul a fost creat cu succes!
                </Typography>
                <Typography variant="h6" component="div" gutterBottom color="#268991" fontSize='1.5rem' >
                    Vei primi un email pentru confirmarea contului.
                </Typography>
            </Box>
        </Grid>
    )

}

export default AccountConfirmationForm;