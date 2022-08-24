import React, {useState} from 'react';
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Divider from "@mui/material/Divider";
import Button from "@mui/material/Button";
import {languages, languageType} from "./constants";
import MenuItem from "@mui/material/MenuItem";
import Select from "@mui/material/Select";
import InputLabel from "@mui/material/InputLabel";
import FormControl from "@mui/material/FormControl";
import axios from "axios";
import * as Config from "../../utils/Config";


function AddLanguageForm(props){


    const [state,setState]=useState({
        language:'',
        level:''
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

    const handleSubmit =(e)=>{
        e.preventDefault();

        const element ={
            language: state.language,
            level: state.level

        }

        const languages = props.languages;
        languages.push(element);

        const data={
            id:props.userInfoId,
            language:languages
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
                           Adaugă competență lingvistică
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
                            <FormControl fullWidth>
                                <InputLabel id="language-label">Limbă</InputLabel>
                                <Select
                                    labelId="language-label"
                                    id="simple-language-label"
                                    name="language"
                                    value={state.language}
                                    label="Limbă"
                                    onChange={handleInputChange}
                                >
                                    {
                                        languages.map(
                                            item => (
                                                <MenuItem value={item.key}>{item.value}</MenuItem>
                                            )
                                        )
                                    }
                                </Select>
                            </FormControl>
                            <FormControl fullWidth>
                                <InputLabel id="level-label">Nivel</InputLabel>
                                <Select
                                    labelId="level-label"
                                    id="simple-level-label"
                                    name="level"
                                    value={state.level}
                                    label="Nivel"
                                    onChange={handleInputChange}
                                >
                                    {
                                        languageType.map(
                                            item => (
                                                <MenuItem value={item.key}>{item.value}</MenuItem>
                                            )
                                        )
                                    }
                                </Select>
                            </FormControl>
                        </Grid>

                    </Grid>
                    <Grid container justify="center" mt="1rem">
                        <Button variant="contained" size="large" sx={{textTransform:'none', m:"auto", bgcolor:"#268991"}} type="submit">Salvează</Button>
                    </Grid>
                </Box>

            </Grid>
        </form>
    )
}

export default AddLanguageForm;