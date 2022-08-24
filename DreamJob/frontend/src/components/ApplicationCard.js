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
import EditIcon from "@mui/icons-material/Edit";
import Avatar from "@mui/material/Avatar";
import Badge from "@mui/material/Badge";


function ApplicationCard(props){


    const history=useHistory();

    const options = { year: 'numeric', month: 'long', day: 'numeric' };


    const handleViewCv = ()=>{

        history.push({
            pathname:'/view/cv',
            state:{cv: props.cv}
        })
    }

    return(
        <Card sx={{ padding:3, "&:hover":{boxShadow: "1em 0 .9em #268991, -1em 0 .9em #268991", cursor: 'pointer' } }}>
            <CardContent>
                <Grid container>
                    <Grid container item xs={4} justifyContent="flex-start">
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
            <CardContent sx={{height:150, width:'90%'}}>
                <Badge
                    overlap="circular"
                    anchorOrigin={{ vertical: 'bottom', horizontal: 'right'}}
                    sx={{display:'flex', justifyContent:'center'}}
                >
                    <Avatar src={props.image} sx={{
                        height:"100px",
                        width:"100px"
                    }}/>
                </Badge>
            </CardContent>
            <CardContent sx={{height:80}}>
                <Typography gutterBottom variant="h5" component="div" color="primary" textAlign="center">
                    {props.firstName+ ' ' + props.lastName}
                </Typography>
            </CardContent>

            <CardContent>
                <Grid container>
                    <Grid container item xs={4} justifyContent="flex-start">
                        <Typography gutterBottom variant="subtitle1" component="div" color="primary" textAlign="center" sx={{margin: 'auto'}}>
                            {props.city}
                        </Typography>
                    </Grid>
                    <Grid item xs={4}>

                    </Grid>
                    <Grid container item xs={4} justifyContent="flex-end" sx={{marginTop:'-5%'}}>
                        <Button variant="contained" size="large" sx={{textTransform:'none', m:"auto", bgcolor:"#268991"}} onClick={handleViewCv}>CV</Button>
                    </Grid>

                </Grid>
            </CardContent>
        </Card>
    )

}

export default ApplicationCard;