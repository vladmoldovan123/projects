import React, {useState, useEffect} from 'react';
import Grid from '@mui/material/Grid';
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import * as AuthenticateServices from '../services/AuthenticateService';
import {ClickAwayListener, DialogContent} from "@mui/material";
import PopUp from "./PopUp";
import Dialog from "@mui/material/Dialog";
import { useHistory } from "react-router-dom";

function ResetPasswordForm(){

    const [state,setState] = useState({
       email: '',
       errors:{
           email:false
       },
       errorMessages:{
           email:''
       }
    });

    const [open, setOpen] = React.useState(false);

    const history = useHistory();

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

    const handleSubmit = (e)=>{
        e.preventDefault();

        let errorsUser ={
            email:false
        }

        let errorMessagesUser = {
            email:''
        }

        if(!(/^[a-zA-Z0-9.!#$%&'*+\/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$/).test(state.email)){
            errorsUser.email=true;
            errorMessagesUser.email="Email-ul nu este valid!";
        }

        setState({
            ...state,
            errors: errorsUser,
            errorMessages: errorMessagesUser
        })

        if(!Object.values(errorsUser).includes(true)){
            const {errors,errorMessages,showPassword, ...user} = state;

           AuthenticateServices.resetPasswordEmail(state.email)
               .then(result=>{
                   setOpen(true);
                   setTimeout(function(){
                           setOpen(false);
                           history.push("/");
                       },2000
                   )
               })
               .catch(err=>{
                   console.log("ERR: ",err);
               })
        }


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
                </Grid>

                <Grid container justify="center" mt="1rem">
                    <Button variant="contained" size="large" sx={{textTransform:'none', m:"auto", bgcolor:"#268991"}} type="submit">Resetează parola</Button>
                </Grid>

            </Grid>

            <Dialog
                open={open}
                onClose={handleClose}
            >
                <ClickAwayListener onClickAway={handleClose}>
                    <DialogContent sx={{padding:0}}>
                        <PopUp title="Resetare parola" message="Vei primi un email pentru resetarea parolei!"/>
                    </DialogContent>
                </ClickAwayListener>
            </Dialog>
        </form>
    );
}

export default ResetPasswordForm;