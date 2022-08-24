import React, {useEffect, useState} from 'react';
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import Divider from "@mui/material/Divider";
import AddIcon from '@mui/icons-material/Add';
import Button from '@mui/material/Button';
import {ClickAwayListener, DialogContent} from "@mui/material";
import Dialog from "@mui/material/Dialog";

import AddEducationForm from "./AddEducationForm";
import axios from "axios";
import * as Config from "../../utils/Config";
import IconButton from "@mui/material/IconButton";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import EditEducationForm from "./EditEducationForm";
import CircularProgress from "@mui/material/CircularProgress";
import Box from "@mui/material/Box";

function EducationForm(){

    const [state,setState] =useState({
        id:'',
        education:[]
    })

    const options = { year: 'numeric', month: 'long', day: 'numeric' };



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
                    education: result.data.education
                })
            })
            .catch(err=>{
                console.log("Err: ",err);
            });
    },[])

    const [open, setOpen] = React.useState(false);

    const [openEdit, setOpenEdit] = React.useState({
        open:false,
        key: 0
    });


    const handleClose = () => {
        setOpen(false);
    };

    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleCloseEdit = () => {
        setOpenEdit({
            ...openEdit,
            open:false
        });
    };

    const handleDelete = (key)=>{

        let education = state.education;

        education.splice(key,1);

        const data={
            id:state.id,
            education: education
        }

        axios.put(Config.databaseUrl+'/user-info',data,{
            headers: {
                'Authorization': 'Bearer ' + sessionStorage.getItem("token")
            }
        })
            .then(()=>{
                setState({
                    ...state,
                    education: education
                })
            })
            .catch(err=>{
                console.log("Err: ",err);
            });
    }

    const handleEdit =  (key)=>{
       setOpenEdit({
           ...openEdit,
           open:true,
           key:key
       })
    }

    return(
        <>
            {
                state.id !=='' ?
                    <Grid sx={{width:"100%", height:"100%"}}>
                        <Grid container sx={{width:"100%"}}>
                            <Grid item xs={8}>
                                <Typography variant="h4" component="div" gutterBottom align='left' color="#268991" fontSize='2rem' sx={{marginLeft:"1%"}}>
                                    Educație
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
                            state.education.map((val,key)=>{
                                return <Grid>
                                    <Grid container sx={{width:"100%"}}>
                                        <Grid item xs={10}>
                                            <Typography variant="body" component="div" gutterBottom align='left' fontSize='1.5rem' sx={{marginLeft:"1%"}}>
                                                {val.specialisation+" "+ val.studyType+" în "+ val.location}
                                            </Typography>
                                            <Typography variant="subtitle" component="div" gutterBottom align='left' fontSize='2rem' sx={{marginLeft:"1%"}}>
                                                {val.institution}
                                            </Typography>
                                            <Typography variant="body" component="div" gutterBottom align='left' fontSize='1.5rem' sx={{marginLeft:"1%"}}>
                                                {new Date(val.from).toLocaleDateString('ro-RO',options)+" - "+new Date(val.to).toLocaleDateString('ro-RO',options)}
                                            </Typography>
                                        </Grid>
                                        <Grid item container xs={2} justifyContent="flex-end">
                                            <IconButton disableRipple aria-label="edit" color="primary" sx={{ "&:hover": { backgroundColor: "transparent" }}} onClick={()=> handleEdit(key)}>
                                                <EditIcon />
                                            </IconButton>
                                            <IconButton disableRipple aria-label="delete" color="primary" sx={{ "&:hover": { backgroundColor: "transparent" }} } onClick={()=> handleDelete(key)}>
                                                <DeleteIcon />
                                            </IconButton>
                                        </Grid>
                                    </Grid>
                                    <Divider sx={{marginBottom:"1%",marginLeft:"1%", borderColor: '#268991', borderWidth:"thin", bgcolor:'#268991'}} />
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
                                <AddEducationForm handleClose={handleClose} education={state.education} userInfoId={state.id}/>
                            </DialogContent>
                        </Dialog>
                        <Dialog
                            open={openEdit.open}
                            onClose={handleCloseEdit}
                            PaperProps={{
                                style: { borderRadius: "12px" }
                            }}
                        >
                            <ClickAwayListener onClickAway={handleCloseEdit}>
                                <DialogContent sx={{padding:0}}>
                                    <EditEducationForm handleClose={handleCloseEdit} education={state.education} userInfoId={state.id} index={openEdit.key}/>
                                </DialogContent>
                            </ClickAwayListener>
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

export default EducationForm;