import React, {useState,useEffect} from 'react';
import NavigationBar from "../navigation-bar";
import ReactTable from "react-table-6";
import "react-table-6/react-table.css"
import {deviceTableHeader} from "./deviceTableHeader";
import * as deviceApi from './api/deviceApi';
import Button from '@mui/material/Button';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import AddIcon from '@mui/icons-material/Add';
import AddLinkIcon from '@mui/icons-material/AddLink';
import Stack from '@mui/material/Stack';
import {Modal, ModalBody, ModalHeader} from "reactstrap";
import DeviceForm from './DeviceForm';
import {sensorTableHeader} from "../sensor/sensorTableHeader";
import * as sensorApi from "../sensor/api/sensorApi";
import './deviceContainer.css';
import * as deviceValidation from './validators/deviceValidation'
import * as sensorValidation from "../sensor/validators/sensorValidation";


function deviceContainer(){

    const [state,setState]=useState({
        devicesList:[],
        selectedRow:'',
        selected:false,
        selectedEditDevice:false,
        deviceFormInput:{
            description:'',
            address:'',
            maximumEnergyConsumption:'',
            averageEnergyConsumption:''
        },
        deviceEditFormInput:{
            description:'',
            address:'',
            maximumEnergyConsumption:'',
            averageEnergyConsumption:''
        },
        selectedLinkSensor:false,
        sensorsList:[],
        selectedRowSensor:''
    })

    useEffect(()=>{
        fetchDevices();
    },[])

    useEffect(()=>{
        if(state.selected===false)
        {
            fetchDevices();
        }
    },[state.selected])

    useEffect(()=> {
        if (state.selectedEditDevice === false)
        {
            fetchDevices();
        }
    },[state.selectedEditDevice])

    useEffect(()=> {
        if (state.selectedLinkSensor === false)
        {
            fetchDevices();
        }
    },[state.selectedLinkSensor])

    const fetchDevices = () =>{
        deviceApi.getDevices((result,status,err) =>{
            if(result!==null && status === 200)
            {
                setState({
                    ...state,
                    devicesList: result
                })
            }
        })
    }

    const handleChangeDescription = e =>{
        setState({
            ...state,
            deviceFormInput:{
                ...state.deviceFormInput,
                description: e.target.value
            }
        });
    }

    const handleChangeMaxEnergy = e =>{
        setState({
            ...state,
            deviceFormInput:{
                ...state.deviceFormInput,
                maximumEnergyConsumption: e.target.value
            }
        });
    }

    const handleChangeAvgEnergy = e =>{
        setState({
            ...state,
            deviceFormInput:{
                ...state.deviceFormInput,
                averageEnergyConsumption: e.target.value
            }
        });
    }

    const handleChangeAddress = e =>{
        setState({
            ...state,
            deviceFormInput:{
                ...state.deviceFormInput,
                address: e.target.value
            }
        });
    }

    const toggleForm = ()=>{
        setState({
            ...state,
            selected:!state.selected
        });
    }

    const resetAddForm = () =>{
        setState({
            ...state,
            deviceFormInput:{
                description:'',
                address:'',
                maximumEnergyConsumption:'',
                averageEnergyConsumption:''
            }
        });
    }

    const handleSubmit = (e) => {
        e.preventDefault();

        if(!deviceValidation.checkDescription(state.deviceFormInput.description))
        {
            window.alert("Invalid description!");
            resetAddForm();
            return;
        }
        if(!deviceValidation.checkAddress(state.deviceFormInput.address))
        {
            window.alert("Invalid address!");
            resetAddForm();
            return;
        }
        if(!deviceValidation.checkValue(state.deviceFormInput.maximumEnergyConsumption))
        {
            window.alert("Invalid maximum energy!");
            resetAddForm();
            return;
        }
        if(!deviceValidation.checkValue(state.deviceFormInput.averageEnergyConsumption))
        {
            window.alert("Invalid average energy!");
            resetAddForm();
            return;
        }

        deviceApi.insertDevice(state.deviceFormInput,(result,status,err)=>{
            if(result!==null && status === 201)
            {
                setState({
                    ...state,
                    selected: !state.selected,
                    deviceFormInput: {
                        description:'',
                        address:'',
                        maximumEnergyConsumption:'',
                        averageEnergyConsumption:''
                    }
                })
            }
        })
    }

    const resetFormEdit = () =>{
        setState({
            ...state,
            selectedEditDevice: !state.selectedEditDevice,
            deviceFormInput: {
                description: state.devicesList[state.selectedRow].description,
                maximumEnergyConsumption: state.devicesList[state.selectedRow].maximumEnergyConsumption,
                averageEnergyConsumption: state.devicesList[state.selectedRow].averageEnergyConsumption,
                address: state.devicesList[state.selectedRow].address
            },
            deviceEditFormInput: {
                description: state.devicesList[state.selectedRow].description,
                maximumEnergyConsumption: state.devicesList[state.selectedRow].maximumEnergyConsumption,
                averageEnergyConsumption: state.devicesList[state.selectedRow].averageEnergyConsumption,
                address: state.devicesList[state.selectedRow].address
            },
            selectedRow:''
        })
    }

    const toggleFormEdit = ()=>{
        setState({
            ...state,
            selectedEditDevice: !state.selectedEditDevice,
            deviceFormInput: {
                description: state.devicesList[state.selectedRow].description,
                maximumEnergyConsumption: state.devicesList[state.selectedRow].maximumEnergyConsumption,
                averageEnergyConsumption: state.devicesList[state.selectedRow].averageEnergyConsumption,
                address: state.devicesList[state.selectedRow].address
            },
            deviceEditFormInput: {
                description: state.devicesList[state.selectedRow].description,
                maximumEnergyConsumption: state.devicesList[state.selectedRow].maximumEnergyConsumption,
                averageEnergyConsumption: state.devicesList[state.selectedRow].averageEnergyConsumption,
                address: state.devicesList[state.selectedRow].address
            },

        })
    }

    const handleEdit = () =>{
        if(state.selectedRow==="")
            return;
        toggleFormEdit();
    }

    const handleDelete = () =>{
        if(state.selectedRow==="")
            return;
        deviceApi.deleteDevice(state.devicesList[state.selectedRow].id,(result,status,err) =>{
            if(result!==null && status === 200)
            {
                fetchDevices();
            }
        })
    }

    const handleSubmitEdit = (e) =>{
        e.preventDefault();

        if(!deviceValidation.checkDescription(state.deviceFormInput.description))
        {
            window.alert("Invalid description!");
            setState({
                ...state,
                deviceFormInput: state.deviceEditFormInput
            });
            return;
        }
        if(!deviceValidation.checkAddress(state.deviceFormInput.address))
        {
            window.alert("Invalid address!");
            setState({
                ...state,
                deviceFormInput: state.deviceEditFormInput
            });
            return;
        }

        deviceApi.updateDevice(state.deviceFormInput,state.devicesList[state.selectedRow].id,(result,status,err) =>{
            if(result!==null && status === 200)
            {
                fetchDevices();
                resetFormEdit();
            }
        })
    }

    const toggleLinkSensor = () =>{

        if(state.devicesList[state.selectedRow].sensor!==null)
        {
            window.alert("Device-ul are deja un senzor!");
            return
        }

        sensorApi.getSensors((result,status,err) =>{
            if(result!==null && status === 200)
            {
                const newList = result.filter((item)=>  item.device ===null)
                setState({
                    ...state,
                    selectedLinkSensor:!state.selectedLinkSensor,
                    sensorsList: newList
                })
            }
        })
    }

    const handleLinkSensor = () =>{
        deviceApi.linkSensor(state.devicesList[state.selectedRow],state.sensorsList[state.selectedRowSensor].id,(result,status,err) =>{
            if(result!==null && status === 200)
            {
                fetchDevices();
                // resetFormEdit();
                setState({
                    ...state,
                    selectedLinkSensor:!state.selectedLinkSensor,
                    sensorsList: [],
                    selectedRowSensor: ""
                })
            }
        })
    };

    return(
        <div>
            <NavigationBar/>
            <div>
                <Stack  className="buttonStack" container alignItems="center" justifyContent="center" direction="row" spacing={1}>
                    <Button variant="outlined" onClick={toggleForm} startIcon={<AddIcon />}>
                        Add
                    </Button>
                    <Button variant="outlined" onClick={handleEdit} startIcon={<EditIcon />}>
                        Edit
                    </Button>
                    <Button variant="outlined" onClick={handleDelete} startIcon={<DeleteIcon />}>
                        Delete
                    </Button>
                    <Button variant="outlined" onClick={toggleLinkSensor} startIcon={<AddLinkIcon />}>
                        Link Sensor
                    </Button>
                </Stack>
            </div>
            <div>
                <ReactTable
                    className="reactTable"
                    defaultPageSize={10}
                    data={state.devicesList}
                    columns={deviceTableHeader}
                    getTrProps={(s, rowInfo) => {
                        if (rowInfo && rowInfo.row) {
                            return {
                                onClick: (e) => {
                                    setState({
                                        ...state,
                                        selectedRow:rowInfo.index
                                    });
                                },
                                style: {
                                    background: rowInfo.index === state.selectedRow ? '#00afec' : 'white',
                                    color: rowInfo.index === state.selectedRow ? 'white' : 'black'
                                }
                            }
                        }else{
                            return {}
                        }}}
                />
            </div>
            <Modal isOpen={state.selected} toggle={toggleForm}
                   size="lg">
                <ModalHeader toggle={toggleForm}> Add Device: </ModalHeader>
                <ModalBody>
                    <DeviceForm
                        handleSubmit={handleSubmit}
                        handleChangeDescription={handleChangeDescription}
                        handleChangeAvgEnergy={handleChangeAvgEnergy}
                        handleChangeMaxEnergy={handleChangeMaxEnergy}
                        handleChangeAddress={handleChangeAddress}
                        description={state.deviceFormInput.description}
                        maxEnergy={state.deviceFormInput.maximumEnergyConsumption}
                        avgEnergy={state.deviceFormInput.averageEnergyConsumption}
                        address={state.deviceFormInput.address}
                        buttonName={"Save"}>
                    </DeviceForm>
                </ModalBody>
            </Modal>
            <Modal isOpen={state.selectedEditDevice} toggle={toggleFormEdit}
                   size="lg">
                <ModalHeader toggle={toggleFormEdit}> Edit Device: </ModalHeader>
                <ModalBody>
                    <DeviceForm
                        handleSubmit={handleSubmitEdit}
                        handleChangeDescription={handleChangeDescription}
                        handleChangeAvgEnergy={handleChangeAvgEnergy}
                        handleChangeMaxEnergy={handleChangeMaxEnergy}
                        handleChangeAddress={handleChangeAddress}
                        description={state.deviceFormInput.description}
                        maxEnergy={state.deviceFormInput.maximumEnergyConsumption}
                        avgEnergy={state.deviceFormInput.averageEnergyConsumption}
                        address={state.deviceFormInput.address}
                        buttonName={"Save"}>
                    </DeviceForm>
                </ModalBody>
            </Modal>


            <Modal isOpen={state.selectedLinkSensor} toggle={toggleLinkSensor}
                   size="lg">
                <ModalHeader toggle={toggleLinkSensor}> Link Sensor: </ModalHeader>
                <ModalBody>
                    <div>
                        <ReactTable
                            className="reactTableDevice"
                            defaultPageSize={10}
                            data={state.sensorsList}
                            columns={sensorTableHeader}
                            getTrProps={(s, rowInfo) => {
                                if (rowInfo && rowInfo.row) {
                                    return {
                                        onClick: (e) => {
                                            setState({
                                                ...state,
                                                selectedRowSensor:rowInfo.index
                                            });
                                        },
                                        style: {
                                            background: rowInfo.index === state.selectedRowSensor ? '#00afec' : 'white',
                                            color: rowInfo.index === state.selectedRowSensor ? 'white' : 'black'
                                        }
                                    }
                                }else{
                                    return {}
                                }}}
                        />
                        <button className="saveButton" onClick={handleLinkSensor}>SAVE</button>
                    </div>
                </ModalBody>
            </Modal>
        </div>
    );
}

export default deviceContainer;