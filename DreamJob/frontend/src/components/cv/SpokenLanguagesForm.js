import React, {useEffect, useState} from 'react';

import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import Divider from "@mui/material/Divider";
import TextField from "@mui/material/TextField";
import DeleteIcon from '@mui/icons-material/Delete';
import Button from '@mui/material/Button';
import IconButton from "@mui/material/IconButton";
import AddIcon from "@mui/icons-material/Add";
import {DialogContent} from "@mui/material";

import Dialog from "@mui/material/Dialog";
import AddLanguageForm from "./AddLanguageForm";
import axios from "axios";
import * as Config from "../../utils/Config";
import Box from "@mui/material/Box";
import CircularProgress from "@mui/material/CircularProgress";

function SpokenLanguagesForm(){

    const [state,setState]=useState({
        id:'',
        languages:[]
    })

    const [open, setOpen] = React.useState(false);


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
                    languages: result.data.language
                })
            })
            .catch(err=>{
                console.log("Err: ",err);
            });
    },[])

    const handleClose = () => {
        setOpen(false);
    };

    const handleClickOpen = () => {
        setOpen(true);
    };


    const handleDelete = (key)=>{
        let languages = state.languages;

        languages.splice(key,1);

        const data={
            id:state.id,
            language: languages
        }

        axios.put(Config.databaseUrl+'/user-info',data,{
            headers: {
                'Authorization': 'Bearer ' + sessionStorage.getItem("token")
            }
        })
            .then(()=>{
                setState({
                    ...state,
                    languages: languages
                })
            })
            .catch(err=>{
                console.log("Err: ",err);
            });
    }

    return(
        <>
            {
                state.id!=='' ?
                    <Grid sx={{width:"100%"}}>



                        <Grid container sx={{width:"100%"}}>
                            <Grid item xs={8}>
                                <Typography variant="h4" component="div" gutterBottom align='left' color="#268991" fontSize='2rem' sx={{marginLeft:"1%"}}>
                                    Competențe lingvistice
                                </Typography>
                            </Grid>
                            <Grid item container xs={4} justifyContent="flex-end">
                                <Button variant="contained" startIcon={<AddIcon />} sx={{marginBottom:"3%"}} onClick={handleClickOpen}>
                                    Adaugă
                                </Button>
                            </Grid>
                        </Grid>

                        <Divider sx={{marginBottom:"1%",marginLeft:"1%", borderColor: '#268991', borderWidth:"thin", bgcolor:'#268991'}} />
                        {
                            state.languages.map((val,key)=>{
                                return <Grid container spacing={1} >
                                    <Grid item xs={5}>
                                        <TextField
                                            type='text'
                                            defaultValue={val.language}
                                            label="Limbă"
                                            variant='outlined'
                                            color="primary"
                                            focused
                                            inputProps={
                                                { readOnly: true, }
                                            }
                                        />
                                    </Grid>
                                    <Grid item xs={5}>
                                        <TextField
                                            type='text'
                                            defaultValue={val.level}
                                            label="Nivel"
                                            variant='outlined'
                                            color="primary"
                                            focused
                                            inputProps={
                                                { readOnly: true, }
                                            }
                                        />
                                    </Grid>

                                    <Grid item container xs={2} justifyContent="flex-end">
                                        <IconButton disableRipple aria-label="delete" color="primary" sx={{ "&:hover": { backgroundColor: "transparent" }} } onClick={()=> handleDelete(key)}>
                                            <DeleteIcon />
                                        </IconButton>
                                    </Grid>
                                </Grid>
                            })
                        }

                        <Dialog
                            open={open}
                            onClose={handleClose}
                            PaperProps={{
                                style: { borderRadius: "12px" }
                            }}
                        >
                            <DialogContent sx={{padding:0}}>
                                <AddLanguageForm handleClose={handleClose} languages={state.languages} userInfoId={state.id}/>
                            </DialogContent>
                        </Dialog>

                    </Grid>
                    :
                    <Grid sx={{width:"100%", height:"100%"}}>
                        <Box sx={{ m:'auto',justifyContent:'center', display:'flex'}}>
                            <CircularProgress size={200}/>
                        </Box>
                    </Grid>
            }
        </>
    )
}

export default SpokenLanguagesForm;