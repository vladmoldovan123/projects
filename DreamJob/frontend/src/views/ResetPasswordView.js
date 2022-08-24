import {useEffect,useMemo} from "react";
import Background from "../assets/images/background.png";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Grid from "@mui/material/Grid";
import ResetPasswordForm from "../components/ResetPasswordForm";
import {
    useLocation
} from "react-router-dom";

const windowHeight = window.innerHeight - 69;

function ResetPasswordView(){


    const { search } = useLocation();

    const query = useMemo(() => new URLSearchParams(search), [search]);

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
                    Introdu noua parolă
                </Typography>
                <ResetPasswordForm passwordToken={query.get("token")}
                />
            </Box>
        </Grid>
    )
}

export default ResetPasswordView;