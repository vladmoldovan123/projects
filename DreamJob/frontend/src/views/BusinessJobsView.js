import React, {useEffect, useState} from "react";
import * as JobService from "../services/JobService";
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import JobCard from "../components/JobCard";
import Box from "@mui/material/Box";
import CircularProgress from "@mui/material/CircularProgress";
import BusinessOwnJobCard from "../components/BusinessOwnJobCard";

const windowHeight = window.innerHeight - 69;

function BusinessJobsView(){

    const [state,setState] = useState({
        jobs:null
    })

    useEffect(()=>{
        JobService.getBusinessJobs()
            .then(result=>{
                setState({
                    ...state,
                    jobs:result.data
                })
            })
            .catch(err=>{
                console.log("ERR: ",err);
            })
    },[])

    return(
        <Grid sx={{paddingTop: '3%',bgcolor:'#78adb4', minHeight: windowHeight}} justifyContent="center" alignItems="center" >

            <Typography variant="h4" component="div" gutterBottom align='center' color="#FFFFFF" fontSize='2rem' sx={{marginLeft:"1%"}}>
                Ofertele tale
            </Typography>
            <Grid container spacing={3} item sx={{marginTop:'3%', paddingLeft:'1%', maxWidth:'100%',paddingBottom:'3%'}} >
                {
                    state.jobs!==null ?
                        state.jobs.map(element=>{
                            return <Grid item spacing={3} xs={3} >
                                <BusinessOwnJobCard parentState={state} setParentState={setState} image={element.avatar} location={element.location} title={element.jobTitle} date={element.date} jobId={element._id} favorite={true}/>
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

export default BusinessJobsView;