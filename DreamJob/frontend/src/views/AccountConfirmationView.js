import React, {useEffect, useMemo, useState} from "react";
import {
    useHistory,
    useLocation
} from "react-router-dom";

import * as AuthenticateService from '../services/AuthenticateService';
import Box from "@mui/material/Box";
import CircularProgress from "@mui/material/CircularProgress";
import Grid from "@mui/material/Grid";

function AccountConfirmationView(){

    const history = useHistory();

    const { search } = useLocation();

    const [state,setState] = useState(false);

    const query = useMemo(() => new URLSearchParams(search), [search]);

    useEffect(()=>{
        AuthenticateService.verifyAccount(query.get("confirmationCode"))
            .then(()=>{
                setState(true);
                history.push("/")
            })
    },[])

    return(
        <>
            {
                state===false ?
                    <Grid sx={{width:"100%", height:"100%"}}>
                        <Box sx={{ m:'auto',justifyContent:'center', display:'flex'}}>
                            <CircularProgress size={200}/>
                        </Box>
                    </Grid>
                    :
                    <div></div>
            }
        </>
    )
}

export default AccountConfirmationView;