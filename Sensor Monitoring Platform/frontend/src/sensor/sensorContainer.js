import React, {useState,useEffect} from 'react';
import NavigationBar from "../navigation-bar";
import ReactTable from "react-table-6";
import "react-table-6/react-table.css"
import * as sensorApi from "./api/sensorApi";
import * as deviceApi from "../device/api/deviceApi";
import Stack from "@mui/material/Stack";
import Button from "@mui/material/Button";
import AddIcon from "@mui/icons-material/Add";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import {sensorTableHeader} from "./sensorTableHeader";
import {Modal, ModalBody, ModalHeader} from "reactstrap";
import SensorForm from './SensorForm';
import './sensorContainer.css';
import * as sensorValidation from './validators/sensorValidation'

function sensorContainer(){
    const [state,setState]=useState({
        sensorsList:[],
        selectedRow:'',
        selected:false,
        selectedEditSensor:false,
        sensorFormInput:{
            description:'',
            maximumValue:''
        },
        sensorEditFromInput:{
            description:'',
            maximumValue:''
        }
    });

    useEffect(()=>{
        fetchSensors();
    },[])

    useEffect(()=>{
        if(state.selected===false)
        {
            fetchSensors();
        }
    },[state.selected])

    useEffect(()=> {
        if (state.selectedEditSensor === false)
        {
            fetchSensors();
        }
    },[state.selectedEditSensor])

    const fetchSensors = () =>{
        sensorApi.getSensors((result,status,err) =>{

            if(result!==null && status === 200)
            {
                setState({
                    ...state,
                    sensorsList: result
                })
            }
        })
    }

    const handleChangeDescription = e =>{
        setState({
            ...state,
            sensorFormInput:{
                ...state.sensorFormInput,
                description: e.target.value
            }
        });
    }

    const handleChangeMaxValue = e =>{
        setState({
            ...state,
            sensorFormInput:{
                ...state.sensorFormInput,
                maximumValue: e.target.value
            }
        });
    }

    const resetAddForm = () =>{
        setState({
            ...state,
            sensorFormInput:{
                description:'',
                maximumValue:''
            }
        });
    }

    const handleSubmit = (e) =>{
        e.preventDefault();

        if(!sensorValidation.checkDescription(state.sensorFormInput.description))
        {
            window.alert("Invalid description!");
            resetAddForm();
            return;
        }
        if(!sensorValidation.checkValue(state.sensorFormInput.maximumValue))
        {
            window.alert("Invalid maximum value!");
            resetAddForm();
            return;
        }

        sensorApi.insertSensor(state.sensorFormInput,(result,status,err)=>{
            if(result!==null && status === 201)
            {
                setState({
                    ...state,
                    selected: !state.selected,
                    sensorFormInput: {
                        description:'',
                        maximumValue:'',
                    }
                })
            }
        })
    }

    const resetFormEdit = () =>{
        setState({
            ...state,
            selectedEditSensor:!state.selectedEditSensor,
            sensorFormInput:{
                description:state.sensorsList[state.selectedRow].description,
                maximumValue:state.sensorsList[state.selectedRow].maximumValue
            },
            sensorEditFromInput:{
                description:state.sensorsList[state.selectedRow].description,
                maximumValue:state.sensorsList[state.selectedRow].maximumValue
            },
            selectedRow:''
        });
    }

    const toggleForm = ()=>{
        setState({
            ...state,
            selected:!state.selected
        });
    }


    const toggleFormEdit = () =>{
        setState({
            ...state,
            selectedEditSensor:!state.selectedEditSensor,
            sensorFormInput:{
                description:state.sensorsList[state.selectedRow].description,
                maximumValue:state.sensorsList[state.selectedRow].maximumValue
            },
            sensorEditFromInput:{
                description:state.sensorsList[state.selectedRow].description,
                maximumValue:state.sensorsList[state.selectedRow].maximumValue
            }
        });
    }

    const handleSubmitEdit = (e) =>{
        e.preventDefault();

        if(!sensorValidation.checkDescription(state.sensorFormInput.description))
        {
            window.alert("Invalid description!");
            setState({
                ...state,
                sensorFormInput: state.sensorEditFromInput
            });
            return;
        }
        if(!sensorValidation.checkValue(state.sensorFormInput.maximumValue))
        {
            window.alert("Invalid maximum value!");
            setState({
                ...state,
                sensorFormInput: state.sensorEditFromInput
            });
            return;
        }

        sensorApi.updateSensor(state.sensorFormInput,state.sensorsList[state.selectedRow].id,(result,status,err) =>{
            if(result!==null && status === 200)
            {
                fetchSensors();
                resetFormEdit();
            }
        })
    }

    const handleEdit = () =>{
        if(state.selectedRow==="")
            return;
        toggleFormEdit();
    }

    const handleDelete = (e) =>{
        if(state.selectedRow==="")
            return;
        sensorApi.deleteSensor(state.sensorsList[state.selectedRow].id,(result,status,err) =>{
            if(result!==null && status === 200)
            {
                fetchSensors();
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
                </Stack>
            </div>

            <div>
                <ReactTable
                    className="reactTable"
                    defaultPageSize={10}
                    data={state.sensorsList}
                    columns={sensorTableHeader}
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
                <ModalHeader toggle={toggleForm}> Add Sensor: </ModalHeader>
                <ModalBody>
                    <SensorForm
                        handleSubmit={handleSubmit}
                        handleChangeDescription={handleChangeDescription}
                        handleChangeMaxValue={handleChangeMaxValue}
                        description={state.sensorFormInput.description}
                        maxValue={state.sensorFormInput.maximumValue}
                        buttonName={"Save"}>
                    </SensorForm>
                </ModalBody>
            </Modal>

            <Modal className="sensorModal" isOpen={state.selectedEditSensor} toggle={toggleFormEdit}
                   size="lg">
                <ModalHeader toggle={toggleFormEdit}> Edit Sensor: </ModalHeader>
                <ModalBody>
                    <SensorForm
                        handleSubmit={handleSubmitEdit}
                        handleChangeDescription={handleChangeDescription}
                        handleChangeMaxValue={handleChangeMaxValue}
                        description={state.sensorFormInput.description}
                        maxValue={state.sensorFormInput.maximumValue}
                        buttonName={"Save"}>
                    </SensorForm>
                </ModalBody>
            </Modal>

        </div>
    );

}

export default sensorContainer;