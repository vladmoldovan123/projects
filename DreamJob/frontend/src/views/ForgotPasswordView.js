import Grid from '@mui/material/Grid';
import RegisterBusinessForm from "../components/RegisterBusinessForm";
import Box from "@mui/material/Box";
import ForgotPasswordForm from "../components/ForgotPasswordForm";
import Typography from "@mui/material/Typography";
import Background from '../assets/images/background.png'

const windowHeight = window.innerHeight - 69;



function ForgotPasswordView(){

    return(

        <Grid container alignItems="center" justifyContent="center" sx={{
            minHeight:windowHeight,
            backgroundSize:'cover',
            backgroundPosition: 'fixed',
            backgroundImage:`url(${Background})`
        }}>
            <Box
                sx={
                    (theme) => ({
                        width: '40%',
                        padding: theme.spacing(3),
                        border: 10,
                        m: 1,
                        bgcolor: 'rgba(239,237,237,0.53)',
                        borderColor: '#268991',
                        borderRadius: '16px'

                    })}>
                <Typography variant="h6" component="div" gutterBottom align='center' color="#268991" fontSize='1.5rem' >
                    Introdu adresa ta de email
                </Typography>
                <ForgotPasswordForm/>
            </Box>
        </Grid>
    )
}

export default ForgotPasswordView;