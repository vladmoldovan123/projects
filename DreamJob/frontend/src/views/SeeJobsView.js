import Grid from "@mui/material/Grid";
import JobCard from "../components/JobCard";
import React, {useEffect, useState} from 'react';
import * as JobService from '../services/JobService';
import CircularProgress from '@mui/material/CircularProgress';
import Box from "@mui/material/Box";

import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import Checkbox from '@mui/material/Checkbox';
import {careersLevel, domains, jobsType, studiesLevel} from '../utils/constants';
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import {InputLabel, OutlinedInput, Select} from "@mui/material";
import FormControl from "@mui/material/FormControl";
import MenuItem from "@mui/material/MenuItem";
import TextField from "@mui/material/TextField";
import * as UserService from '../services/UserServices';

const windowHeight = window.innerHeight - 69;
const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;
const MenuProps = {
    PaperProps: {
        style: {
            maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
            width: 250,
        },
    },
};

function SeeJobsView(){

    const [state,setState]=useState({
        jobs:null,
        favorites:[],
        search:""
    })

    useEffect(()=>{
        if(sessionStorage.getItem("role")==="client"){
            JobService.getJobs()
                .then(result=>{
                    UserService.getFavorites()
                        .then(r=>{
                            setState({
                                ...state,
                                jobs: result.data,
                                favorites: r.data
                            })
                        })
                        .catch(err=>{
                            console.log("ERR: ",err);
                        })
                })
                .catch(err=>{
                    console.log("ERR: ",err);
                })
        }
        else{
            JobService.getJobs()
                .then(result=>{
                    setState({
                        ...state,
                        jobs: result.data,
                    })
                })
                .catch(err=>{
                    console.log("ERR: ",err);
                })
        }
    },[])

    const [checkedCareerLevel, setCheckedCareerLevel] = React.useState([]);
    const [checkedStudiesLevel, setCheckedStudiesLevel] = React.useState([]);
    const [checkedJobType, setCheckedJobType] = React.useState([]);
    const [checkedDomains, setCheckedDomains] = React.useState([]);

    const handleToggleCareerLevel = (value) => () => {
        const currentIndex = checkedCareerLevel.indexOf(value);
        const newChecked = [...checkedCareerLevel];

        if (currentIndex === -1) {
            newChecked.push(value);
        } else {
            newChecked.splice(currentIndex, 1);
        }

        setCheckedCareerLevel(newChecked);

    };

    const handleToggleStudiesLevel = (value) => () => {
        const currentIndex = checkedStudiesLevel.indexOf(value);
        const newChecked = [...checkedStudiesLevel];

        if (currentIndex === -1) {
            newChecked.push(value);
        } else {
            newChecked.splice(currentIndex, 1);
        }

        setCheckedStudiesLevel(newChecked);
    };

    const handleToggleJobType = (value) => () => {
        const currentIndex = checkedJobType.indexOf(value);
        const newChecked = [...checkedJobType];

        if (currentIndex === -1) {
            newChecked.push(value);
        } else {
            newChecked.splice(currentIndex, 1);
        }

        setCheckedJobType(newChecked);
    };

    const handleToggleDomain = (event) => {
        const {
            target: { value },
        } = event;
        setCheckedDomains(
            // On autofill we get a stringified value.
            typeof value === 'string' ? value.split(',') : value,
        );
    };

    const resetFilters = ()=>{


        JobService.getJobs()
            .then(result=> {
                setState({
                    ...state,
                    jobs: result.data,
                    search: ""
                })
            })
            .catch(err=>{
                console.log("ERR: ",err);
            })

        setCheckedStudiesLevel([]);
        setCheckedDomains([]);
        setCheckedJobType([]);
        setCheckedCareerLevel([]);

    }

    const handleFilters = ()=>{

    }

    const handleSearch = ()=>{

        let careerLevelFilters= checkedCareerLevel.map(element=>careersLevel[element]);
        let studiesFilters = checkedStudiesLevel.map(element=>studiesLevel[element]);
        let jobTypesFilters = checkedJobType.map(element=>jobsType[element])

        const filters = {
            careerLevelFilters: careerLevelFilters,
            studiesFilters: studiesFilters,
            jobTypesFilters: jobTypesFilters,
            domainsFilters: checkedDomains,
            search: state.search
        }

        JobService.getJobsByFilters(filters)
            .then(result=>{
                console.log("RESULT: ",result.data);
                setState({
                    ...state,
                    jobs: result.data
                })
            })
            .catch(err=>{
                console.log("ERR: ",err);
            })

    }

    const handleInputChange = e => {
        const {name, value } = e.target;
        setState({
            ...state,
            [name]: value,
        })
    }

    return(
        <Grid container sx={{paddingTop: '3%',bgcolor:'#78adb4', paddingBottom:'3%'}} >
                <Grid item container sx={{marginBottom:8}} justifyContent="center">
                        <Grid item sx={{bgcolor:'#FFFFFF', padding:2, alignItems:"center" , display:'flex', borderRadius:6, border:5, borderColor: '#268991'}} >
                            <TextField
                                inputProps={{bgcolor:'#FFFFFF'}}
                                variant="outlined"
                                label="Titlul anunțului"
                                name="search"
                                value={state.search}
                                sx={{width:400, marginRight:8, borderRadius:10}}
                                onChange={handleInputChange}
                            />
                            <Button variant="contained" size="large" sx={{textTransform:'none', bgcolor:"#268991"}} onClick={handleSearch}>
                                Filtrează
                            </Button>
                        </Grid>
                </Grid>
                <Grid container item xs={3} justifyContent="center">
                    <Box sx={{}}>
                        <Grid item >
                            <Grid container justify="center">
                                <Button variant="contained" size="large" sx={{textTransform:'none', m:"auto", bgcolor:"#268991"}} onClick={resetFilters}>Resetează filtrele</Button>
                            </Grid>
                        </Grid>
                        <Grid item sx={{height:'fit-content', marginBottom:8}}>
                            <Box
                                sx={
                                    (theme)=>({
                                        padding: theme.spacing(3),
                                        border: 5,
                                        m: 1,
                                        borderColor: '#268991',
                                        bgcolor:'#FFFFFF'
                                        // borderRadius:'16px'

                                    })}>
                                <Typography gutterBottom variant="h5" component="div" color="primary"  sx={{marginTop:'auto',marginBottom:'auto'}}>
                                    Nivel carieră
                                </Typography>
                                <List sx={{ width: '100%', maxWidth: 360 }}>
                                    {careersLevel.map((value,index) => {
                                        const labelId = `checkbox-list-label-${index}`;
                                        return (
                                            <ListItem
                                                key={index}
                                                disablePadding
                                            >
                                                <ListItemButton role={undefined} onClick={handleToggleCareerLevel(index)} dense>
                                                    <ListItemIcon>
                                                        <Checkbox
                                                            edge="start"
                                                            checked={checkedCareerLevel.indexOf(index) !== -1}
                                                            tabIndex={-1}
                                                            disableRipple
                                                            inputProps={{ 'aria-labelledby': labelId }}
                                                        />
                                                    </ListItemIcon>
                                                    <ListItemText id={labelId} primary={value} />
                                                </ListItemButton>
                                            </ListItem>
                                        );
                                    })}
                                </List>
                            </Box>
                        </Grid>
                        <Grid sx={{marginBottom:8}} >
                            <Box
                                sx={
                                    (theme)=>({
                                        padding: theme.spacing(3),
                                        border: 5,
                                        m: 1,
                                        borderColor: '#268991',
                                        bgcolor:'#FFFFFF'
                                        // borderRadius:'16px'

                                    })}>
                                <Typography gutterBottom variant="h5" component="div" color="primary"  sx={{marginTop:'auto',marginBottom:'auto'}}>
                                    Studii
                                </Typography>
                                <List sx={{ width: '100%', maxWidth: 360 }}>
                                    {studiesLevel.map((value,index) => {
                                        const labelId = `checkbox--studies-list-label-${index}`;
                                        return (
                                            <ListItem
                                                key={index}
                                                disablePadding
                                            >
                                                <ListItemButton role={undefined} onClick={handleToggleStudiesLevel(index)} dense>
                                                    <ListItemIcon>
                                                        <Checkbox
                                                            edge="start"
                                                            checked={checkedStudiesLevel.indexOf(index) !== -1}
                                                            tabIndex={-1}
                                                            disableRipple
                                                            inputProps={{ 'aria-labelledby': labelId }}
                                                        />
                                                    </ListItemIcon>
                                                    <ListItemText id={labelId} primary={value} />
                                                </ListItemButton>
                                            </ListItem>
                                        );
                                    })}
                                </List>
                            </Box>
                        </Grid>
                        <Grid sx={{marginBottom:8}} >
                            <Box
                                sx={
                                    (theme)=>({
                                        padding: theme.spacing(3),
                                        border: 5,
                                        m: 1,
                                        borderColor: '#268991',
                                        bgcolor:'#FFFFFF'
                                        // borderRadius:'16px'

                                    })}>
                                <Typography gutterBottom variant="h5" component="div" color="primary"  sx={{marginTop:'auto',marginBottom:'auto'}}>
                                    Tipul jobului
                                </Typography>
                                <List sx={{ width: '100%', maxWidth: 360 }}>
                                    {jobsType.map((value,index) => {
                                        const labelId = `checkbox-job-type-list-label-${index}`;
                                        return (
                                            <ListItem
                                                key={index}
                                                disablePadding
                                            >
                                                <ListItemButton role={undefined} onClick={handleToggleJobType(index)} dense>
                                                    <ListItemIcon>
                                                        <Checkbox
                                                            edge="start"
                                                            checked={checkedJobType.indexOf(index) !== -1}
                                                            tabIndex={-1}
                                                            disableRipple
                                                            inputProps={{ 'aria-labelledby': labelId }}
                                                        />
                                                    </ListItemIcon>
                                                    <ListItemText id={labelId} primary={value} />
                                                </ListItemButton>
                                            </ListItem>
                                        );
                                    })}
                                </List>
                            </Box>
                        </Grid>
                        <Grid sx={{marginBottom:8}}>
                            <Box
                                sx={
                                    (theme)=>({
                                        padding: theme.spacing(1),
                                        border: 5,
                                        m: 1,
                                        borderColor: '#268991',
                                        bgcolor:'#FFFFFF'
                                        // borderRadius:'16px'

                                    })}>
                                <FormControl sx={{ m: 1, width: 300 }}>
                                    <InputLabel id="demo-multiple-checkbox-label">Domenii</InputLabel>
                                    <Select
                                        labelId="demo-multiple-checkbox-label"
                                        label="Domenii"
                                        id="demo-multiple-checkbox"
                                        multiple
                                        value={checkedDomains}
                                        onChange={handleToggleDomain}
                                        input={<OutlinedInput label="Domenii" />}
                                        renderValue={(selected) => selected.join(', ')}
                                        MenuProps={MenuProps}
                                        sx={{bgcolor:'#FFFFFF'}}
                                    >
                                        {domains.map((name) => (
                                            <MenuItem key={name} value={name}>
                                                <Checkbox checked={checkedDomains.indexOf(name) > -1} />
                                                <ListItemText primary={name} />
                                            </MenuItem>
                                        ))}
                                    </Select>
                                </FormControl>
                            </Box>
                        </Grid>
                    </Box>
                </Grid>
                <Grid container item xs={9} spacing={2} sx={{paddingRight:'1%'}}>
                    {
                        state.jobs!==null ?
                            state.jobs.map(element=>{
                                if(state.favorites.includes(element._id))
                                {
                                    return <Grid item xs={4}>
                                        <JobCard parentState={state} setParentState={setState} image={element.avatar} location={element.location} title={element.jobTitle} date={element.date} jobId={element._id} favorite={true}/>
                                    </Grid>
                                }
                                else
                                {
                                    return <Grid item xs={4}>
                                        <JobCard parentState={state} setParentState={setState} image={element.avatar} location={element.location} title={element.jobTitle} date={element.date} jobId={element._id} favorite={false}/>
                                    </Grid>
                                }
                            })
                            :
                            <Box sx={{ marginLeft:'auto', marginRight:'auto'}}>
                                <CircularProgress size={200}/>
                            </Box>
                    }
                </Grid>

        </Grid>
    );
}

export default SeeJobsView;