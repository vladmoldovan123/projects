import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import RegisterBusinessForm from "../components/RegisterBusinessForm";
import Typography from "@mui/material/Typography";
import Background from '../assets/images/background.png'
const windowHeight = window.innerHeight - 69;

function RegisterBusinessView() {


    return (


        <Grid container alignItems="center" justifyContent="center" sx={{
            minHeight: windowHeight,
            // backgroundSize: 'cover',
            // backgroundPosition: 'fixed',
            // backgroundImage: `url(${Background})`
            bgcolor:'#78adb4'
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
                <RegisterBusinessForm/>
            </Box>
        </Grid>
    );
}

export default RegisterBusinessView;