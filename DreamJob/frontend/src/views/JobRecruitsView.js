import React, {useEffect, useMemo, useState} from "react";
import {
    useLocation
} from "react-router-dom";
import * as ApplicationService from '../services/ApplicationService';
import Typography from "@mui/material/Typography";
import Grid from "@mui/material/Grid";
import BusinessOwnJobCard from "../components/BusinessOwnJobCard";
import Box from "@mui/material/Box";
import CircularProgress from "@mui/material/CircularProgress";
import ApplicationCard from "../components/ApplicationCard";

const windowHeight = window.innerHeight - 69;

function JobRecruitsView(){

    const { search } = useLocation();

    const query = useMemo(() => new URLSearchParams(search), [search]);

    const [state,setState]=useState({
        applications:null
    })

    useEffect(()=>{
        ApplicationService.getApplicationsByJob(query.get("id"))
            .then(result=>{
                setState({
                    ...state,
                    applications: result.data
                })
            })
            .catch(err=>{
                console.log("ERR: ",err);
            })
    },[])

    return(
        <Grid sx={{paddingTop: '3%',bgcolor:'#78adb4', minHeight: windowHeight}} justifyContent="center" alignItems="center" >

            <Typography variant="h4" component="div" gutterBottom align='center' color="#FFFFFF" fontSize='2rem' sx={{marginLeft:"1%"}}>
                Aplicanți
            </Typography>
            <Grid container spacing={3} item sx={{marginTop:'3%', paddingLeft:'3%', paddingBottom: '3%'}} >
                {
                    state.applications!==null ?
                        state.applications.map(element=>{
                            return <Grid item xs={3} >
                                <ApplicationCard image={element.user.avatar} date={new Date().getTime()} firstName={element.user.firstName} lastName={element.user.lastName} city={element.user.city} cv={element.cv}/>
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

export default  JobRecruitsView;