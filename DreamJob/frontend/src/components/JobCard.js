import * as React from 'react';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import FavoriteIcon from '@mui/icons-material/Favorite';
import Button from "@mui/material/Button";
import Grid from "@mui/material/Grid";
import {useHistory} from "react-router-dom";
import * as UserService from '../services/UserServices';
import {ClickAwayListener, DialogContent} from "@mui/material";
import Dialog from "@mui/material/Dialog";
import AddApplicationForm from "./AddApplicationForm";

function JobCard(props){

    const history=useHistory();

    const options = { year: 'numeric', month: 'long', day: 'numeric' };

    const [open, setOpen] = React.useState(false);

    const handleClickView = (e)=>{
        e.stopPropagation();
        console.log("VIEW");
        history.push('/job?id='+props.jobId);
    }

    const handleClickFavorite = (e)=>{
        e.stopPropagation();
        UserService.addJobToFavorites({jobId: props.jobId})
            .then(result=>{
                if(props.parentState && props.setParentState) {
                    props.setParentState({
                        ...props.parentState,
                        favorites: [...props.parentState.favorites, props.jobId]
                        //favorites: [...props.parentState.favorites.filter((favorite)=> favorite!==props.jobId)]
                    })
                }
            })
            .catch(err=>{

            })

    }

    const handleClickRemoveFavorite = (e)=>{
        e.stopPropagation();
        UserService.removeJobFromFavorites({jobId: props.jobId})
            .then(result=>{
                if(props.parentState && props.setParentState){
                    props.setParentState({
                        ...props.parentState,
                        favorites: [...props.parentState.favorites.filter(favorite=> favorite!==props.jobId )]
                    })
                }

                if(props.favoritesJob && props.setFavoritesJob){
                    props.setFavoritesJob({
                        ...props.favoritesJob,
                        favorites: [...props.favoritesJob.favorites.filter(favorite=> favorite._id!==props.jobId )]
                    })
                }
            })
            .catch(err=>{

            });
    }

    const handleClose = (e) => {
        setOpen(false);
    };

    const handleClickApplication = (e) =>{
        e.stopPropagation();
        setOpen(true);
    }

    const handleDialogClick = e => {
        e.stopPropagation();
    };

    return(
        <Card sx={{padding:3, "&:hover":{boxShadow: "1em 0 .9em #268991, -1em 0 .9em #268991", cursor: 'pointer' } }} onClick={handleClickView}>
            <CardContent>
                <Grid container>
                    {props.application===true ?
                        <Grid item xs={4}>

                        </Grid>
                        :
                        <Grid container item xs={4} justifyContent="flex-start">
                            {
                                sessionStorage.getItem("role") === "client" ?
                                    props.favorite===true ?
                                        <IconButton size="small" color="primary" onClick={handleClickRemoveFavorite} >
                                            <FavoriteIcon/>
                                        </IconButton>
                                        :
                                        <IconButton size="small" color="primary" onClick={handleClickFavorite} >
                                            <FavoriteBorderIcon/>
                                        </IconButton>
                                    :
                                    null
                            }
                        </Grid>
                    }
                    <Grid item xs={4}>

                    </Grid>
                    <Grid container item xs={4} justifyContent="flex-end">
                        <Typography gutterBottom variant="subtitle2" component="div" color="primary" textAlign="center" sx={{margin: 'auto'}}>
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
                    {
                        props.application === true ?
                            <Grid container item xs={4} justifyContent="flex-end">
                            </Grid>
                            :
                            <Grid container item xs={4} justifyContent="flex-end">
                                {
                                    sessionStorage.getItem("role")==="client" ?
                                        <Button variant="contained" size="large" sx={{textTransform:'none', m:"auto", bgcolor:"#268991"}} onClick={handleClickApplication}>Aplică</Button>
                                        :
                                        null
                                }
                            </Grid>
                    }

                </Grid>
            </CardContent>

            <Dialog
                open={open}
                onClick={handleDialogClick}
                onClose={handleClose}
                PaperProps={{
                    style: { borderRadius: "12px" }
                }}
            >
                <DialogContent sx={{padding:0}}>
                    <AddApplicationForm handleClose={handleClose} job={props.jobId}/>
                </DialogContent>
            </Dialog>
        </Card>
    );
}

export default JobCard;