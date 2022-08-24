import React, {useEffect, useState} from "react";
import * as ApplicationService from "../services/ApplicationService";
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import JobCard from "../components/JobCard";
import Box from "@mui/material/Box";
import CircularProgress from "@mui/material/CircularProgress";

const windowHeight = window.innerHeight - 69;

function UserApplicationsView(){

    const [state,setState] = useState({
        applications:null
    })

    useEffect(()=>{
        ApplicationService.getApplicationsByUser()
            .then(result=>{
                setState({
                    ...state,
                    applications:result.data
                })
            })
            .catch(err=>{
                console.log("ERR: ",err);
            })
    },[])

    return(
        <Grid sx={{paddingTop: '3%',bgcolor:'#78adb4', minHeight: windowHeight}} justifyContent="center" alignItems="center" >

            <Typography variant="h4" component="div" gutterBottom align='center' color="#FFFFFF" fontSize='2rem' sx={{marginLeft:"1%"}}>
                Aplicațiile mele
            </Typography>
            <Grid container spacing={3} item sx={{marginTop:'3%', paddingLeft:'1%', maxWidth:'100%',paddingBottom:'3%'}} >
                {
                    state.applications!==null ?
                        state.applications.map(element=>{
                            return <Grid item xs={3} >
                                <JobCard image={element.job.avatar} location={element.job.location} title={element.job.jobTitle} date={element.job.date} jobId={element.job._id} favorite={true} application={true}/>
                            </Grid>
                        })
                        :
                        <Box sx={{ m:'auto'}}>
                            <CircularProgress size={200}/>
                        </Box>
                }
            </Grid>
        </Grid>
    )

}

export default UserApplicationsView;