import React, {useState} from 'react';
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import Typography from "@mui/material/Typography";
import Divider from "@mui/material/Divider";
import Button from "@mui/material/Button";
import {studies} from './constants' ;
import MenuItem from "@mui/material/MenuItem";
import Select from "@mui/material/Select";
import FormControl from '@mui/material/FormControl';
import InputLabel from '@mui/material/InputLabel';
import {LocalizationProvider} from "@mui/x-date-pickers/LocalizationProvider";
import {AdapterDateFns} from "@mui/x-date-pickers/AdapterDateFns";
import {DesktopDatePicker} from "@mui/x-date-pickers/DesktopDatePicker";
import axios from "axios";
import * as Config from "../../utils/Config";



function AddEducationForm(props){



    const [state,setState]= useState({
        studyType:'',
        institution:'',
        specialisation:'',
        location:'',
        from:new Date(),
        to:new Date()
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

        const element={
            studyType: state.studyType,
            institution: state.institution,
            specialisation: state.specialisation,
            location: state.location,
            from: state.from.getTime(),
            to: state.to.getTime()
        };

        let education = props.education;
        education.push(element);

        const data={
            id:props.userInfoId,
            education: education
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
                            Educație
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

                        <Grid item xs={12} >
                            <TextField
                                inputProps={{autoComplete:'off'}}
                                variant="outlined"
                                label="Numele instituției"
                                name="institution"
                                value={state.institution}
                                onChange={handleInputChange}
                            />
                            <FormControl sx={{minWidth:200}}>
                                <InputLabel id="studies-label">Tipul studiului</InputLabel>
                                <Select
                                    labelId="studies-label"
                                    id="simple-studies-label"
                                    name="studyType"
                                    value={state.studyType}
                                    label="Tipul studiului"
                                    onChange={handleInputChange}
                                >
                                    {
                                        studies.map(
                                            item => (
                                                <MenuItem value={item.key}>{item.value}</MenuItem>
                                            )
                                        )
                                    }
                                </Select>
                            </FormControl>
                            <TextField
                                inputProps={{autoComplete:'off'}}
                                variant="outlined"
                                label="Specializare"
                                name="specialisation"
                                value={state.specialisation}
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

                    </Grid>
                    <Grid container justify="center" mt="1rem">
                        <Button variant="contained" size="large" sx={{textTransform:'none', m:"auto", bgcolor:"#268991"}} type="submit">Salvează</Button>
                    </Grid>
                </Box>

            </Grid>
        </form>
    );

}

export default AddEducationForm;