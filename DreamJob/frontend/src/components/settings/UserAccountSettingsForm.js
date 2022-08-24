import React, {useState, useEffect} from 'react';
import Grid from '@mui/material/Grid';
import IconButton from "@mui/material/IconButton";
import EditIcon from "@mui/icons-material/Edit";
import Avatar from "@mui/material/Avatar";
import Badge from "@mui/material/Badge";
import InputLabel from "@mui/material/InputLabel";
import FormControl from "@mui/material/FormControl";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import Select from "@mui/material/Select";
import MenuItem from "@mui/material/MenuItem";
import LoadingButton from '@mui/lab/LoadingButton';
import * as UploadService from '../../services/UploadService';
import {AdapterDateFns} from "@mui/x-date-pickers/AdapterDateFns";
import {DesktopDatePicker} from "@mui/x-date-pickers/DesktopDatePicker";
import {LocalizationProvider} from "@mui/x-date-pickers/LocalizationProvider";
import * as UserService from '../../services/UserServices';
import * as UserServices from "../../services/UserServices";
import {useHistory} from "react-router-dom";

function UserAccountSettingsForm(){

    const history = useHistory();

    const fileInput = React.useRef();

    const [loading, setLoading] = React.useState(false);

    const [state,setState]=useState({
        email:'',
        firstName:'',
        lastName:'',
        county:'',
        city:'',
        birthDate:'',
        gender:'',
        phone:'',
        errors:{
            email:false,
            firstName:false,
            lastName:false,
            county:false,
            city:false,
            birthDate:false,
            gender:false,
            phone:false,
        },
        errorMessages:{
            email:'',
            firstName:'',
            lastName:'',
            county:'',
            city:'',
            birthDate:'',
            gender:'',
            phone:'',
        },
        avatar:'',
        favorites:''
    })

    useEffect(()=>{
        UserService.getUser()
            .then(result=>{
                setState({
                    ...state,
                    email:result.data.email,
                    firstName:result.data.firstName,
                    lastName:result.data.lastName,
                    password:result.data.password,
                    county:result.data.county,
                    city:result.data.city,
                    birthDate: new Date(result.data.birthDate),
                    gender:result.data.gender,
                    phone:result.data.phone,
                    avatar:result.data.avatar,
                    favorites:result.data.favorites
                })
            })
            .catch(err=>{
                console.log("ERR: ",err);
            })
    },[])

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


    const handleSubmit = (e)=>{
        e.preventDefault();

        let errorsUser={
            firstName:false,
            lastName:false,
            email:false,
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
            const {errors,errorMessages, ...user} = state;
            user.birthDate= user.birthDate.getTime();
            UserServices.updateUser(user)
                .then((result)=>{
                    if(result.status===201){

                        sessionStorage.setItem("avatar",user.avatar)
                        history.push('/');
                        window.location.reload();

                    }
                })
        }
    }

    const handleChangeBirthDate = (newDate)=>{
        setState({
            ...state,
            birthDate: newDate
        })
    }
    const handleChangeFile = (e)=>{
        setLoading(true);
        UploadService.uploadFiles(e.target.files[0])
            .then(result=>{
                setState({
                    ...state,
                    avatar:result
                })
                setLoading(false);

            })
            .catch(err=>{
                console.log("Eroare: ",err);
            })
    }

    return (
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
                    <Badge
                        overlap="circular"
                        anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
                        badgeContent={
                            <div>
                                <IconButton size="small" sx={{ bgcolor:'rgba(255,255,255,0.2)', boxShadow:5,  "&:hover": {bgcolor: 'white'}}} onClick={()=>fileInput.current.click()}><EditIcon/> </IconButton>
                                <input
                                    ref={fileInput}
                                    type="file"
                                    accept="image/*"
                                    onChange={handleChangeFile}
                                    style={{display:'none'}}
                                />
                            </div>

                        }

                    >
                        <Avatar src={state.avatar} sx={{
                            height:"100px",
                            width:"100px"
                        }}/>
                    </Badge>
                </Grid>
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
                    <LocalizationProvider dateAdapter={AdapterDateFns}>
                        <DesktopDatePicker
                            label="Data nașterii"
                            inputFormat="dd/MM/yyyy"
                            value={state.birthDate}
                            onChange={handleChangeBirthDate}
                            renderInput={(params) => <TextField {...params} />}
                        />
                    </LocalizationProvider>
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
                <LoadingButton variant="contained" size="large" sx={{textTransform:'none', m:"auto", bgcolor:"#268991"}} loading={loading} disabled={loading} type="submit">Salvează</LoadingButton>
            </Grid>
        </form>
    )
}

export default UserAccountSettingsForm;