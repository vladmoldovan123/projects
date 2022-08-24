import React, {useEffect, useState} from 'react';

import TextareaAutosize from '@mui/material/TextareaAutosize';
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import Divider from "@mui/material/Divider";
import Button from "@mui/material/Button";
import axios from "axios";
import * as Config from "../../utils/Config";
import CircularProgress from "@mui/material/CircularProgress";
import Box from "@mui/material/Box";

function AboutMeForm(){

    const [state,setState]=useState({
        id:'',
        aboutMe:''
    })

    const handleInputChange = e => {
        const {name, value } = e.target;
        setState({
            ...state,
            [name]: value,
            errors:{
                ...state.errors,
                [name]:false
            },
            errorMessages: {
                ...state.errorMessages,
                [name]:""
            }
        })
    }

    useEffect(()=>{
        axios.get(Config.databaseUrl+'/user-info',{
            headers: {
                'Authorization': 'Bearer ' + sessionStorage.getItem("token")
            }
        })
            .then(result=>{
                setState({
                    ...state,
                    id: result.data._id,
                    aboutMe: result.data.aboutMe,
                })
            })
            .catch(err=>{
                console.log("Err: ",err);
            });
    },[])

    const handleSubmit = (e)=>{
        e.preventDefault();

        let data ={
            id:state.id,
            aboutMe:state.aboutMe
        }
        axios.put(Config.databaseUrl+'/user-info',data,{
            headers: {
                'Authorization': 'Bearer ' + sessionStorage.getItem("token")
            }
        })
            .then(result=>{
                console.log("DADADA");
            })
            .catch(err=>{
                console.log("Err: ",err);
            });
    }

    return(
            <Grid sx={{width:"100%"}}>
                {
                    state.id!=='' ?
                        <form onSubmit={handleSubmit}>
                            <Grid>
                                <Typography variant="h4" component="div" gutterBottom align='center' color="#268991" fontSize='2rem' sx={{marginLeft:"1%"}}>
                                    Despre mine
                                </Typography>
                            </Grid>
                            <Divider sx={{marginBottom:"1%",marginLeft:"1%", borderColor: '#268991', borderWidth:"thin", bgcolor:'#268991'}} />
                            <Grid sx={{marginLeft:"1%"}}>
                                <TextareaAutosize
                                    aria-label="minimum height"
                                    minRows={20}
                                    value={state.aboutMe}
                                    name="aboutMe"
                                    onChange={handleInputChange}
                                    style={{ width: "100%" }}
                                />
                            </Grid>
                            <Grid container justify="center" mt="1rem">
                                <Button variant="contained" size="large" sx={{textTransform:'none', m:"auto", bgcolor:"#268991"}} type="submit">Salvează</Button>
                            </Grid>
                        </form>
                        :
                        <Box sx={{ m:'auto',justifyContent:'center', display:'flex'}}>
                            <CircularProgress size={200}/>
                        </Box>
                }
            </Grid>
    )
}

export default AboutMeForm;