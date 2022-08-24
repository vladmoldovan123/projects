import React, {useState, useEffect} from 'react';
import * as UploadService from "../../services/UploadService";
import Grid from "@mui/material/Grid";
import Badge from "@mui/material/Badge";
import IconButton from "@mui/material/IconButton";
import EditIcon from "@mui/icons-material/Edit";
import Avatar from "@mui/material/Avatar";
import TextField from "@mui/material/TextField";
import LoadingButton from "@mui/lab/LoadingButton";
import * as UserService from "../../services/UserServices";
import * as UserServices from "../../services/UserServices";
import {useHistory} from "react-router-dom";


function BusinessAccountSettingsForm(){

    const history = useHistory();

    const fileInput = React.useRef();

    const [loading, setLoading] = React.useState(false);

    const [state,setState] = useState({
        email:'',
        name:'',
        address:'',
        city:'',
        errors:{
            email:false,
            name:false,
            address:false,
            city:false,
        },
        errorMessages:{
            email:'',
            name:'',
            address:'',
            city:'',
        },
        avatar:''
    })

    useEffect(()=>{
        UserService.getUser()
            .then(result=>{
                setState({
                    ...state,
                    email:result.data.email,
                    name:result.data.name,
                    city:result.data.city,
                    address: result.data.address,
                    avatar:result.data.avatar
                })
            })
            .catch(err=>{
                console.log("ERR: ",err);
            })
    },[])

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

    const handleSubmit = (e)=>{
        e.preventDefault();

        let errorsBusiness={
            email:false,
            name:false,
            address:false,
            city:false,
        }

        let errorMessagesBusiness={
            email:'',
            name:'',
            address:'',
            city:'',
        }

        if(!(/^(?=.{1,40}$)[a-zA-Z]+(?:[-'\s][a-zA-Z]+)*$/).test(state.city)){
            errorsBusiness.city= true;
            errorMessagesBusiness.city = "Orasul nu este valid!";
        }

        if(!(/^[a-zA-Z0-9.!#$%&'*+\/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$/).test(state.email)){
            errorsBusiness.email=true;
            errorMessagesBusiness.email="Email-ul nu este valid!";
        }

        if(state.address.length < 10){
            errorsBusiness.address=true;
            errorMessagesBusiness.address= "Adresa trebuie sa contina minim 10 caractere!";
        }

        if(state.name.length < 3){
            errorsBusiness.name=true;
            errorMessagesBusiness.name= "Denumirea companiei trebuie sa contina minim 3 caractere!";
        }


        if(!Object.values(errorsBusiness).includes(true)){
            const {errors,errorMessages, ...user} = state;
            UserServices.updateBusiness(user)
                .then((result)=>{
                    if(result.status===201){
                        sessionStorage.setItem("avatar",user.avatar)
                        history.push('/');
                        window.location.reload();
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
                        error={state.errors.name}
                        inputProps={{autoComplete:'off'}}
                        variant="outlined"
                        label="Denumire"
                        name="name"
                        value={state.name}
                        helperText={state.errors.name===true? state.errorMessages.name: ""}
                        onChange={handleInputChange}
                    />
                    <TextField
                        error={state.errors.address}
                        inputProps={{autoComplete:'off'}}
                        variant="outlined"
                        label="Adresă"
                        name="address"
                        value={state.address}
                        helperText={state.errors.address===true? state.errorMessages.address: ""}
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
                </Grid>
            </Grid>
            <Grid container justify="center" mt="1rem">
                <LoadingButton variant="contained" size="large" sx={{textTransform:'none', m:"auto", bgcolor:"#268991"}} loading={loading} disabled={loading} type="submit">Salvează</LoadingButton>
            </Grid>
        </form>
    );

}

export default BusinessAccountSettingsForm;