import Grid from "@mui/material/Grid";
import React, {useState,useEffect} from 'react';
import * as JobService from '../services/JobService';
import JobCard from "../components/JobCard";
import Box from "@mui/material/Box";
import CircularProgress from "@mui/material/CircularProgress";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";

const windowHeight = window.innerHeight - 69;

function FavoritesJobView(){


    const [state,setState] = useState({
        favorites:null
    })

    const [favoritesId,setFavoritesId]=useState(null);

    useEffect(()=>{
        JobService.getUserFavoriteJobs()
            .then(result=>{
                setState({
                    ...state,
                    favorites:result.data
                })

                setFavoritesId(result.data.map(favorite=>favorite._id));
            })
            .catch(err=>{
                console.log("ERR: ",err);
            })
    },[])

    useEffect(()=>{
        console.log("Favorites number: ",state.favorites)
    },[state.favorites])

    return(
        <Grid sx={{paddingTop: '3%',bgcolor:'#78adb4', minHeight: windowHeight}} justifyContent="center" alignItems="center" >

            <Typography variant="h4" component="div" gutterBottom align='center' color="#FFFFFF" fontSize='2rem' sx={{marginLeft:"1%"}}>
                Joburi salvate
            </Typography>
            <Grid container spacing={3} item sx={{marginTop:'3%', paddingLeft:'1%', maxWidth:'100%', paddingBottom:'3%'}} >
                {
                    state.favorites!==null ?
                        state.favorites.map(element=>{

                            return <Grid item xs={3} >
                                <JobCard favoritesJob={state} setFavoritesJob={setState} image={element.avatar} location={element.location} title={element.jobTitle} date={element.date} jobId={element._id} favorite={true}/>
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

export default FavoritesJobView;