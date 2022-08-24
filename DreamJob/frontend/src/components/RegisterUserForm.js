import React, {useState} from 'react';
import TextField from '@mui/material/TextField';
import Grid from '@mui/material/Grid';
import InputAdornment from '@mui/material/InputAdornment';
import IconButton from '@mui/material/IconButton';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import OutlinedInput from '@mui/material/OutlinedInput';
import InputLabel from '@mui/material/InputLabel';
import FormControl from '@mui/material/FormControl';
import {AdapterDateFns} from '@mui/x-date-pickers/AdapterDateFns';
import {LocalizationProvider} from '@mui/x-date-pickers/LocalizationProvider';
import {DesktopDatePicker} from '@mui/x-date-pickers/DesktopDatePicker';
import Select from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';
import Button from '@mui/material/Button';
import FormHelperText from '@mui/material/FormHelperText';
import * as UserServices from "../services/UserServices";
import {ClickAwayListener, DialogContent} from "@mui/material";
import AccountConfirmationForm from "./AccountConfirmationForm";
import Dialog from "@mui/material/Dialog";
import {useHistory} from "react-router-dom";

function RegisterUserForm(){

    const history = useHistory();

    const [state,setState] = useState({
        firstName:'',
        lastName:'',
        email:'',
        password:'',
        passwordConfirmation:'',
        county:'',
        city:'',
        birthDate:new Date(),
        gender:'male',
        phone:'',
        showPassword:false,
        errors:{
            firstName:false,
            lastName:false,
            email:false,
            password:false,
            passwordConfirmation:false,
            county:false,
            city:false,
            birthDate:false,
            gender:false,
            phone:false,
        },
        errorMessages:{
            firstName:'',
            lastName:'',
            email:'',
            password:'',
            passwordConfirmation:'',
            county:'',
            city:'',
            birthDate:'',
            gender:'',
            phone:'',
        }
    });

    const [open, setOpen] = React.useState(false);

    const genderList = [
        { label: 'Masculin', value:'male'},
        { label: 'Feminin', value:'female'},
        { label: 'Altul', value: 'other'}
    ];

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

    const handleChangeBirthDate = (newDate)=>{
        setState({
            ...state,
            birthDate: newDate
        })
    }

    const handleClose = () => {
        setOpen(false);
        history.push("/");
    };

    const handleSubmit = (e) =>{

        e.preventDefault();
        let errorsUser={
            firstName:false,
            lastName:false,
            email:false,
            password:false,
            passwordConfirmation:false,
            county:false,
            city:false,
            birthDate:false,
            gender:false,
            phone:false,
        }

        let errorMessagesUser={
            firstName:'',
            lastName:'',
            email:'',
            password:'',
            passwordConfirmation:'',
            county:'',
            city:'',
            birthDate:'',
            gender:'',
            phone:'',
        }
        if(!(/^(?=.{1,40}$)[a-zA-Z]+(?:[-'\s][a-zA-Z]+)*$/).test(state.firstName)){
            errorsUser.firstName= true;
            errorMessagesUser.firstName = "Prenumele nu este valid!";
        }

        if(!(/^(?=.{1,40}$)[a-zA-Z]+(?:[-'\s][a-zA-Z]+)*$/).test(state.lastName)){
            errorsUser.lastName=true;
            errorMessagesUser.lastName="Numele nu este valid!";
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

        if(!(/^(?=.{1,40}$)[a-zA-Z]+(?:[-'\s][a-zA-Z]+)*$/).test(state.county)){
            errorsUser.county = true;
            errorMessagesUser.county= "Judetul nu este valid!" ;
        }

        if(!(/^(?=.{1,40}$)[a-zA-Z]+(?:[-'\s][a-zA-Z]+)*$/).test(state.city)){
            errorsUser.city= true;
            errorMessagesUser.city = "Orasul nu este valid!";
        }

        if(state.phone.length!==10){
            errorsUser.phone=true;
            errorMessagesUser.phone="Numarul de telefon este incorect!";
        }

        if(state.birthDate===null){
            errorsUser.birthDate=true;
            errorMessagesUser.birthDate="Data nasterii nu este valida!";
        }

        setState({
            ...state,
            errors: errorsUser,
            errorMessages: errorMessagesUser
        })

        if(!Object.values(errorsUser).includes(true)){
            const {errors,errorMessages,showPassword, ...user} = state;
            user.birthDate= user.birthDate.getTime();
            user.avatar="";
            user.favorites=[];
            UserServices.registerUser(user)
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
            container>
              <Grid item xs={6}>
                  <TextField
                      error={state.errors.firstName}
                      inputProps={{autoComplete:'off'}}
                      variant="outlined"
                      label="Prenume"
                      name="firstName"
                      value={state.firstName}
                      helperText={state.errors.firstName===true? state.errorMessages.firstName: ""}
                      onChange={handleInputChange}
                  />
                  <TextField
                      error={state.errors.lastName}
                      inputProps={{autoComplete:'off'}}
                      variant="outlined"
                      label="Nume"
                      name="lastName"
                      value={state.lastName}
                      helperText={state.errors.lastName===true? state.errorMessages.lastName: ""}
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
              </Grid>

              <Grid item xs={6}>
                  <TextField
                      error={state.errors.county}
                      inputProps={{autoComplete:'off'}}
                      variant="outlined"
                      label="Județ"
                      name="county"
                      value={state.county}
                      helperText={state.errors.county===true? state.errorMessages.county: ""}
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

                  <LocalizationProvider dateAdapter={AdapterDateFns}>
                      <DesktopDatePicker
                          label="Data nașterii"
                          inputFormat="dd/MM/yyyy"
                          value={state.birthDate}
                          onChange={handleChangeBirthDate}
                          renderInput={(params) => <TextField {...params} />}
                      />
                  </LocalizationProvider>

                  <FormControl fullWidth>
                      <InputLabel id="gender-label">Gen</InputLabel>
                      <Select
                          labelId="gender-label"
                          id="simple-gender-label"
                          name="gender"
                          value={state.gender}
                          label="Gen"
                          onChange={handleInputChange}
                      >
                          {
                              genderList.map(
                                  item => (
                                        <MenuItem value={item.value}>{item.label}</MenuItem>
                                  )
                              )
                          }
                      </Select>
                  </FormControl>
                  <TextField
                      error={state.errors.phone}
                      inputProps={{autoComplete:'off'}}
                      variant="outlined"
                      label="Telefon"
                      name="phone"
                      value={state.phone}
                      helperText={state.errors.phone===true? state.errorMessages.phone: ""}
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
    );

}


export default RegisterUserForm;