import React, {useState} from 'react';
import {domains, careersLevel, studiesLevel, jobsType} from '../utils/constants';
import Grid from "@mui/material/Grid";
import TextField from "@mui/material/TextField";
import InputLabel from "@mui/material/InputLabel";
import Select from "@mui/material/Select";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import {convertToRaw, EditorState} from "draft-js";
import {Editor} from "react-draft-wysiwyg";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import {convertToHTML} from "draft-convert";
import * as JobService from '../services/JobService';
import { useHistory } from "react-router-dom";

function CreateJobForm(){

    const history = useHistory();

    const [state,setState] = useState({
        jobTitle:'',
        location:'',
        careerLevel:'',
        jobType:'',
        studyLevel:'',
        domain:'',
        errors:{
            jobTitle:false,
            location:false,
            careerLevel:false,
            jobType:false,
            studyLevel:false,
            domain:false,
        },
        errorMessages:{
            jobTitle:'',
            location:'',
            careerLevel:'',
            jobType:'',
            studyLevel:'',
            domain:'',
        }


    })

    const wrapperStyle = {
        border: '1px solid #969696',
        bgcolor:'white'
    }
    const editorStyle = {
        height:'20rem',
        padding:'1rem',
        bgcolor:'white'
    }

    const [editorState, setEditorState] = useState(() =>
        EditorState.createEmpty()
    );

    const updateTextDescription = async (state) => {

        await setEditorState(state);

        const data = convertToRaw(editorState.getCurrentContent());


    };

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

        const job = {
            jobTitle:state.jobTitle,
            location:state.location,
            careerLevel:state.careerLevel,
            jobType:state.jobType,
            studyLevel:state.studyLevel,
            domain:state.domain,
            date:new Date().getTime(),
            description: convertToHTML(editorState.getCurrentContent())
        }

        JobService.addJob(job)
            .then(result=>{
                history.push('/my-jobs')
            })
            .catch(err=>{
                console.log("Err: ",err);
            })
    }

    return(
        <form onSubmit={handleSubmit}>
            <Grid
                sx={(theme)=>({
                    '& .MuiFormControl-root':{
                        width:'95%',
                        margin:theme.spacing(1),
                    }
                })}
                container alignItems="center" justifyContent="center">
                <Grid item xs={5}>
                    <Typography variant="h6" component="div" gutterBottom align='center' color="#268991" fontSize='1.5rem' >
                        Detaliile jobului
                    </Typography>
                    <TextField
                        error={state.errors.jobTitle}
                        inputProps={{autoComplete:'off'}}
                        variant="outlined"
                        label="Titlul jobului"
                        name="jobTitle"
                        value={state.jobTitle}
                        helperText={state.errors.jobTitle===true? state.errorMessages.jobTitle: ""}
                        onChange={handleInputChange}
                    />
                    <TextField
                        error={state.errors.location}
                        inputProps={{autoComplete:'off'}}
                        variant="outlined"
                        label="Locație"
                        name="location"
                        value={state.location}
                        helperText={state.errors.location===true? state.errorMessages.location: ""}
                        onChange={handleInputChange}
                    />
                    <FormControl fullWidth>
                        <InputLabel id="domain-label">Domeniu</InputLabel>
                        <Select
                            labelId="domain-label"
                            id="simple-domain-label"
                            name="domain"
                            value={state.domain}
                            label="Domeniu"
                            onChange={handleInputChange}
                            MenuProps={{
                                style: {
                                    maxHeight: 200,
                                },
                            }}
                        >
                            {
                                domains.map(
                                    item => (
                                        <MenuItem value={item}>{item}</MenuItem>
                                    )
                                )
                            }
                        </Select>
                    </FormControl>
                    <FormControl fullWidth>
                        <InputLabel id="career-level-label">Nivel carieră</InputLabel>
                        <Select
                            labelId="career-level-label"
                            id="simple-career-level-label"
                            name="careerLevel"
                            value={state.careerLevel}
                            label="Nivel carieră"
                            onChange={handleInputChange}
                            MenuProps={{
                                style: {
                                    maxHeight: 200,
                                },
                            }}
                        >
                            {
                                careersLevel.map(
                                    item => (
                                        <MenuItem value={item}>{item}</MenuItem>
                                    )
                                )
                            }
                        </Select>
                    </FormControl>
                    <FormControl fullWidth>
                        <InputLabel id="job-type-label">Tipul jobului</InputLabel>
                        <Select
                            labelId="job-type-label"
                            id="simple-job-type-label"
                            name="jobType"
                            value={state.jobType}
                            label="Tipul jobului"
                            onChange={handleInputChange}
                            MenuProps={{
                                style: {
                                    maxHeight: 200,
                                },
                            }}
                        >
                            {
                                jobsType.map(
                                    item => (
                                        <MenuItem value={item}>{item}</MenuItem>
                                    )
                                )
                            }
                        </Select>
                    </FormControl>
                    <FormControl fullWidth>
                        <InputLabel id="study-level-label">Studii</InputLabel>
                        <Select
                            labelId="study-level-label"
                            id="simple-study-level-label"
                            name="studyLevel"
                            value={state.studyLevel}
                            label="Studii"
                            onChange={handleInputChange}
                            MenuProps={{
                                style: {
                                    maxHeight: 200,
                                },
                            }}
                        >
                            {
                                studiesLevel.map(
                                    item => (
                                        <MenuItem value={item}>{item}</MenuItem>
                                    )
                                )
                            }
                        </Select>
                    </FormControl>
                </Grid>
                <Grid item xs={7}>
                    <Typography variant="h6" component="div" gutterBottom align='center' color="#268991" fontSize='1.5rem' >
                        Descrierea anunțului
                    </Typography>
                    <Editor

                        editorState={editorState}

                        wrapperStyle={wrapperStyle}
                        editorStyle={editorStyle}

                        onEditorStateChange={updateTextDescription}

                    />
                </Grid>
            </Grid>
            <Grid container justify="center" mt="1rem">
                <Button variant="contained" size="large" sx={{textTransform:'none', m:"auto", bgcolor:"#268991"}} onClick={handleSubmit}>ADAUGĂ</Button>
            </Grid>
        </form>
    );
}

export default CreateJobForm;