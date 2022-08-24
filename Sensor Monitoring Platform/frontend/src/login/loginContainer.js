import React, {useState,useEffect} from 'react';

import './loginContainer.css';

import * as loginApi from './api/loginApi'
import * as API_USERS from "../person/api/person-api";
import { useHistory } from "react-router-dom";
import * as constants from'../commons/constants';

function loginContainer() {

    const history = useHistory();

    const [state , setState] = useState({
        username : "",
        password : "",
    })


    const handleChange = (e) => {
        const {id , value} = e.target
        setState(prevState => ({
            ...prevState,
            [id] : value
        }))
    }

    useEffect(()=>{
        sessionStorage.removeItem("id");
        sessionStorage.removeItem("role");
    },[])

    const handleSubmitClick =  (e) => {
        e.preventDefault();

    return  loginApi.doLogin(state,  (result, status, error) => {
        console.log("Status: ",status);
        console.log("Result: ",result);
            if(result===null)
            {
                setState({
                    ...state,
                    username: "",
                    password: ""
                });
                window.alert("Nume sau parola gresita!");
                console.log("state",state);
            }
            if (result !== null && (status === 200 || status === 201)) {
                sessionStorage.setItem("id", result.id);
                sessionStorage.setItem("role", result.role);
                if (result.role === constants.adminType)
                    history.push("/admin/user");
                if (result.role === constants.userType) {
                    history.push("/client");
                }
                // if(res)
            } else {
               if(result!==null)
               {
                   setState({
                       ...state,
                       username: "",
                       password: ""
                   });
                   window.alert("Nume sau parola gresita!");
                   console.log("state",state);
               }
            }

             setState({
                ...state,
                username: "",
                password: ""
            });
        });

    }
    return(
        <div className="loginContainer">
            <form>
                <div className="form-group text-left">
                    <label htmlFor="exampleInputEmail1">Username</label>
                    <input type="username"
                           className="form-control"
                           id="username"
                           // aria-describedby="emailHelp"
                           placeholder="Username"
                           value={state.username}
                           onChange={handleChange}
                    />
                </div>
                <div className="form-group text-left">
                    <label htmlFor="exampleInputPassword1">Password</label>
                    <input type="password"
                           className="form-control"
                           id="password"
                           placeholder="Password"
                           value={state.password}
                           onChange={handleChange}
                    />
                </div>
                <button
                    type="submit"
                    className="btn btn-primary submitButton"
                    onClick={handleSubmitClick}
                >Submit</button>
            </form>
        </div>
    )
}

export default loginContainer