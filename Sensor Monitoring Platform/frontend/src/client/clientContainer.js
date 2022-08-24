import React, {useState,useEffect} from 'react';
import {deviceTableHeader} from "./deviceTableHeader";
import ReactTable from "react-table-6";
import "react-table-6/react-table.css"
import * as deviceApi from "../device/api/deviceApi";
import LogoutIcon from '@mui/icons-material/Logout';
import Button from '@mui/material/Button';
import './clientContainer.css'
import AddLinkIcon from "@mui/icons-material/AddLink";
import { useHistory } from "react-router-dom";

function clientContainer(){
    const [state,setState] = useState({
        devicesList:[]
    })

    useEffect(()=>{
        fetchDevices();
    },[])


    const fetchDevices = () =>{
        deviceApi.getDevices((result,status,err) =>{
            if(result!==null && status === 200)
            {
                const newList = result.filter((item)=>  item.userEntity!==null && item.userEntity.id === sessionStorage.getItem("id") )
                setState({
                    ...state,
                    devicesList: newList
                })
            }
        })
    }

    const handleLogout = () =>{
        sessionStorage.removeItem("id");
        sessionStorage.removeItem("role");
    }

    return(
        <div>
            <Button className="historyButton" href ="/#/client/history" variant="outlined"  >
                History Consumption
            </Button>
            <ReactTable
                className="reactTable"
                defaultPageSize={10}
                data={state.devicesList}
                columns={deviceTableHeader}
            />
            <div>
                <Button className="logoutButton" href ="/#/login" variant="outlined" onClick={handleLogout} startIcon={<LogoutIcon />}>
                    Logout
                </Button>
            </div>
        </div>
    );
}

export default clientContainer;
