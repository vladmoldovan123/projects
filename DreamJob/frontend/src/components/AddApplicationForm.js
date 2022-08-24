import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import React, {useState} from "react";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import * as UploadService from "../services/UploadService";
import {Chip, TextField} from "@mui/material";
import AttachFileIcon from '@mui/icons-material/AttachFile';
import IconButton from "@mui/material/IconButton";
import CloseIcon from '@mui/icons-material/Close';
import LoadingButton from "@mui/lab/LoadingButton";
import * as ApplicationService from '../services/ApplicationService';

function AddApplicationForm(props){


    const [state,setState] = useState({
        file:null
    })

    const fileInput = React.useRef();

    const [loading, setLoading] = React.useState(false);

    const handleSubmit = (e)=>{
        e.preventDefault();

        setLoading(true);
        UploadService.uploadFiles(state.file)
            .then(result=>{
                const application={
                    cv: result,
                    job: props.job
                }
                ApplicationService.addApplication(application)
                    .then(r=>{
                        if(r.status===208){
                            console.log("Deja exista o aplicatie la acest job!");
                            setLoading(false);
                            props.handleClose();
                        }
                        else{
                            console.log("Ai aplicat pentru job!");
                            setLoading(false);
                            props.handleClose();
                        }

                    })
                    .catch(err=>{
                        console.log("Eroare: ",err);
                    })


            })
            .catch(err=>{
                console.log("Eroare: ",err);
            })
    }

    const handleChangeFile = (e)=>{
        console.log("FILE: ",e.target.files[0]);
        setState({
            ...state,
            file:e.target.files[0]
        })
    }

    const handleDelete = () =>{

        setState({
            ...state,
            file:null
        })
    }

    return(
        <form onSubmit={handleSubmit}>

            <Grid container alignItems="center" justifyContent="center">
                <Box sx={
                    (theme)=>({
                        padding: theme.spacing(1),
                        margin:0,
                        border: 10,
                        bgcolor:'rgba(239,237,237,1)',
                        borderColor: '#268991',
                        width:300

                    })}>
                    <Grid>
                        <IconButton
                            variant="contained"
                            color="primary"
                            onClick={props.handleClose}
                        >
                            <CloseIcon/>
                        </IconButton>
                    </Grid>

                    <Grid>
                        <Typography variant="h4" component="div" gutterBottom align='center' color="#268991" fontSize='2rem' sx={{marginLeft:"1%"}}>
                            Adaugă CV
                        </Typography>
                    </Grid>
                    <Grid container>
                        <Grid item xs={2} sx={{marginTop:1}}>
                            {/*<TextField id="standard-basic" label="CV" variant="standard" value={state.file!==null ? <Chip*/}
                            {/*    label="Clickable Deletable"*/}
                            {/*/>  : ""} />*/}
                            <Typography variant="subtitle1" component="div" gutterBottom align='center' color="#268991" fontSize='1rem' sx={{marginLeft:"1%"}}>
                                CV:
                            </Typography>
                        </Grid>
                        <Grid item xs={8} sx={{marginTop:0.5}} >
                            {
                                state.file!==null ? <Chip label={state.file.name} color="primary" onDelete={handleDelete} /> : null
                            }

                        </Grid>
                        <Grid item xs={2} >
                            <div>
                                <IconButton
                                    variant="contained"
                                    color="primary"
                                    onClick={()=>fileInput.current.click()}

                                >
                                    <AttachFileIcon/>
                                </IconButton>

                                <input
                                    ref={fileInput}
                                    type="file"
                                    accept="application/pdf"
                                    onChange={handleChangeFile}
                                    style={{ display: 'none' }}
                                />
                            </div>
                        </Grid>
                    </Grid>
                    <Grid container justify="center" mt="1rem">
                        <LoadingButton variant="contained" size="large" sx={{textTransform:'none', m:"auto", bgcolor:"#268991"}} loading={loading} disabled={loading} type="submit">Trimite</LoadingButton>
                    </Grid>
                </Box>
            </Grid>
        </form>
    );
}

export default AddApplicationForm