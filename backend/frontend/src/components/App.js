import React, { Component, Fragment } from 'react';
import ReactDOM from 'react-dom';
import { HashRouter as Router, Route, Switch} from "react-router-dom";

import { Provider as AlertProvider} from 'react-alert';
import AlertTemplate from 'react-alert-template-basic';

import Header from './layout/Header';
import Dashboard from './students/Dashboard';
import Alerts from './layout/Alerts';
import Login from './accounts/Login';
import PrivateRoute from './common/PrivateRoute';

import { Provider } from 'react-redux';
import store from '../store';
import { loadUser } from '../actions/auth';
import Validate from "./accounts/Validate";
import Decision from "./common/Decision";
import TestSmartick from "./test/TestSmartick";
import ResetPassword from "./accounts/password/ResetPassword";
import ForgotPassword from "./accounts/password/ForgotPassword";
import {getGrades} from "../actions/schools";
import StartTest from "./test/StartTest";
import RegisterForm from "./accounts/registration/RegisterForm";
import DashboardAdmin from "./admin/DashboardAdmin";
import Students from "./students/Students";
import Form from "./students/Form";
import DecisionVis from "./common/DecisionVis";


document.body.style.background = `url(${"static/frontend/public/images/header-email.jpg"})`;



// Alert Options
const alertOptions = {
        timeout: 3000,
        position: 'top center'
}

class App extends Component {
    componentDidMount(){
        store.dispatch(loadUser());
        store.dispatch(getGrades());
    }

    render() {
        return (
            <div>
                <Provider store={store} >
                    <AlertProvider template={AlertTemplate} {...alertOptions}>
                        <Router>
                            <Fragment>
                                <Header />
                                <Alerts />
                                    <Switch>
                                        <Route exact path="/" component={Decision} />
                                        <PrivateRoute exact path="/dashboard" component={Dashboard} />
                                        <Route exact path="/register" component={RegisterForm} />
                                        <Route exact path="/login" component={Login} />
                                        <Route exact path="/check-test-token" component={TestSmartick} />
                                        <Route exact path="/forget-password" component={ForgotPassword} />
                                        <Route path="/forgot-password/:psw_token" component={ResetPassword} exact />
                                        <Route path="/validate/:validCode" component={Validate} exact/>
                                        <Route exact path="/start-test" component={StartTest}/>
                                        <Route exact path="/admin" component={DashboardAdmin}/>
                                        <Route exact path="/students" component={Students}/>
                                        <Route exact path="/form-students" component={Form}/>
                                    </Switch>
                            </Fragment >
                        </Router>
                    </AlertProvider>
                </Provider >
            </div>
        )
    }
}

ReactDOM.render(<App />, document.getElementById('app'));