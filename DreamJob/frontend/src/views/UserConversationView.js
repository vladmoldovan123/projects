import React, {useEffect, useRef, useState} from "react";
import './App.css';
import io from "socket.io-client";
import * as ChatService from '../services/ChatService';
import Grid from "@mui/material/Grid";
import TextField from "@mui/material/TextField";
import SendIcon from '@mui/icons-material/Send';
import IconButton from "@mui/material/IconButton";
import Divider from "@mui/material/Divider";
import Typography from "@mui/material/Typography";

let socket;
const CONNECTION_PORT = "wss://vlad-backend.herokuapp.com/";
// const CONNECTION_PORT = "http://localhost:8080";

function UserConversationView(props){

    const [message, setMessage] = useState("");
    const [messages,setMessages]=useState(props.chat.messages);

    const messagesEndRef = useRef(null)

    const scrollToBottom = () => {
        messagesEndRef.current?.scrollIntoView({ behavior: "auto" })
    }

    useEffect(()=>{

        setMessages(props.chat.messages);

    },[props.chat.messages])

    useEffect(() => {
        socket = io(CONNECTION_PORT);
    }, [CONNECTION_PORT]);

    useEffect(() => {
        socket.on("receive_message", (data) => {
            setMessages([...messages, data]);
        });
    });

    useEffect(()=>{
        socket.emit("join_room", props.chat._id);
        console.log("STATE: ",props.chat.messages);
    },[])

    useEffect(() => {
        scrollToBottom()
    }, [messages]);

    const handleInputChange = e => {
        setMessage(e.target.value);
    }

    const sendMessage = async () => {


        let messageContent = {
            room: props.chat._id,
            content: {
                author: sessionStorage.getItem("role")==="client" ?  props.chat.user : props.chat.business,
                message: message,
                read: false,
                timestamp: new Date().getTime()
            },
        };

        await socket.emit("send_message", messageContent);
        setMessages([...messages, messageContent.content]);
        setMessage("");
        ChatService.addMessage(messageContent)
            .then(result=>{
                // props.setParentState({
                //     ...props.parentState,
                //     conversations: props.parentState.conversations[props.selected].messages.push(messageContent)
                // })
            })
            .catch(err=>{
                console.log("ERR: ",err);
            })

    };

    return(<Grid >

                <Typography variant="h6" component="div" gutterBottom align='left' color='#268991' fontSize='1.5rem' sx={{marginLeft:"1%"}}>
                    {sessionStorage.getItem("role")==='client'? props.chat.business.name : props.chat.user.firstName+ " "+props.chat.user.lastName }
                </Typography>

                <Divider sx={{marginTop:"-1%", marginLeft:"1%", borderColor: '#268991', borderWidth:"medium", bgcolor:'#268991'}} />
                <Grid sx={{height:500, overflowY:"scroll"}}>
                    <Grid container sx={{marginLeft:2, maxHeight: '500px', width:"720px" }}>
                        {messages.map((val, key) => {
                            return (
                                <Grid item sx={{height:"50px"}}
                                      className="messageContainer"
                                      id={ sessionStorage.getItem("role")==="client" ? (val.author === props.chat.user ? "You" : "Other") : (val.author === props.chat.business ? "You" : "Other")}
                                      ref={messagesEndRef}
                                >
                                        <div className="messageIndividual">
                                            {val.message}
                                        </div>
                                </Grid >
                            );
                        })}
                    </Grid>
                </Grid>
                <Divider sx={{marginTop:"1%",marginLeft:"1%", borderColor: '#268991', borderWidth:"medium", bgcolor:'#268991'}} />
                <Grid container sx={{paddingTop:'1%'}}>
                    <Grid item xs={11} sx={{m:"auto"}} >
                        <TextField
                            inputProps={{autoComplete:'off'}}
                            variant="outlined"
                            label="Mesaj"
                            name="message"
                            value={message}
                            onChange={handleInputChange}
                            sx={{m:"auto"}}
                        />
                    </Grid>
                    <Grid item xs={1} sx={{m:"auto"}}>
                        <IconButton size="large" onClick={sendMessage} color="primary" sx={{m:"auto"}}>
                            <SendIcon fontSize="inherit" />
                        </IconButton>
                    </Grid>
                </Grid>
        </Grid>
    )
}

export default UserConversationView;