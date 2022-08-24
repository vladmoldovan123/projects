import Background from "../assets/images/background.png";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import UserAccountSettingsForm from "../components/settings/UserAccountSettingsForm";
import BusinessAccountSettingsForm from "../components/settings/BusinessAccountSettingsForm";
import HomeView from "./HomeView";

const windowHeight = window.innerHeight - 69;

function AccountSettingsView(){

    return(
        <Grid container alignItems="center" justifyContent="center" sx={{
            minHeight:windowHeight,
            bgcolor:'#78adb4'
        }}>
            <Box
                sx={
                    (theme) => ({
                        width: '40%',
                        padding: theme.spacing(3),
                        border: 10,
                        m: 1,
                        bgcolor: 'rgba(239,237,237,1)',
                        borderColor: '#268991',
                        borderRadius: '16px'

                    })}>
                {sessionStorage.getItem("role")==='client'? <UserAccountSettingsForm/> :  <BusinessAccountSettingsForm/>}


            </Box>
        </Grid>
    );
}

export default AccountSettingsView;