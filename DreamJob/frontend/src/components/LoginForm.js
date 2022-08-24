import * as React from 'react';
import {useState} from 'react';
import TextField from "@mui/material/TextField";
import FormControl from "@mui/material/FormControl";
import InputLabel from "@mui/material/InputLabel";
import OutlinedInput from "@mui/material/OutlinedInput";
import InputAdornment from "@mui/material/InputAdornment";
import IconButton from "@mui/material/IconButton";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import Visibility from "@mui/icons-material/Visibility";
import FormHelperText from "@mui/material/FormHelperText";
import Box from "@mui/material/Box";
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import Button from "@mui/material/Button";
import Link from '@mui/material/Link';
import * as AuthenticateService from '../services/AuthenticateService';
import { useHistory } from "react-router-dom";

function LoginForm(props){

    const history = useHistory();

    const [state,setState]= useState({
        email:'',
        password:'',
        showPassword:false,
        errors:{
            email:false,
            password:false
        },
        errorMessages:{
            email:"",
            password:""
        }
    });

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

    const handleClickShowPassword = () => {
        setState({
            ...state,
            showPassword: !state.showPassword,
        });
    };

    const handleMouseDownPassword = (event) => {
        event.preventDefault();
    };

    const handleSubmit = (e) =>{
        e.preventDefault();


        const user = {
            email:state.email,
            password: state.password
        }

        AuthenticateService.doLogin(user)
            .then(result=>{
                if(result.status===200){
                    sessionStorage.setItem("token",result.data.token);
                    sessionStorage.setItem("role",result.data.role);
                    sessionStorage.setItem("avatar",result.data.avatar);
                    props.handleClose();
                    history.push("/");
                    window.location.reload();
                }
            })
            .catch(err=>{
                let errors = {
                    email:false,
                    password:false
                }
                let errorMessages={
                    email:"",
                    password:""
                }
                if(err.response.status===405){
                    console.log("405!");
                    errors.password=true;
                    errorMessages.password="Parola este gresită!";
                }
                else{
                    if(err.response.status===406){
                        errors.email=true;
                        errorMessages.email="Contul asociat cu adresa de email nu a fost confirmat!";
                    }
                    else{
                        if(err.response.status===402){
                            errors.email=true;
                            errorMessages.email="Nu există un cont asociat cu acest email!";
                        }
                    }
                }
                setState({
                    ...state,
                    errors: errors,
                    errorMessages: errorMessages
                });
            })

    }

    const handleLinkRegister = (e) =>{
        e.preventDefault();
        props.handleClose();
        history.push("/register");
    }

    const handleForgotPassword = (e)=>{
        e.preventDefault();
        props.handleClose();
        history.push("/forgot-password")
    }

    return(

        <form onSubmit={handleSubmit}>
        <Grid container alignItems="center" justifyContent="center" sx={{
        }}>
            <Box sx={
                (theme)=>({
                    padding: theme.spacing(3),
                    margin:0,
                    border: 10,
                    bgcolor:'rgba(239,237,237,1)',
                    borderColor: '#268991',

                })}>
                <Typography variant="h6" component="div" gutterBottom align='center' color="#268991" fontSize='2rem' >
                    Intră în contul tău
                </Typography>

                <Grid
                    sx={(theme)=>({
                        '& .MuiFormControl-root':{
                            width:'95%',
                            margin:theme.spacing(1),
                        }
                    })}
                    container alignItems="center" justifyContent="center">
                    <Grid item xs={8}>
                        <TextField
                            error={state.errors.email}
                            inputProps={{autoComplete:'off'}}
                            variant="outlined"
                            label="Email"
                            name="email"
                            value={state.email}
                            helperText={state.errors.email===true? state.errorMessages.email: ""}
                            onChange={handleInputChange}
                        />
                        <FormControl sx={{ m: 1, width: '25ch' }} variant="outlined">
                            <InputLabel htmlFor="filled-adornment-password">Parolă</InputLabel>
                            <OutlinedInput
                                error={state.errors.password}
                                inputProps={{autoComplete:'off'}}
                                type={state.showPassword ? 'text' : 'password'}
                                name="password"
                                value={state.password}
                                onChange={handleInputChange}
                                endAdornment={
                                    <InputAdornment position="end">
                                        <IconButton
                                            aria-label="toggle password visibility"
                                            onClick={handleClickShowPassword}
                                            onMouseDown={handleMouseDownPassword}
                                            edge="end"
                                        >
                                            {state.showPassword ? <VisibilityOff /> : <Visibility />}
                                        </IconButton>
                                    </InputAdornment>
                                }
                                label="Password"
                            />
                            {state.errors.password===true ? <FormHelperText error>
                                {state.errorMessages.password}
                            </FormHelperText> : <></>}
                        </FormControl>
                    </Grid>
                </Grid>

                <Grid container item spacing={20} alignItems="center" justifyContent="center">
                    <Grid  item justifyContent="flex-start">
                        <Link
                            component="button"
                            variant="body2"
                            underline="hover"
                            onClick={handleForgotPassword}
                        >
                            <Typography variant="subtitle1" component="div" gutterBottom align='right' color="#268991" >
                                Am uitat parola
                            </Typography>
                        </Link>
                    </Grid>
                    <Grid  item justifyContent="flex-end">
                        <Link
                            component="button"
                            variant="body2"
                            underline="hover"
                            onClick={handleLinkRegister}
                        >
                            <Typography variant="subtitle1" component="div" gutterBottom align='right' color="#268991"  >
                                Creează cont nou
                            </Typography>
                        </Link>
                    </Grid>
                </Grid>

                <Grid container justify="center" mt="1rem">
                    <Button variant="contained" size="large" sx={{textTransform:'none', m:"auto", bgcolor:"#268991"}} type="submit">Intră în cont</Button>
                </Grid>
            </Box>
        </Grid>
        </form>

    )
}

export default LoginForm;