
import {
    Document,
    StyleSheet,
    PDFViewer,

} from "@react-pdf/renderer";

import {useEffect, useState} from "react";
import { useLocation } from "react-router-dom";

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

function PdfView(){


    const location = useLocation();

    const[state,setState]=useState({
        cv:null
    })

    useEffect(() => {
        setState({
            ...state,
            cv:location.state.cv
        })
    }, [location]);

    return(
        <PDFViewer showToolbar={true} style={styles.viewer} src={state.cv}>
        </PDFViewer>
    )

}

export default PdfView