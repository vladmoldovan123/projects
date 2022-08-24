import React, {useState,useEffect} from 'react';
import Grid from "@mui/material/Grid";
import TextField from "@mui/material/TextField";
import {LocalizationProvider} from "@mui/x-date-pickers/LocalizationProvider";
import {AdapterDateFns} from "@mui/x-date-pickers/AdapterDateFns";
import {DesktopDatePicker} from "@mui/x-date-pickers/DesktopDatePicker";

import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Divider from "@mui/material/Divider";
import axios from "axios";
import * as Config from "../../utils/Config";
import CircularProgress from "@mui/material/CircularProgress";
import Box from "@mui/material/Box";



function PersonalDataForm(){

    const [state,setState] = useState({
        id:'',
        firstName: '',
        lastName:'',
        birthDate: '',
        address:'',
        email:'',
        phone:'',
        linkedin:'',
        github:'',
        portfolio: ''
    })


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
                    firstName: result.data.personalData.firstName,
                    lastName: result.data.personalData.lastName,
                    email: result.data.personalData.email,
                    phone: result.data.personalData.phone,
                    birthDate: new Date(result.data.personalData.birthDate),
                    address: result.data.personalData.address,
                    linkedin: result.data.links.linkedin,
                    github: result.data.links.github,
                    portfolio: result.data.links.portfolio
                })
            })
            .catch(err=>{
                console.log("Err: ",err);
            });
    },[])

    const handleChangeBirthDate = (newDate)=>{
        setState({
            ...state,
            birthDate: newDate
        })
    }


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

    const handleSubmit = (e)=>{
        e.preventDefault();

        const personalData={
            firstName: state.firstName,
            lastName:state.lastName,
            birthDate: state.birthDate.getTime(),
            address:state.address,
            email:state.email,
            phone:state.phone,
        }

        const links ={
            linkedin:state.linkedin,
            github:state.github,
            portfolio: state.portfolio
        }

        const data = {
            id:state.id,
            personalData: personalData,
            links: links
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

                <div>
                    {
                        state.id!=='' ?
                            <form onSubmit={handleSubmit}>
                                <Grid>
                                    <Typography variant="h4" component="div" gutterBottom align='center' color="#268991" fontSize='2rem' sx={{marginLeft:"1%"}}>
                                        Date personale
                                    </Typography>
                                </Grid>
                                <Divider sx={{marginBottom:"1%",marginLeft:"1%", borderColor: '#268991', borderWidth:"thin", bgcolor:'#268991'}} />
                                <Grid
                                    sx={(theme)=>({
                                        '& .MuiFormControl-root':{
                                            width:'95%',
                                            margin:theme.spacing(1),
                                        }
                                    })}
                                    container>
                                    <Grid item xs={6}>
                                        <TextField
                                            inputProps={{autoComplete:'off'}}
                                            variant="outlined"
                                            label="Prenume"
                                            name="firstName"
                                            value={state.firstName}
                                            onChange={handleInputChange}
                                        />
                                        <TextField
                                            inputProps={{autoComplete:'off'}}
                                            variant="outlined"
                                            label="Telefon"
                                            name="phone"
                                            value={state.phone}
                                            onChange={handleInputChange}

                                        />
                                        <TextField
                                            inputProps={{autoComplete:'off'}}
                                            variant="outlined"
                                            label="Email"
                                            name="email"
                                            value={state.email}
                                            onChange={handleInputChange}
                                        />
                                    </Grid>

                                    <Grid item xs={6}>
                                        <TextField
                                            inputProps={{autoComplete:'off'}}
                                            variant="outlined"
                                            label="Nume"
                                            name="lastName"
                                            value={state.lastName}
                                            onChange={handleInputChange}

                                        />
                                        <TextField
                                            inputProps={{autoComplete:'off'}}
                                            variant="outlined"
                                            label="Adresă"
                                            name="address"
                                            value={state.address}
                                            onChange={handleInputChange}
                                        />

                                        <LocalizationProvider dateAdapter={AdapterDateFns}>
                                            <DesktopDatePicker
                                                label="Data nașterii"
                                                inputFormat="dd/MM/yyyy"
                                                value={state.birthDate}
                                                onChange={handleChangeBirthDate}
                                                renderInput={(params) => <TextField {...params} />}
                                            />
                                        </LocalizationProvider>

                                    </Grid>
                                </Grid>
                                <Divider sx={{marginTop:"1%", marginLeft:"1%", borderColor: '#268991', borderWidth:"thin", bgcolor:'#268991'}} />
                                <Grid>
                                    <Typography variant="h4" component="div" gutterBottom align='center' color="#268991" fontSize='2rem' sx={{marginLeft:"1%", marginTop:"1%"}}>
                                        Link-uri personale
                                    </Typography>
                                </Grid>
                                <Grid container item spacing={1} alignItems="center" justifyContent="center">
                                    <Grid item xs={8}>
                                        <TextField
                                            inputProps={{autoComplete:'off'}}
                                            variant="outlined"
                                            label="LinkedIn"
                                            name="linkedin"
                                            value={state.linkedin}
                                            onChange={handleInputChange}

                                        />
                                    </Grid>
                                    <Grid item xs={8}>
                                        <TextField
                                            inputProps={{autoComplete:'off'}}
                                            variant="outlined"
                                            label="GitHub"
                                            name="github"
                                            value={state.github}
                                            onChange={handleInputChange}

                                        />
                                    </Grid>
                                    <Grid item xs={8}>
                                        <TextField
                                            inputProps={{autoComplete:'off'}}
                                            variant="outlined"
                                            label="Portofoliu"
                                            name="portfolio"
                                            value={state.portfolio}
                                            onChange={handleInputChange}
                                        />
                                    </Grid>
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
                </div>
    );
}

export default PersonalDataForm;