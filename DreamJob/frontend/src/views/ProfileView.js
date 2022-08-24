import Background from "../assets/images/background.png";
import Grid from "@mui/material/Grid";
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import EditIcon from '@mui/icons-material/Edit';
import IconButton from '@mui/material/IconButton';
import Badge from '@mui/material/Badge';

const windowHeight = window.innerHeight - 69;

function ProfileView(){


    return(
        <Grid container alignItems="center" justifyContent="center" sx={{
            minHeight: windowHeight,
            // backgroundSize: 'cover',
            // backgroundPosition: 'fixed',
            // backgroundImage: `url(${Background})`
        }}>
            <Grid item container >
                <Badge
                    overlap="circular"
                    anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
                    badgeContent={
                        // <Grid bgcolor="gray" sx={{ "&:hover": {cursor: "pointer"}, borderRadius:8 }}>
                        //     <EditIcon/>
                        // </Grid>
                        <IconButton size="small" sx={{ bgcolor:'white' , boxShadow:5,  "&:hover": {bgcolor: 'white'}
                    }}><EditIcon/></IconButton>
                    }

                >
                    <Avatar alt={Avatar} sx={{
                        height:"100px",
                        width:"100px"
                    }}/>
                </Badge>
            </Grid>
        </Grid>
    );
}
export default ProfileView