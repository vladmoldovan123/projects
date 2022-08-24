import * as React from 'react';
import Background from "../assets/images/background.png";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";

import List from '@mui/material/List';
import ListItemText from '@mui/material/ListItemText';
import ListItemButton from '@mui/material/ListItemButton';
import Divider from '@mui/material/Divider';
import PersonalDataForm from '../components/cv/PersonalDataForm';
import AboutMeForm from '../components/cv/AboutMeForm';
import ProfessionalExperienceForm from "../components/cv/ProfessionalExperienceForm";
import SpokenLanguagesForm from "../components/cv/SpokenLanguagesForm";
import EducationForm from "../components/cv/EducationForm";
import Button from "@mui/material/Button";
import {useHistory} from "react-router-dom";

const windowHeight = window.innerHeight - 69;

function CvView(){

    const history = useHistory();

    const [selectedIndex, setSelectedIndex] = React.useState(0);

    const handleListItemClick = (index) => {
        setSelectedIndex(index);
    };

    const handleGenerateCv = ()=>{
        history.push("/build");
    }

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
                        width: '75%',
                        padding: theme.spacing(3),
                        border: 10,
                        m: 1,
                        bgcolor: 'rgba(255,255,255,0.8)',
                        borderColor: '#268991',
                        borderRadius: '16px'

                    })}>
                <Grid
                    sx={(theme)=>({
                        '& .MuiFormControl-root':{
                            width:'95%',
                            margin:theme.spacing(1),
                        }
                    })}
                    container alignItems="center" justifyContent="center">
                    <Grid item xs={4}>
                        <List component="nav" aria-label="mailbox folders"
                            sx={{
                                paddingTop:0,
                                paddingBottom:0,
                              // selected and (selected + hover) states
                              '&& .Mui-selected, && .Mui-selected:hover': {
                                bgcolor: '#268991',
                                '&, & .MuiListItemIcon-root': {
                                  color: 'white',
                                },
                              }
                            }}
                        >
                            <ListItemButton selected={selectedIndex === 0} onClick={() => handleListItemClick(0)} >
                                <ListItemText primary="Date personale" />
                            </ListItemButton>
                            <Divider sx={{borderColor: '#268991', borderWidth:"thin", bgcolor:'#268991'}} />
                            <ListItemButton selected={selectedIndex === 1} onClick={() => handleListItemClick(1)}>
                                <ListItemText primary="Despre mine" />
                            </ListItemButton>
                            <Divider sx={{borderColor: '#268991', borderWidth:"thin", bgcolor:'#268991'}} />
                            <ListItemButton selected={selectedIndex === 2} onClick={() => handleListItemClick(2)}>
                                <ListItemText primary="Experiență profesională" />
                            </ListItemButton>
                            <Divider sx={{borderColor: '#268991', borderWidth:"thin", bgcolor:'#268991'}} />
                            <ListItemButton selected={selectedIndex === 3} onClick={() => handleListItemClick(3)}>
                                <ListItemText primary="Educație" />
                            </ListItemButton>
                            <Divider sx={{borderColor: '#268991', borderWidth:"thin", bgcolor:'#268991'}} />
                            <ListItemButton selected={selectedIndex === 4} onClick={() => handleListItemClick(4)}>
                                <ListItemText primary="Competențe lingvistice" />
                            </ListItemButton>
                        </List>
                        <Grid container justify="center" mt="1rem">
                            <Button variant="contained" size="large" sx={{textTransform:'none', m:"auto", bgcolor:"#268991"}} onClick={handleGenerateCv}>Generează CV</Button>
                        </Grid>
                    </Grid>
                    <Divider orientation="vertical" variant='fullWidth' flexItem sx={{marginRight:"-1px", width:"0px", borderRightWidth:"thick", borderColor: '#268991'}} />
                    <Grid item container alignItems="center" justifyContent="center" xs={7.9}>
                        {selectedIndex === 0 ? <PersonalDataForm/> : null}
                        {selectedIndex === 1 ? <AboutMeForm/> : null}
                        {selectedIndex === 2 ? <ProfessionalExperienceForm/> : null}
                        {selectedIndex === 3 ? <EducationForm/> : null}
                        {selectedIndex === 4 ? <SpokenLanguagesForm/> : null}
                    </Grid>
                </Grid>
            </Box>
        </Grid>
    );
}

export default CvView;