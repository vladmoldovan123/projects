
import React, {useState} from 'react';
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import {AdapterDateFns} from "@mui/x-date-pickers/AdapterDateFns";
import {DesktopDatePicker} from "@mui/x-date-pickers/DesktopDatePicker";
import {LocalizationProvider} from "@mui/x-date-pickers/LocalizationProvider";
import Typography from "@mui/material/Typography";
import Divider from "@mui/material/Divider";
import Button from "@mui/material/Button";
import axios from "axios";
import * as Config from "../../utils/Config";
import TextareaAutosize from "@mui/material/TextareaAutosize";


function AddExperienceForm(props){

    const [state,setState] = useState({
        jobTitle:'',
        employerName:'',
        location:'',
        from:new Date(),
        to:new Date(),
        description:''
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

    const handleChangeDateFrom = (newDate)=>{
        setState({
            ...state,
            from: newDate
        })
    }

    const handleChangeDateTo = (newDate)=>{
        setState({
            ...state,
            to: newDate
        })
    }

    const handleSubmit = (e)=>{
        e.preventDefault();

        let experience = props.experience;
        experience.push({
            jobTitle:state.jobTitle,
            employerName:state.employerName,
            location:state.location,
            from:state.from.getTime(),
            to:state.to.getTime(),
            description: state.description
        })
        const data={
            id: props.userInfoId,
            experience: experience
        }
        axios.put(Config.databaseUrl+'/user-info',data,{
            headers: {
                'Authorization': 'Bearer ' + sessionStorage.getItem("token")
            }
        })
            .then(()=>{
                props.handleClose();
            })
            .catch(err=>{
                console.log("Err: ",err);
            });
    }

    return(
        <form onSubmit={handleSubmit}>
            <Grid container alignItems="center" justifyContent="center">
                <Box sx={
                    (theme)=>({
                        padding: theme.spacing(3),
                        margin:0,
                        border: 10,
                        bgcolor:'rgba(239,237,237,1)',
                        borderColor: '#268991',

                    })}>

                    <Grid>
                        <Typography variant="h4" component="div" gutterBottom align='center' color="#268991" fontSize='2rem' sx={{marginLeft:"1%"}}>
                            Experiență profesională
                        </Typography>

                    </Grid>
                    <Divider sx={{marginBottom:"1%",marginLeft:"1%", borderColor: '#268991', borderWidth:"thins", bgcolor:'#268991'}} />
                    <Grid sx={(theme)=>({
                        '& .MuiFormControl-root':{
                            width:'95%',
                            margin:theme.spacing(1),
                        }
                    })}
                          container alignItems="center" justifyContent="center">

                        <Grid item  xs={9}>
                            <TextField
                                inputProps={{autoComplete:'off'}}
                                variant="outlined"
                                label="Titlul locului de muncă"
                                name="jobTitle"
                                value={state.jobTitle}
                                onChange={handleInputChange}
                            />
                            <TextField
                                inputProps={{autoComplete:'off'}}
                                variant="outlined"
                                label="Companie"
                                name="employerName"
                                value={state.employerName}
                                onChange={handleInputChange}
                            />
                            <TextField
                                inputProps={{autoComplete:'off'}}
                                variant="outlined"
                                label="Locație"
                                name="location"
                                value={state.location}
                                onChange={handleInputChange}
                            />
                            <LocalizationProvider dateAdapter={AdapterDateFns}>
                                <DesktopDatePicker
                                    label="Din"
                                    inputFormat="dd/MM/yyyy"
                                    value={state.from}
                                    onChange={handleChangeDateFrom}
                                    renderInput={(params) => <TextField {...params} />}
                                />
                            </LocalizationProvider>
                            <LocalizationProvider dateAdapter={AdapterDateFns}>
                                <DesktopDatePicker
                                    label="Pana"
                                    inputFormat="dd/MM/yyyy"
                                    value={state.to}
                                    onChange={handleChangeDateTo}
                                    renderInput={(params) => <TextField {...params} />}
                                />
                            </LocalizationProvider>

                        </Grid>
                        <TextareaAutosize
                            aria-label="minimum height"
                            minRows={10}
                            placeholder="Descrierea activității"
                            value={state.description}
                            name="description"
                            onChange={handleInputChange}
                            style={{ width: "100%" }}
                        />
                    </Grid>
                    <Grid container justify="center" mt="1rem">
                        <Button variant="contained" size="large" sx={{textTransform:'none', m:"auto", bgcolor:"#268991"}} type="submit">Salvează</Button>
                    </Grid>
                </Box>

            </Grid>
        </form>
    )
}

export default AddExperienceForm;