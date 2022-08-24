import NavBar from "./components/navbar/NavBar";
import React from "react";
import {BrowserRouter as Router, Switch, Route} from "react-router-dom";
import HomeView from "./views/HomeView";
import RegisterUserView from "./views/RegisterUserView";
import RegisterBusinessView from "./views/RegisterBusinessView";

import { ThemeProvider, createTheme } from '@mui/material/styles';
import RegisterView from "./views/RegisterView";
import ForgotPasswordView from "./views/ForgotPasswordView";
import AccountConfirmationView from "./views/AccountConfirmationView";
import ResetPasswordView from "./views/ResetPasswordView";
import UploadView from "./views/UploadView";
import ProfileView from "./views/ProfileView";
import AccountSettingsView from "./views/AccountSettingsView";
import ClientNavBar from "./components/navbar/ClientNavBar";
import CvView from "./views/CvView";
import Build from "./views/Build";
import TestDraft from "./views/TestDraft";
import CreateJobView from "./views/CreateJobView";
import SeeJobsView from "./views/SeeJobsView";
import DisplayJobView from "./views/DisplayJobView";
import BusinessNavBar from "./components/navbar/BusinessNavBar";
import FavoritesJobView from "./views/FavoritesJobView";
import ChatView from "./views/ChatView";
import ConversationView from "./views/ConversationView";
import UserConversationView from "./views/UserConversationView";
import BusinessJobsView from "./views/BusinessJobsView";
import JobRecruitsView from "./views/JobRecruitsView";
import PdfView from "./views/PdfView";
import AddTestView from "./views/AddTestView";
import UserApplicationsView from "./views/UserApplicationsView";


const theme = createTheme({
    palette: {
        primary: {
            main: '#268991',
        },
    },
});

function App() {


  return (
      <Router>
          <ThemeProvider theme={theme}>
              {sessionStorage.getItem("role")==="client"? <ClientNavBar />: sessionStorage.getItem("role")==="business"? <BusinessNavBar/> : <NavBar/>}
                <div className="body">
                    <Switch>
                        <Route exact path = "/">
                            <HomeView/>
                        </Route>
                        <Route exact path = "/register/user">
                            <RegisterUserView/>
                        </Route>
                        <Route exact path ="/register/business">
                            <RegisterBusinessView/>
                        </Route>
                        <Route exact path ="/register">
                            <RegisterView/>
                        </Route>
                        <Route exact path ="/forgot-password">
                            <ForgotPasswordView/>
                        </Route>
                        <Route exact path ="/account">
                            <AccountConfirmationView/>
                        </Route>
                        <Route exact path ="/reset-password">
                            <ResetPasswordView/>
                        </Route>
                        <Route exact path ="/upload">
                            <UploadView/>
                        </Route>
                        <Route exact path ="/profile">
                            <ProfileView/>
                        </Route>
                        <Route exact path ="/account/settings">
                            {
                                sessionStorage.getItem("role")==='client' || sessionStorage.getItem("role") ==='business' ? <AccountSettingsView/> : <HomeView/>
                            }
                        </Route>
                        <Route exact path ="/cv">
                            <CvView/>
                        </Route>
                        <Route exact path ="/build">
                            <Build/>
                        </Route>
                        <Route exact path="/draft">
                            <TestDraft/>
                        </Route>
                        <Route exact path="/add-job">
                            {
                                sessionStorage.getItem("role")==='business' ? <CreateJobView/> : <HomeView/>
                            }
                        </Route>
                        <Route exact path="/jobs">
                            <SeeJobsView/>
                        </Route>
                        <Route exact path="/job">
                            <DisplayJobView/>
                        </Route>
                        <Route exact path="/favorites">
                            <FavoritesJobView/>
                        </Route>
                        <Route exact path="/chat">
                            <ChatView/>
                        </Route>
                        <Route exact path="/conversation">
                            <ConversationView/>
                        </Route>
                        <Route exact path="/conv">
                            <UserConversationView/>
                        </Route>
                        <Route exact path="/my-jobs">
                            <BusinessJobsView/>
                        </Route>
                        <Route exact path="/job/recruits">
                            <JobRecruitsView/>
                        </Route>
                        <Route exact path="/view/cv">
                            <PdfView/>
                        </Route>
                        <Route exact path="/add-test">
                            <AddTestView/>
                        </Route>
                        <Route exact path="/my-applications">
                            <UserApplicationsView/>
                        </Route>
                    </Switch>
                </div>
          </ThemeProvider>

      </Router>
  );
}

export default App;
