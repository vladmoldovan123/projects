import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import CreateJobForm from "../components/CreateJobForm";

const windowHeight = window.innerHeight - 69;

function CreateJobView(){

    return(
        <Grid container alignItems="center" justifyContent="center" sx={{
            minHeight: windowHeight,
            bgcolor:'#78adb4'
        }}>
            <Box
                sx={
                    (theme) => ({
                        width: '70%',
                        padding: theme.spacing(3),
                        border: 10,
                        m: 1,
                        borderColor: '#268991',
                        borderRadius: '16px',
                        bgcolor:'#FFFFFF'

                    })}>
                <CreateJobForm/>
            </Box>
        </Grid>
    );

}

export default CreateJobView;