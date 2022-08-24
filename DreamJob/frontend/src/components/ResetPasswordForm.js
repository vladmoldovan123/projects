import React, {useState, useEffect} from 'react';
import Grid from '@mui/material/Grid';
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import * as AuthenticateServices from '../services/AuthenticateService';
import InputLabel from "@mui/material/InputLabel";
import OutlinedInput from "@mui/material/OutlinedInput";
import InputAdornment from "@mui/material/InputAdornment";
import IconButton from "@mui/material/IconButton";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import Visibility from "@mui/icons-material/Visibility";
import FormHelperText from "@mui/material/FormHelperText";
import FormControl from "@mui/material/FormControl";
import {ClickAwayListener, DialogContent} from "@mui/material";
import AccountConfirmationForm from "./AccountConfirmationForm";
import Dialog from "@mui/material/Dialog";
import PopUp from "./PopUp";
import { useHistory } from "react-router-dom";

function ResetPasswordForm(props){

    const history = useHistory();

    const [state,setState] = useState({
        password: '',
        showPassword: false,
        errors:{
            password:false
        },
        errorMessages:{
            email:''
        }
    });

    const [open, setOpen] = React.useState(false);

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

    const handleClose = () => {
        setOpen(false);
        history.push("/");
    };

    const handleClickShowPassword = () => {
        setState({
            ...state,
            showPassword: !state.showPassword,
        });
    };

    const handleMouseDownPassword = (event) => {
        event.preventDefault();
    };

    const handleSubmit = (e)=>{
        e.preventDefault();

        let errorsUser={
            password:false
        }

        let errorMessagesUser={
            password:""
        }

        if(state.password.length < 6){
            errorsUser.password=true;
            errorMessagesUser.password= "Parola trebuie sa contina minim 6 caractere!";
        }

        // setState({
        //     ...state,
        //     errors: errorsUser,
        //     errorMessages: errorMessagesUser
        // })

        const data ={
            token: props.passwordToken,
            password: state.password
        }
        AuthenticateServices.resetPassword(data)
            .then(result=>{
                setOpen(true);
                setTimeout(function(){
                        setOpen(false);
                        history.push("/");
                    },2000
                )
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
                <Grid item xs={8}>
                    <FormControl sx={{ m: 1, width: '25ch' }} variant="outlined">
                        <InputLabel htmlFor="filled-adornment-password">Parolă</InputLabel>
                        <OutlinedInput
                            error={state.errors.password}
                            inputProps={{autoComplete:'off'}}
                            type={state.showPassword ? 'text' : 'password'}
                            name="password"
                            value={state.password}
                            // helperText={state.errors.password===true? state.errorMessages.password: ""}
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

                <Grid container justify="center" mt="1rem">
                    <Button variant="contained" size="large" sx={{textTransform:'none', m:"auto", bgcolor:"#268991"}} type="submit">Schimbă parola</Button>
                </Grid>

            </Grid>


            <Dialog
                open={open}
                onClose={handleClose}
            >
                <ClickAwayListener onClickAway={handleClose}>
                    <DialogContent sx={{padding:0}}>
                        <PopUp title="Parolă resetată cu succes" message="Acum te poți autentifica cu noua ta parolă."/>
                    </DialogContent>
                </ClickAwayListener>
            </Dialog>
        </form>
    );
}

export default ResetPasswordForm;