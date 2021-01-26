import React, {Component} from 'react';
import FormPersonalDetails from './FormPersonalDetails'
import FormProfileDetails from "./FormProfileDetails";
import FormConfirm from "./FormConfirm";
import FormSuccess from "./FormSuccess";
import {Redirect} from "react-router-dom";
import {connect} from "react-redux";
import {checkAccount, register} from "../../../actions/auth";
import {createMessage} from "../../../actions/messages";
import {getRoles} from "../../../actions/roles";
import Stepper from "@material-ui/core/Stepper";
import {StepLabel} from "@material-ui/core";
import Step from "@material-ui/core/Step";

export class RegisterForm extends Component {

    componentDidMount() {
        this.props.getRoles()
        if(typeof(this.props.location.state)!== 'undefined'){
            this.setState({
            email: this.props.location.state.email,
            password1: this.props.location.state.password,
            password2: this.props.location.state.password,
            external_account: 'Google'
        })
        }
    }

    state = {
        step: 1,
        email: '',
        password1: '',
        password2: '',
        role: {'value':0, 'label':'No defined'},
        external_account: 'Aula',
        val_token: 'Undefined',
        isValidated: false
    }

    nextStep = () => {
        const { step } = this.state
        this.setState({
            step: step + 1
        });
    }

    prevStep = () => {
        const { step } = this.state
        this.setState({
            step: step - 1
        });
    }

    handleChange = input => e => {
        let re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        if(input=='role'){
            const label = this.props.roles.filter(role => role.id == e.target.value)
            this.setState({
                [input]: {'value':e.target.value, 'label': label[0].name}
            })
        } else if(input=='email'){
            this.setState({
                [input]: e.target.value
            })
            if(re.test(e.target.value)){
                this.props.checkAccount(e.target.value)
            }
        } else {
            this.setState({
                [input]: e.target.value
            })
        }
    }
    renderSwitch = (step, values) => {
        switch (step) {
            case 1:
                return (
                    <div>
                    <FormPersonalDetails
                        nextStep={this.nextStep}
                        handleChange={this.handleChange}
                        values = {values} />
                    </div>
                )
            case 2:
                return (
                    <FormProfileDetails
                        nextStep={this.nextStep}
                        prevStep={this.prevStep}
                        handleChange={this.handleChange}
                        values = {values}
                    />
                )
            case 3:
                return (
                    <FormConfirm
                    nextStep={this.nextStep}
                    prevStep={this.prevStep}
                    values = {values}
                />
                )
            case 4:
                return (
                    <FormSuccess
                    values={values}
                    />
                )
        }
    }

    getSteps = () => {
        return ['Detalles de la cuenta', 'Detalles del usuario', 'Confirmar datos'];
    }

    render() {
        const { step } = this.state
        const { email, password1, password2, role, external_account, val_token, isValidated } = this.state
        const values = { email, password1, password2, role, external_account, val_token, isValidated }
        if(this.props.isAuthenticated){
            return <Redirect to="/" />;
        }

        if(this.props.isRegistered){
            if (external_account=="Google"){
                return <Redirect to="/login" />;
            }
        }

        const steps = this.getSteps();
        return(
              <div>
                  <Stepper activeStep={ step-1 } alternativeLabel>
                      {steps.map((label) =>
                       <Step key={label}>
                           <StepLabel>{label}</StepLabel>
                       </Step>
                      )}
                  </Stepper>
                  {this.renderSwitch(step, values)}
              </div>
            )
    }
}

const mapStateToProps = state => ({
    isAuthenticated: state.auth.isAuthenticated,
    isRegistered: state.auth.isRegistered,
    roles: state.roles.roles,
    external_account: state.auth.external_account
})

export default connect(mapStateToProps, { register, createMessage, getRoles, checkAccount })(RegisterForm);