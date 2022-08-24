import Background from "../assets/images/background.png";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import Divider from "@mui/material/Divider";
import * as React from "react";
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import ListItemAvatar from '@mui/material/ListItemAvatar';
import Avatar from '@mui/material/Avatar';
import Typography from '@mui/material/Typography';
import {useEffect, useState} from "react";
import * as ChatService from '../services/ChatService';
import ListItemButton from "@mui/material/ListItemButton";
import UserConversationView from "./UserConversationView";

const windowHeight = window.innerHeight - 69;

function ConversationView(){

    const [selected,setSelected]= useState(null);
    const [state,setState] = useState({
        conversations:[],
        selected:null
    })

    useEffect(()=>{

        if(sessionStorage.getItem("role")==="client"){
            ChatService.getConversations()
                .then(result=>{
                    setState({
                        ...state,
                        conversations: result.data
                    })
                })
                .catch(err=>{
                    console.log("ERR: ",err);
                })
        }
        else{
            ChatService.getBusinessConversations()
                .then(result=>{
                    setState({
                        ...state,
                        conversations: result.data
                    })
                })
                .catch(err=>{
                    console.log("ERR: ",err);
                })
        }

    },[])

    useEffect(()=>{

        if(sessionStorage.getItem("role")==="client"){
            ChatService.getConversations()
                .then(result=>{
                    setState({
                        ...state,
                        conversations: result.data
                    })
                })
                .catch(err=>{
                    console.log("ERR: ",err);
                })
        }
        else{
            ChatService.getBusinessConversations()
                .then(result=>{
                    setState({
                        ...state,
                        conversations: result.data
                    })
                })
                .catch(err=>{
                    console.log("ERR: ",err);
                })
        }

    },[selected])


    const handleConversation = (index)=>{
        // setState({
        //     ...state,
        //     selected: index
        // })
        setSelected(index);
    }

    return(
        <Grid container alignItems="center" justifyContent="center" sx={{
            minHeight:windowHeight,
            // backgroundSize:'cover',
            // backgroundPosition: 'fixed',
            // backgroundImage:`url(${Background})`
            bgcolor:'#78adb4'
        }}>
            <Box
                sx={
                    (theme) => ({
                        width: '75%',
                        padding: theme.spacing(3),
                        border: 10,
                        m: 1,
                        bgcolor: 'rgba(255,255,255,0.8)',
                        borderColor: '#268991',
                        borderRadius: '16px',
                        height:650
                    })}>
                <Grid
                    sx={(theme)=>({
                        '& .MuiFormControl-root':{
                            width:'95%',
                            margin:theme.spacing(1),
                        }
                    })}
                    container alignItems="center" justifyContent="center">

                    <Grid item xs={4} sx={{overflowY:'scroll'}}>

                        <List sx={{ height:650, width: '100%'}}>
                            {
                                state.conversations.map((element,index)=>{
                                    return <div>
                                        <ListItemButton alignItems="flex-start" onClick={()=>handleConversation(index)} selected={selected===index}>
                                            <ListItemAvatar>
                                                {sessionStorage.getItem("role")==='client'? <Avatar  src={element.business.avatar} /> : <Avatar  src={element.user.avatar} />}
                                            </ListItemAvatar>
                                            <ListItemText
                                                primary={sessionStorage.getItem("role")==='client'? element.business.name : element.user.firstName+ " "+element.user.lastName }
                                                sx={{textAlign:"left",marginTop:'auto',marginBottom:'auto', color:'#268991'}}

                                            />
                                        </ListItemButton>
                                        <Divider variant="inset" component="li" />
                                    </div>
                                })
                            }
                        </List>
                    </Grid>
                    <Divider orientation="vertical" variant='fullWidth' flexItem sx={{marginRight:"-1px", width:"0px", borderRightWidth:"thick", borderColor: '#268991'}} />
                    <Grid item container height="75%" alignItems="center" justifyContent="center" xs={7.9} width="100%">
                        {
                            selected !== null ?
                                <UserConversationView chat={state.conversations[selected]}  parentState={state} setParentState={setState} />
                                :
                                null
                        }
                    </Grid>
                </Grid>

            </Box>


        </Grid>
    )


}

export default ConversationView;