import {useHistory} from "react-router-dom";
import * as React from "react";
import * as UserService from "../services/UserServices";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Grid from "@mui/material/Grid";
import IconButton from "@mui/material/IconButton";
import FavoriteIcon from "@mui/icons-material/Favorite";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import Typography from "@mui/material/Typography";
import CardMedia from "@mui/material/CardMedia";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import {DialogContent} from "@mui/material";
import AddApplicationForm from "./AddApplicationForm";


function BusinessOwnJobCard(props){

    const history=useHistory();

    const options = { year: 'numeric', month: 'long', day: 'numeric' };


    const handleClickView = (e)=> {
        e.stopPropagation();
        history.push('/job?id=' + props.jobId);
    }

    const handleClickApplication = (e) =>{
        e.stopPropagation();
        history.push("/job/recruits?id="+props.jobId);
    }

    return(
        <Card sx={{ padding:3, "&:hover":{boxShadow: "1em 0 .9em #268991, -1em 0 .9em #268991", cursor: 'pointer' } }} onClick={handleClickView}>
            <CardContent>
                <Grid container>
                    <Grid container item xs={4}>

                    </Grid>
                    <Grid item xs={4}>

                    </Grid>
                    <Grid container item xs={4} justifyContent="flex-end">
                        <Typography gutterBottom variant="subtitle1" component="div" color="primary" textAlign="center" sx={{margin: 'auto'}}>
                            {new Date(props.date).toLocaleDateString('ro-RO',options)}
                        </Typography>
                    </Grid>

                </Grid>
            </CardContent>
            <CardContent sx={{height:150, width:250, margin:'auto'}}>
                <CardMedia
                    component="img"
                    alt="green iguana"
                    src={props.image}
                    sx={{height: 'auto',
                        maxHeight: 150,
                        width: 'auto',
                        maxWidth: 250,
                        margin:'auto'
                    }}
                />
            </CardContent>
            <CardContent sx={{height:80}}>
                <Typography gutterBottom variant="h5" component="div" color="primary" textAlign="center">
                    {props.title}
                </Typography>
            </CardContent>

            <CardContent>
                <Grid container>
                    <Grid container item xs={4} justifyContent="flex-start">
                        <Typography gutterBottom variant="subtitle1" component="div" color="primary" textAlign="center" sx={{margin: 'auto'}}>
                            {props.location}
                        </Typography>
                    </Grid>
                    <Grid item xs={4}>

                    </Grid>
                    <Grid container item xs={4} justifyContent="flex-end">
                        <Button variant="contained" size="large" sx={{textTransform:'none', m:"auto", bgcolor:"#268991"}} onClick={handleClickApplication}>Aplicanți</Button>
                    </Grid>

                </Grid>
            </CardContent>
        </Card>
    );

}

export default BusinessOwnJobCard;