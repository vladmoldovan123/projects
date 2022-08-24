import {
    Document,
    Page,
    Text,
    View,
    StyleSheet,
    PDFViewer,
    Image,
    Link
} from "@react-pdf/renderer";
import React, {useState, useEffect} from 'react';
import axios from "axios";
import * as Config from "../utils/Config";
import CircularProgress from '@mui/material/CircularProgress';
import Box from '@mui/material/Box';
import Grid from "@mui/material/Grid";
import AddressIcon from '../assets/images/location.png'
import GitHubIcon from '../assets/images/github.png'
import LinkedInIcon from '../assets/images/linkedin.png'
import EmailIcon from '../assets/images/email.png'
import WebIcon from '../assets/images/web.png'
import PhoneIcon from '../assets/images/phone.png'

// Create styles
const styles = StyleSheet.create({
    page: {
        backgroundColor: "white",
        color: "black",
    },
    section: {
        padding: 10,
        fontSize: 15
    },
    header:{
        marginHorizontal:10,
        color:'#268991',
        borderBottom:5,
        borderColor:'#268991'
    },
    subHeader:{
        marginTop: 10,
        marginBottom: 4,
        fontSize: 15,
        color: '#268991'
    },
    imageStyle:{

          border:5,
        borderColor:'#268991',
        borderTopLeftRadius: 10,
        borderTopRightRadius: 10,
        borderBottomLeftRadius: 10,
        borderBottomRightRadius: 10
    },
    personalDataStyle: {
          margin: 10,
          display: "flex",
          flexDirection:"row"
    },
    elementStyle:{
        display: "flex",
        flexDirection:"row"
    },
    viewer: {
        width: window.innerWidth,
        height: window.innerHeight,
    },
});

const windowHeight = window.innerHeight - 69;

// Create Document Component
function BasicDocument() {


    const [state,setState] = useState({
        aboutMe:'',
        education:[],
        experience:[],
        language:[],
        links:{},
        personalData:{}
    })

    useEffect(()=>{
        axios.get(Config.databaseUrl+'/user-info',{
            headers: {
                'Authorization': 'Bearer ' + sessionStorage.getItem("token")
            }
        })
            .then(result=>{
                console.log("RESULT: ",result);
                setState({
                    ...state,
                    aboutMe: result.data.aboutMe,
                    education: result.data.education,
                    experience: result.data.experience,
                    language: result.data.language,
                    links: result.data.links,
                    personalData: result.data.personalData

                })

            })
            .catch(err=>{
                console.log("Err: ",err);
            });
    },[])


    return (
        <div>
            {state.aboutMe !== '' ?
                <PDFViewer showToolbar={true} style={styles.viewer}>
                    {/* Start of the document*/}
                    <Document title={state.personalData.lastName+ " "+ state.personalData.firstName + " CV"}>
                        {/*render a single page*/}
                        <Page size="A4" style={styles.page}>
                            <View style={styles.personalDataStyle}>
                                <div style={styles.imageStyle}>
                                    <Image style={{ maxHeight:"170px", maxWidth:"150px"}} src={sessionStorage.getItem("avatar")} />
                                </div>
                                <View style={{marginLeft:"20px"}}>

                                    <Text style={{marginLeft:"100px", color: '#268991', fontSize:25}}>{state.personalData.firstName+" "+state.personalData.lastName}</Text>
                                    <View style={{display:"flex", flexDirection:"row"}}>
                                        <Image style={{ marginLeft:'4px',maxHeight:'20px', maxWidth:'20px', height:"20px", objectFit:"contain"}} src={AddressIcon}/>
                                        <Text style={{marginLeft:"15px"}}>{"Adresa: "+state.personalData.address}</Text>
                                    </View>
                                    <View style={{marginTop: "5px", display:"flex", flexDirection:"row"}}>
                                        <Image style={{ maxHeight:'20px', maxWidth:'20px', height:"20px", objectFit:"contain"}} src={EmailIcon}/>
                                        <Text style={{marginLeft:"10px"}}>{"Email: "+state.personalData.email}</Text>
                                    </View>
                                    <View style={{marginTop: "5px", display:"flex", flexDirection:"row"}}>
                                        <Image style={{ maxHeight:'20px', maxWidth:'20px', height:"20px", objectFit:"contain"}} src={PhoneIcon}/>
                                        <Text style={{marginLeft:"10px"}}>{"Telefon: "+state.personalData.phone}</Text>
                                    </View>
                                    <View style={{marginTop: "5px", display:"flex", flexDirection:"row"}}>
                                        <Image style={{ maxHeight:'20px', maxWidth:'20px', height:"20px", objectFit:"contain"}} src={GitHubIcon}/>
                                        <Text style={{marginLeft:"10px"}}>Github: </Text>
                                        <Link src={state.links.github}>{state.links.github}</Link>
                                    </View>
                                    <View style={{marginTop: "5px", display:"flex", flexDirection:"row"}}>
                                        <Image style={{ maxHeight:'20px', maxWidth:'20px', height:"20px", objectFit:"contain"}} src={LinkedInIcon}/>
                                        <Text style={{marginLeft:"10px"}}>LinkedIn: </Text>
                                        <Link src={state.links.linkedin}>{state.links.linkedin}</Link>
                                    </View>
                                    <View style={{ marginTop:"5px",display:"flex", flexDirection:"row"}}>
                                        <Image style={{ maxHeight:'20px', maxWidth:'20px', height:"20px", objectFit:"contain"}} src={WebIcon}/>
                                        <Text style={{marginLeft:"10px"}}>Portofoliu: </Text>
                                        <Link src={state.links.portfolio}>{state.links.portfolio}</Link>
                                    </View>
                                </View>
                            </View>

                            <View style={styles.header}>
                                <Text>Educatie</Text>
                            </View>
                            <View style={styles.section}>
                                {
                                    state.education.map(item=>
                                        <Text>{item.studyType + ", " + item.institution + ", " + item.specialisation+ ", "+ item.location+ ", [" + new Date(item.from).getFullYear()+"-" + new Date(item.to).getFullYear()+ "]"}</Text>
                                    )
                                }
                            </View>
                            <View style={styles.header}>
                                <Text>Experienta</Text>
                            </View>
                            <View style={styles.section}>
                                {
                                    state.experience.map(item=>
                                        <div>
                                            <Text style={styles.subHeader}>{item.jobTitle}</Text>
                                            <Text>{item.employerName + ", "+ item.location+ ", [" + new Date(item.from).getFullYear()+"-" + new Date(item.to).getFullYear()+ "]"}</Text>
                                            <Text>{item.description}</Text>
                                        </div>

                                    )
                                }
                            </View>
                            <View style={styles.header}>
                                <Text>Competente lingvistice</Text>
                            </View>
                            <View style={styles.section}>
                                {
                                    state.language.map(item=>
                                        <div>
                                            <Text>{item.language+": "+item.level}</Text>
                                        </div>

                                    )
                                }
                            </View>

                            <View style={styles.header}>
                                <Text>Despre mine</Text>
                            </View>
                            <View style={styles.section}>
                                <Text>{state.aboutMe}</Text>
                            </View>
                        </Page>
                    </Document>
                </PDFViewer>

                :
                <Grid container alignItems="center" justifyContent="center" sx={{
                    minHeight:windowHeight,
                    backgroundSize:'cover',
                    backgroundPosition: 'fixed',
                }}>
                    <Box sx={{ display: 'flex'}}>
                        <CircularProgress size={200}/>
                    </Box>
                </Grid>
            }
        </div>
    );
}
export default BasicDocument;