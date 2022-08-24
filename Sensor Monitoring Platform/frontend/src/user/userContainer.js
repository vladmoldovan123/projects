import React, {useState,useEffect} from 'react';
import NavigationBar from "../navigation-bar";
import ReactTable from "react-table-6";
import "react-table-6/react-table.css"
import {userTableHeader} from './userTableHeader'
import * as userApi from './api/userApi';
import './userContainer.css'
import UserForm from "./UserForm"
import * as userValidation from './validators/userValidation';
import Button from '@mui/material/Button';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import AddIcon from '@mui/icons-material/Add';
import Stack from '@mui/material/Stack';
import {
    Modal,
    ModalBody,
    ModalHeader,
} from 'reactstrap';
import AddLinkIcon from "@mui/icons-material/AddLink";
import {deviceTableHeader} from "../device/deviceTableHeader"
import * as deviceApi from '../device/api/deviceApi'

function userContainer(){

    const [state,setState] = useState({
        usersList:[],
        selected:false,
        selectedRow:'',
        selectedEditUser:false,
        userFormInputs:{
            name:'',
            username:'',
            password:'',
            email:'',
            address:'',
            birthdate:''
        },
        userEditFormInputs:{
            name:'',
            username:'',
            password:'',
            email:'',
            address:'',
            birthdate:''
        },
        selectedLinkDevice:false,
        devicesList:[],
        selectedRowDevice:''
    });

    useEffect(()=>{
        fetchUsers();
    },[])

    useEffect(()=> {
        if (state.selectedEditUser === false)
        {
            fetchUsers();
        }
    },[state.selectedEditUser])

    useEffect(()=>{
        if(state.selected===false)
        {
            fetchUsers();
        }
    },[state.selected])

    useEffect(()=> {
        if (state.selectedLinkDevice === false)
        {
            fetchUsers();
        }
    },[state.selectedLinkDevice])

    const fetchUsers= ()=>{
        userApi.getUsers((result,status,err) =>{
            if(result!==null && status === 200)
            {
                setState({
                    ...state,
                    usersList: result
                })
            }
        })
    }

    const toggleForm = ()=>{
        setState({
            ...state,
            selected:!state.selected
        });
    }

    const handleSubmit = (e) =>{
        e.preventDefault();

        if(!userValidation.checkName(state.userFormInputs.name))
        {
            window.alert("Invalid name!");
            resetAddForm();
            return;
        }
        if(!userValidation.checkUsername(state.userFormInputs.username))
        {
            window.alert("Invalid username!");
            resetAddForm();
            return;
        }
        if(!userValidation.checkPassword(state.userFormInputs.password))
        {
            window.alert("Invalid password!");
            resetAddForm();
            return;
        }
        if(!userValidation.checkEmail(state.userFormInputs.email))
        {
            window.alert("Invalid email!");
            resetAddForm();
            return;
        }
        if(!userValidation.checkAddress(state.userFormInputs.address))
        {
            window.alert("Invalid address!");
            resetAddForm();
            return;
        }

        userApi.insertUser(state.userFormInputs,(result,status,err) =>{
            if(result!==null && status === 201)
            {
                setState({
                    ...state,
                    selected:!state.selected,
                    userFormInputs:{
                        name:'',
                        username:'',
                        password:'',
                        email:'',
                        address:'',
                        birthdate:''
                    }
                });
            }
        })
    }

    const resetAddForm = () =>{
        setState({
            ...state,
            userFormInputs:{
                name:'',
                username:'',
                password:'',
                email:'',
                address:'',
                birthdate:''
            }
        });
    }

    const handleChangePassword = e =>{
        setState({
            ...state,
            userFormInputs:{
                ...state.userFormInputs,
                password: e.target.value
            }
        });
    }

    const handleChangeUsername = e=>{
        setState({
            ...state,
            userFormInputs:{
                ...state.userFormInputs,
                username: e.target.value
            }
        });
    }

    const handleChangeName = (e)=>{
        setState({
            ...state,
            userFormInputs:{
                ...state.userFormInputs,
                name: e.target.value
            }
        });
    }

    const handleChangeEmail = e =>{
        setState({
            ...state,
            userFormInputs:{
                ...state.userFormInputs,
                email: e.target.value
            }
        });
    }

    const handleChangeAddress = e =>{
        setState({
            ...state,
            userFormInputs:{
                ...state.userFormInputs,
                address: e.target.value
            }
        });
    }

    const handleChangeBirthdate = e =>{
        setState({
            ...state,
            userFormInputs:{
                ...state.userFormInputs,
                birthdate: e.target.value
            }
        });
    }

    const resetFormEdit = () =>{
        setState({
            ...state,
            selectedEditUser:!state.selectedEditUser,
            userFormInputs:{
                name:'',
                username:'',
                password:'',
                email:'',
                address:'',
                birthdate:''
            },
            userEditFormInputs:{
                name:'',
                username:'',
                password:'',
                email:'',
                address:'',
                birthdate:''
            },
            selectedRow: ''
        });
    }

    const handleSubmitEdit =  e =>{
        e.preventDefault();
        if(!userValidation.checkName(state.userFormInputs.name))
        {
            window.alert("Invalid name!");
            setState({
                ...state,
                userFormInputs: state.userEditFormInputs
            });
            return;
        }
        if(!userValidation.checkUsername(state.userFormInputs.username))
        {
            window.alert("Invalid username!");
            setState({
                ...state,
                userFormInputs: state.userEditFormInputs
            });
            return;
        }
        if(!userValidation.checkPassword(state.userFormInputs.password))
        {
            window.alert("Invalid password!");
            setState({
                ...state,
                userFormInputs: state.userEditFormInputs
            });
            return;
        }
        if(!userValidation.checkEmail(state.userFormInputs.email))
        {
            window.alert("Invalid email!");
            setState({
                ...state,
                userFormInputs: state.userEditFormInputs
            });
            return;
        }
        if(!userValidation.checkAddress(state.userFormInputs.address))
        {
            window.alert("Invalid address!");
            setState({
                ...state,
                userFormInputs: state.userEditFormInputs
            });
            return;
        }
        userApi.updateUser(state.userFormInputs,state.usersList[state.selectedRow].id,(result,status,err) =>{
            if(result!==null && status === 200)
            {
                fetchUsers();
                resetFormEdit();
            }
        })
    }

    const toggleFormEdit = ()=>{
        setState({
            ...state,
            selectedEditUser:!state.selectedEditUser,
            userFormInputs:{
                name:state.usersList[state.selectedRow].name,
                username:state.usersList[state.selectedRow].username,
                password:state.usersList[state.selectedRow].password,
                email:state.usersList[state.selectedRow].email,
                address:state.usersList[state.selectedRow].address,
                birthdate:state.usersList[state.selectedRow].birthdate
            },
            userEditFormInputs: {
                name:state.usersList[state.selectedRow].name,
                username:state.usersList[state.selectedRow].username,
                password:state.usersList[state.selectedRow].password,
                email:state.usersList[state.selectedRow].email,
                address:state.usersList[state.selectedRow].address,
                birthdate:state.usersList[state.selectedRow].birthdate
            }
        });
    }

    const handleEditUser = (e) =>{
        if(state.selectedRow==="")
            return;
        toggleFormEdit();
    }

    const handleDelete= (e) =>{
        if(state.selectedRow==="")
            return;
        userApi.deleteUser(state.usersList[state.selectedRow].id,(result,status,err) =>{
            if(result!==null && status === 200)
            {
                fetchUsers();
            }
        })
    }

    const toggleLinkDevice= () =>{

        deviceApi.getDevices((result,status,err) =>{
            if(result!==null && status === 200)
            {
                const newList = result.filter((item)=>  item.userEntity ===null)
                setState({
                    ...state,
                    selectedLinkDevice:!state.selectedLinkDevice,
                    devicesList: newList
                })
            }
        })
    }

    const handleLinkDevice = () =>{

        userApi.linkDevice(state.usersList[state.selectedRow],state.devicesList[state.selectedRowDevice].id,(result,status,err) =>{
            if(result!==null && status === 200)
            {
                fetchUsers();
                // resetFormEdit();
                setState({
                    ...state,
                    selectedLinkDevice:!state.selectedLinkDevice,
                    devicesList: [],
                    selectedRowDevice: ""
                })
            }
        })
    }



    return(
        <div>
            <NavigationBar/>
            <div>
                <Stack  className="buttonStack" container alignItems="center" justifyContent="center" direction="row" spacing={1}>
                    <Button variant="outlined" onClick={toggleForm} startIcon={<AddIcon />}>
                        Add
                    </Button>
                    <Button variant="outlined" onClick={handleEditUser} startIcon={<EditIcon />}>
                        Edit
                    </Button>
                    <Button variant="outlined" onClick={handleDelete} startIcon={<DeleteIcon />}>
                        Delete
                    </Button>
                    <Button variant="outlined" onClick={toggleLinkDevice} startIcon={<AddLinkIcon />}>
                        Link Sensor
                    </Button>

                </Stack>
            </div>
            <div>
                <ReactTable
                    className="reactTable"
                    defaultPageSize={10}
                    data={state.usersList}
                    columns={userTableHeader}
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
                <ModalHeader toggle={toggleForm}> Add User: </ModalHeader>
                <ModalBody>
                    <UserForm
                        handleSubmit={handleSubmit}
                        handleChangeName={handleChangeName}
                        handleChangeUsername={handleChangeUsername}
                        handleChangePassword={handleChangePassword}
                        handleChangeEmail={handleChangeEmail}
                        handleChangeAddress={handleChangeAddress}
                        handleChangeBirthdate={handleChangeBirthdate}
                        name={state.userFormInputs.name}
                        username={state.userFormInputs.username}
                        password={state.userFormInputs.password}
                        email={state.userFormInputs.email}
                        address={state.userFormInputs.address}
                        birthdate={state.userFormInputs.birthdate}
                        buttonName={"Register"}>
                    </UserForm>
                </ModalBody>
            </Modal>
            <Modal isOpen={state.selectedEditUser} toggle={toggleFormEdit}
                   size="lg">
                <ModalHeader toggle={toggleFormEdit}> Edit User: </ModalHeader>
                <ModalBody>
                    <UserForm
                        handleSubmit={handleSubmitEdit}
                        handleChangeName={handleChangeName}
                        handleChangeUsername={handleChangeUsername}
                        handleChangePassword={handleChangePassword}
                        handleChangeEmail={handleChangeEmail}
                        handleChangeAddress={handleChangeAddress}
                        handleChangeBirthdate={handleChangeBirthdate}
                        name={state.userFormInputs.name}
                        username={state.userFormInputs.username}
                        password={state.userFormInputs.password}
                        email={state.userFormInputs.email}
                        address={state.userFormInputs.address}
                        birthdate={state.userFormInputs.birthdate}
                        buttonName={"Save"}>
                    </UserForm>
                </ModalBody>
            </Modal>


            <Modal isOpen={state.selectedLinkDevice} toggle={toggleLinkDevice}
                   size="lg">
                <ModalHeader toggle={toggleLinkDevice}> Link Device: </ModalHeader>
                <ModalBody>
                    <div>
                        <ReactTable
                            className="reactTableDevice"
                            defaultPageSize={10}
                            data={state.devicesList}
                            columns={deviceTableHeader}
                            getTrProps={(s, rowInfo) => {
                                if (rowInfo && rowInfo.row) {
                                    return {
                                        onClick: (e) => {
                                            setState({
                                                ...state,
                                                selectedRowDevice:rowInfo.index
                                            });
                                        },
                                        style: {
                                            background: rowInfo.index === state.selectedRowDevice ? '#00afec' : 'white',
                                            color: rowInfo.index === state.selectedRowDevice ? 'white' : 'black'
                                        }
                                    }
                                }else{
                                    return {}
                                }}}
                        />
                        <button className="saveButton" onClick={handleLinkDevice}>SAVE</button>
                    </div>
                </ModalBody>
            </Modal>

        </div>
    )
}
export default userContainer;