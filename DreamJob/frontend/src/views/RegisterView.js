import * as React from 'react';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import { CardActionArea } from '@mui/material';
import { useHistory } from "react-router-dom";
import Business from '../assets/images/business.jpg';
import Employee from '../assets/images/employee.jpg';
import Grid from '@mui/material/Grid';
import Background from '../assets/images/background.png'

const windowHeight = window.innerHeight - 69;

function RegisterView(){

    const history= useHistory();

    const handleRegisterUser = ()=>{
        history.push("/register/user");
    }

    const handleRegisterBusiness = () =>{
        history.push("/register/business");
    }

    return (

        <Grid container alignItems="center" justifyContent="center" sx={{
            minHeight:windowHeight,
            // backgroundSize:'cover',
            // backgroundPosition: 'fixed',
            // backgroundImage: `url(${Background})`
            bgcolor:'#78adb4'
        }}>
            <Grid container spacing={12} item alignItems="center" justifyContent="center">
                <Grid item>
                    <Card sx={{ maxWidth: 450}}>
                        <CardActionArea onClick={handleRegisterUser}>
                            <CardMedia
                                component="img"
                                height="250"
                                image={Employee}
                                alt="green iguana"
                            />
                            <CardContent>
                                <Typography gutterBottom variant="h5" component="div" align='center' color="#268991" textAlign="center">
                                    Candidat
                                </Typography>
                                <Typography variant="body2" color="text.secondary">
                                    Creează un cont nou de canditat pentru a putea vizualiza ofertele de muncă disponibile. Beneficiezi si de posibilitatea de a creea propriul tău CV.
                                </Typography>
                            </CardContent>
                        </CardActionArea>
                    </Card>
                </Grid>
                <Grid item>
                    <Card sx={{ maxWidth: 450}}>
                        <CardActionArea onClick={handleRegisterBusiness}>
                            <CardMedia
                                component="img"
                                height="250"
                                image={Business}
                                alt="green iguana"
                            />
                            <CardContent>
                                <Typography gutterBottom variant="h5" component="div" align='center' color="#268991" textAlign="center">
                                    Companie
                                </Typography>
                                <Typography variant="body2" color="text.secondary">
                                    Creează un cont nou pentru compania ta pentru a putea recruta angajații pe care ii doresti. Beneficiezi de posibilitatea de a creea propriul test pe care candidații il pot da.
                                </Typography>
                            </CardContent>
                        </CardActionArea>
                    </Card>
                </Grid>
            </Grid>
        </Grid>

    );


}

export default RegisterView;