import React from 'react'
import ReactDOM from 'react-dom';
import {HashRouter, Route, Switch} from 'react-router-dom'
import NavigationBar from './navigation-bar'
import Home from './home/home';
import PersonContainer from './person/person-container'
import LoginContainer from './login/loginContainer'
import AdminContainer from './admin/adminContainer';
import UserContainer from './user/userContainer';
import DeviceContainer from './device/deviceContainer';
import SensorContainer from './sensor/sensorContainer';
import ClientContainer from './client/clientContainer';
import HistoryConsumptionContainer from './client/historyConsumptionContainer';
import * as constants from'./commons/constants';

import ErrorPage from './commons/errorhandling/error-page';
import styles from './commons/styles/project-style.css';

class App extends React.Component {

    render() {

        return (
            <div className={styles.back}>
            <HashRouter>
                <div>
                    <Switch>

                        <Route
                            exact
                            path='/'
                            render={() => <LoginContainer/>}
                        />
                        <Route
                            exact
                            path='/login'
                            render={()=> <LoginContainer/>}/>
                        <Route
                            exact
                            path='/admin/user'
                            render={()=> sessionStorage.getItem("role")===constants.adminType ? <UserContainer/>  : <ErrorPage/>}/>
                        <Route
                            exact
                            path='/admin/device'
                            render={()=>sessionStorage.getItem("role")===constants.adminType ? <DeviceContainer/> : <ErrorPage/>}/>
                        <Route
                            exact
                            path='/admin/sensor'
                            render={()=> sessionStorage.getItem("role")===constants.adminType ?<SensorContainer/> : <ErrorPage/>}/>
                        <Route
                            exact
                            path='/client'
                            render={()=> sessionStorage.getItem("role")===constants.userType ? <ClientContainer/> : <ErrorPage/>}/>
                        <Route
                            exact
                            path='/client/history'
                            render={()=> sessionStorage.getItem("role")===constants.userType ? <HistoryConsumptionContainer/> : <ErrorPage/>}/>

                        {/*Error*/}
                        <Route
                            exact
                            path='/error'
                            render={() => <ErrorPage/>}
                        />
                        <Route render={() =><ErrorPage/>} />
                    </Switch>
                </div>
            </HashRouter>
            </div>
        )
    };
}

export default App
