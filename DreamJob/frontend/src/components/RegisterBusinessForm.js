import React, {useState, useEffect} from 'react';
import TextField from '@mui/material/TextField';
import Grid from '@mui/material/Grid';
import InputAdornment from '@mui/material/InputAdornment';
import IconButton from '@mui/material/IconButton';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import OutlinedInput from '@mui/material/OutlinedInput';
import InputLabel from '@mui/material/InputLabel';
import FormControl from '@mui/material/FormControl';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DesktopDatePicker } from '@mui/x-date-pickers/DesktopDatePicker';
import Select from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';
import Button from '@mui/material/Button';
import FormHelperText from "@mui/material/FormHelperText";

import * as UserService from '../services/UserServices';
import * as UserServices from "../services/UserServices";
import {ClickAwayListener, DialogContent} from "@mui/material";
import AccountConfirmationForm from "./AccountConfirmationForm";
import Dialog from "@mui/material/Dialog";
import {useHistory} from "react-router-dom";

function RegisterBusinessForm(){

    const history = useHistory();

    const countryCodeList = [
        { label: 'RO', value:'Romania' },
        { label: 'BE', value:'Belgium' },
        { label: 'BG', value:'Bulgaria' },
        { label: 'CZ', value:'Czechia' },
        { label: 'DK', value:'Denmark' },
        { label: 'DE', value:'Germany' },
        { label: 'EE', value:'Estonia' },
        { label: 'IE', value:'Ireland' },
        { label: 'EL', value:'Greece' },
        { label: 'ES', value:'Spain' },
        { label: 'HR', value:'Croatia' },
        { label: 'IT', value:'Italy' },
        { label: 'CY', value:'Cyprus' },
        { label: 'LV', value:'Latvia' },
        { label: 'LT', value:'Lithuania' },
        { label: 'LU', value:'Luxembourg'},
        { label: 'HU', value: 'Hungary'},
        { label: 'MT', value: 'Malta'},
        { label: 'NL', value: 'Netherlands'},
        { label: 'AT', value: 'Austria'},
        { label: 'PL', value: 'Poland'},
        { label: 'PT', value: 'Portugal'},
        { label: 'SI', value: 'Slovenia'},
        { label: 'SK', value: 'Slovakia'},
        { label: 'FI', value: 'Finland'},
        { label: 'SE', value: 'Sweden'},
        { label: 'UK', value:'United Kingdom' },
        { label: 'TR', value:'Turkey' },
    ];

    const [open, setOpen] = React.useState(false);

    const [state,setState] = useState({
        countryCode:"Romania",
        registrationCode:"",
        commerceNumber:"",
        name:"",
        address:"",
        city:"",
        country:"",
        email:"",
        password:"",
        confirmationPassword:"",
        showPassword:false,
        errors:{
            countryCode:false,
            commerceNumber:false,
            registrationCode:false,
            name:false,
            address:false,
            city:false,
            country:false,
            email:false,
            password:false,
            confirmationPassword:false,
        },
        errorMessages:{
            countryCode:"",
            commerceNumber:"",
            registrationCode:"",
            name:"",
            address:"",
            city:"",
            country:"",
            email:"",
            password:"",
            confirmationPassword:"",
        }
    })

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

    const handleSubmit = (e) =>{
        e.preventDefault();

        let errorsUser={
            countryCode:false,
                commerceNumber:false,
                registrationCode:false,
                name:false,
                address:false,
                city:false,
                country:false,
                email:false,
                password:false,
                confirmationPassword:false,
        },
        errorMessagesUser={
            countryCode:"",
                commerceNumber:"",
                registrationCode:"",
                name:"",
                address:"",
                city:"",
                country:"",
                email:"",
                password:"",
                confirmationPassword:"",
        }

        if(!(/^[a-zA-Z0-9.!#$%&'*+\/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$/).test(state.email)){
            errorsUser.email=true;
            errorMessagesUser.email="Email-ul nu este valid!";
        }

        if(state.password.length < 6){
            errorsUser.password=true;
            errorMessagesUser.password= "Parola trebuie sa contina minim 6 caractere!";
        }

        if(!state.password === state.passwordConfirmation){
            errorsUser.passwordConfirmation=true;
            errorMessagesUser.passwordConfirmation="Parolele nu corespund!";
        }

        if(!(/^(?=.{1,40}$)[a-zA-Z]+(?:[-'\s][a-zA-Z]+)*$/).test(state.city)){
            errorsUser.city= true;
            errorMessagesUser.city = "Orasul nu este valid!";
        }

        if(!(/^(?=.{1,40}$)[a-zA-Z]+(?:[-'\s][a-zA-Z]+)*$/).test(state.country)){
            errorsUser.country= true;
            errorMessagesUser.country = "Țara nu este validă!";
        }

        if(state.address.length < 10){
            errorsUser.address=true;
            errorMessagesUser.address= "Adresa trebuie sa contina minim 10 caractere!";
        }

        if(state.name.length < 3){
            errorsUser.name=true;
            errorMessagesUser.name= "Denumirea companiei trebuie sa contina minim 3 caractere!";
        }

        if(state.commerceNumber.length < 5){
            errorsUser.commerceNumber=true;
            errorMessagesUser.commerceNumber= "Numărul de ordin de la Registrul Comerțului nu este valid";
        }

        if(state.registrationCode.length < 5){
            errorsUser.registrationCode=true;
            errorMessagesUser.registrationCode= "Codul unic de inregistrare nu este valid";
        }


        setState({
            ...state,
            errors: errorsUser,
            errorMessages: errorMessagesUser
        })

        if(!Object.values(errorsUser).includes(true)){
            const {errors,errorMessages,showPassword, ...business} = state;
            business.avatar="";
            UserServices.registerBusiness(business)
                .then((result)=>{
                    if(result.status===201){
                        setOpen(true);
                        setTimeout(function(){
                                setOpen(false);
                                history.push("/");
                            },3000
                        )
                    }
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
                <Grid container item spacing={1} alignItems="center" justifyContent="center">
                    <Grid item xs={1.9} >
                        <Select
                            labelId="country-label"
                            id="simple-country-label"
                            name="countryCode"
                            value={state.countryCode}
                            label=""
                            onChange={handleInputChange}
                            MenuProps={{
                                style: {
                                    maxHeight: 200,
                                },
                            }}
                        >
                            {
                                countryCodeList.map(
                                    item => (
                                        <MenuItem value={item.value}>{item.label}</MenuItem>
                                    )
                                )
                            }
                        </Select>
                    </Grid>
                    <Grid item xs={5.9}>
                        <TextField
                            error={state.errors.registrationCode}
                            inputProps={{autoComplete:'off'}}
                            variant="outlined"
                            label="Cod Unic de Înregistrare"
                            name="registrationCode"
                            value={state.registrationCode}
                            helperText={state.errors.registrationCode===true? state.errorMessages.registrationCode: ""}
                            onChange={handleInputChange}
                        />
                    </Grid>

                </Grid>
                <Grid item xs={8}>
                    <TextField
                        error={state.errors.commerceNumber}
                        inputProps={{autoComplete:'off'}}
                        variant="outlined"
                        label="Număr de ordine la Registrul Comerțului"
                        name="commerceNumber"
                        value={state.commerceNumber}
                        helperText={state.errors.commerceNumber===true? state.errorMessages.commerceNumber: ""}
                        onChange={handleInputChange}
                    />
                    <TextField
                        error={state.errors.name}
                        inputProps={{autoComplete:'off'}}
                        variant="outlined"
                        label="Numele companiei"
                        placeholder="Numele companiei"
                        name="name"
                        value={state.name}
                        helperText={state.errors.name===true? state.errorMessages.name: ""}
                        onChange={handleInputChange}
                    />

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
                    <TextField
                        error={state.errors.passwordConfirmation}
                        inputProps={{autoComplete:'off'}}
                        variant="outlined"
                        type={state.showPassword ? 'text' : 'password'}
                        label="Confirmare parolă"
                        name="passwordConfirmation"
                        value={state.passwordConfirmation}
                        helperText={state.errors.passwordConfirmation===true? state.errorMessages.passwordConfirmation: ""}
                        onChange={handleInputChange}
                    />
                    <TextField
                        error={state.errors.country}
                        inputProps={{autoComplete:'off'}}
                        variant="outlined"
                        label="Țară"
                        name="country"
                        value={state.country}
                        helperText={state.errors.country===true? state.errorMessages.country: ""}
                        onChange={handleInputChange}
                    />

                    <TextField
                        error={state.errors.city}
                        inputProps={{autoComplete:'off'}}
                        variant="outlined"
                        label="Oraș"
                        name="city"
                        value={state.city}
                        helperText={state.errors.city===true? state.errorMessages.city: ""}
                        onChange={handleInputChange}

                    />

                    <TextField
                        error={state.errors.city}
                        inputProps={{autoComplete:'off'}}
                        variant="outlined"
                        label="Adresă"
                        name="address"
                        value={state.address}
                        helperText={state.errors.address===true? state.errorMessages.address: ""}
                        onChange={handleInputChange}

                    />
                </Grid>
            </Grid>
            <Grid container justify="center" mt="1rem">
                <Button variant="contained" size="large" sx={{textTransform:'none', m:"auto", bgcolor:"#268991"}} type="submit">Creează cont</Button>
            </Grid>
            <Dialog
                open={open}
                onClose={handleClose}
            >
                <ClickAwayListener onClickAway={handleClose}>
                    <DialogContent sx={{padding:0}}>
                        <AccountConfirmationForm/>
                    </DialogContent>
                </ClickAwayListener>
            </Dialog>
        </form>
    )

}

export default RegisterBusinessForm;
