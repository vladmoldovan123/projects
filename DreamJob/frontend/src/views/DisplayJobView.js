import {useEffect, useMemo, useState} from "react";
import {
    useLocation
} from "react-router-dom";
import * as JobService from '../services/JobService';
import Grid from "@mui/material/Grid";
import Container from '@mui/material/Container';
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import * as React from "react";
import Divider from "@mui/material/Divider";
import Button from "@mui/material/Button";
import DOMPurify from "dompurify";
import * as ChatService from '../services/ChatService';
import {DialogContent} from "@mui/material";
import AddApplicationForm from "../components/AddApplicationForm";
import Dialog from "@mui/material/Dialog";
import { useHistory } from "react-router-dom";

const windowHeight = window.innerHeight - 69;

function DisplayJobView(){

    const options = { year: 'numeric', month: 'long', day: 'numeric' };

    const history = useHistory();

    const [open, setOpen] = React.useState(false);

    const [state,setState] = useState({
        careerLevel:'',
        description: '',
        domain: '',
        jobTitle: '',
        jobType: '',
        location: '',
        studyLevel: '',
        business:'',
        avatar:'',
        date:''
    })

    const { search } = useLocation();

    const query = useMemo(() => new URLSearchParams(search), [search]);



    useEffect(()=>{
        JobService.getJob(query.get("id"))
            .then(result=>{
                setState({
                    ...state,
                    careerLevel: result.data.careerLevel,
                    description: result.data.description,
                    domain: result.data.domain,
                    jobTitle: result.data.jobTitle,
                    jobType: result.data.jobType,
                    location: result.data.location,
                    studyLevel: result.data.studyLevel,
                    business: result.data.user,
                    date: result.data.date,
                    avatar: result.data.avatar
                })
            })
            .catch(err=>{
                console.log("ERR: ",err);
            })
    },[])

    const createMarkup = (html) => {
        return  {
            __html: DOMPurify.sanitize(html)
        }
    }

    const handleClickApplication = (e) =>{
        e.stopPropagation();
        setOpen(true);
    }

    const handleClickMessage = (e)=>{
        const chat ={
            business: state.business
        }

        ChatService.createChat(chat)
            .then(result=>{
                history.push('/conversation')
            })
            .catch(err=>{
                console.log("ERR: ",err);
            })
    }

    const handleClose = (e) => {
        e.stopPropagation();
        setOpen(false);
    };

    const handleDialogClick = e => {
        e.stopPropagation();
    };



    return(
           <Grid sx={{bgcolor:'#78adb4',minHeight: windowHeight}}>
               <Container sx={{paddingTop: '3%', paddingBottom:'3%'}} >
                   <Box  padding={2} sx={{border:7, borderRadius:"0.5rem",bgcolor:'#FFFFFF', borderColor:"#268991"}}>
                       <Typography gutterBottom variant="subtitle1" component="div" color="primary" sx={{margin: 'auto'}}>
                           {new Date(state.date).toLocaleDateString('ro-RO',options)}
                       </Typography>
                       <Grid container>
                           <Grid container item xs={5} justifyContent="flex-start">
                               <Typography gutterBottom variant="h4" component="div" color="primary" textAlign="center" sx={{margin: 'auto'}}>
                                   {state.jobTitle}
                               </Typography>
                           </Grid>
                           <Grid item xs={2} >

                           </Grid>
                           <Grid container item xs={5} justifyContent="center">
                               <img src={state.avatar} alt="LOGO">
                               </img>
                           </Grid>
                       </Grid>
                       <Divider sx={{borderColor: '#268991', borderWidth:"medium", bgcolor:'#268991'}} />
                       <Grid>
                           <Grid container sx={{marginTop:2}}>
                               <Grid container item xs={5}>
                                   <Grid item xs={5}>
                                       <Typography gutterBottom variant="h5" component="div" color="primary" sx={{marginTop:'auto',marginBottom:'auto'}}>
                                           Oraș de lucru
                                       </Typography>
                                   </Grid>
                                   <Grid item xs={5}>
                                       <Typography gutterBottom variant="h6" component="div" sx={{marginTop:'auto',marginBottom:'auto'}}>
                                           {state.location}
                                       </Typography>
                                   </Grid>
                               </Grid>
                               <Grid container item xs={2}>

                               </Grid>
                               <Grid container item xs={5}>
                                   <Grid item xs={5}>
                                       <Typography gutterBottom variant="h5" component="div" color="primary"  sx={{marginTop:'auto',marginBottom:'auto'}}>
                                           Nivel carieră
                                       </Typography>
                                   </Grid>
                                   <Grid item xs={5}>
                                       <Typography gutterBottom variant="h6" component="div" sx={{marginTop:'auto',marginBottom:'auto'}}>
                                           {state.careerLevel}
                                       </Typography>
                                   </Grid>
                               </Grid>
                           </Grid>
                           <Grid container sx={{marginTop:2}}>
                               <Grid container item xs={5}>
                                   <Grid item xs={5}>
                                       <Typography gutterBottom variant="h5" component="div" color="primary" sx={{marginTop:'auto',marginBottom:'auto'}}>
                                           Tipul job-ului
                                       </Typography>
                                   </Grid>
                                   <Grid item xs={5}>
                                       <Typography gutterBottom variant="h6" component="div" sx={{marginTop:'auto',marginBottom:'auto'}}>
                                           {state.jobType}
                                       </Typography>
                                   </Grid>
                               </Grid>
                               <Grid container item xs={2}>

                               </Grid>
                               <Grid container item xs={5}>
                                   <Grid item xs={5}>
                                       <Typography gutterBottom variant="h5" component="div" color="primary" sx={{marginTop:'auto',marginBottom:'auto'}}>
                                           Studii
                                       </Typography>
                                   </Grid>
                                   <Grid item xs={5}>
                                       <Typography gutterBottom variant="h6" component="div" sx={{marginTop:'auto',marginBottom:'auto'}}>
                                           {state.studyLevel}
                                       </Typography>
                                   </Grid>
                               </Grid>
                           </Grid>
                           <Grid container sx={{marginTop:2}}>
                               <Grid container item xs={5}>
                                   <Grid item xs={5}>
                                       <Typography gutterBottom variant="h5" component="div" color="primary" sx={{marginTop:'auto',marginBottom:'auto'}}>
                                           Domeniu
                                       </Typography>
                                   </Grid>
                                   <Grid item xs={5}>
                                       <Typography gutterBottom variant="h6" component="div" sx={{marginTop:'auto',marginBottom:'auto'}}>
                                           {state.domain}
                                       </Typography>
                                   </Grid>
                               </Grid>
                               <Grid container item xs={2}>

                               </Grid>
                               {
                                   sessionStorage.getItem("role") === "client" ?
                                       <Grid container item xs={5}>
                                           <Grid item xs={5}>
                                               <Button variant="contained" size="large" sx={{textTransform:'none', marginTop: 'auto', marginBottom:'auto', bgcolor:"#268991"}} onClick={handleClickApplication}>Aplică</Button>
                                           </Grid>
                                           <Grid item xs={7}>
                                               <Button variant="contained" size="large" sx={{textTransform:'none', marginTop: 'auto', marginBottom:'auto', bgcolor:"#268991"}} onClick={handleClickMessage}>Mesaj</Button>
                                           </Grid>
                                       </Grid>
                                       :
                                       <Grid container item xs={5}>

                                       </Grid>
                               }
                           </Grid>
                       </Grid>
                   </Box>
                   <Box padding={2} sx={{ marginTop:'3%', border:7, borderRadius:"0.5rem",bgcolor:'#FFFFFF', borderColor:"#268991"}}>
                       <div className="preview" dangerouslySetInnerHTML={createMarkup(state.description)}/>
                   </Box>
               </Container>
               <Dialog
                   open={open}
                   onClick={handleDialogClick}
                   onClose={handleClose}
                   PaperProps={{
                       style: { borderRadius: "12px" }
                   }}
               >
                   <DialogContent sx={{padding:0}}>
                       <AddApplicationForm handleClose={handleClose} job={query.get("id")}/>
                   </DialogContent>
               </Dialog>
           </Grid>
    );



}

export default DisplayJobView;