import React, {Component, Fragment} from 'react';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider'
import TextField from '@material-ui/core/TextField'
import RaisedButton from 'material-ui/RaisedButton'
import {connect} from "react-redux";
import {createMessage} from "../../../actions/messages";
import { makeStyles } from '@material-ui/core/styles';
import Grid from "@material-ui/core/Grid";


export class FormPersonalDetails extends Component {

    state = {
        emailError: false,
        passwordError: false,
        passwordOK: false,
        emailOK: false,
        errorMsgPassword:'error',
        errorMsgEmail:'error'
    }

    continue = e => {
        e.preventDefault()
        let re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        const {password1, password2, email} = this.props.values
        if(password1=='' | password2==''){
             this.setState({
                 passwordError: true,
                 errorMsgPassword: 'Introduzca la contraseña'
             })
        } else if(password1 !== password2) {
            this.setState({
                passwordError: true,
                 errorMsgPassword: 'Las contraseñas no coinciden'
            })
        } else {
            this.setState({passwordError: false, passwordOK:true})
        }
        if(this.props.external_account=='Aula' | this.props.external_account=='Google'){
            this.setState({
                emailError: true,
                errorMsgEmail: 'Este correo ya está registrado'
            })
        } else if (email==""){
            this.setState({
                emailError: true,
                errorMsgEmail: 'Introduzca un correo'
            })
        } else if (!re.test(email)){
            this.setState({
                emailError: true,
                errorMsgEmail: 'Correo no válido'
            })
        } else {
            this.setState({emailError: false, emailOK:true})
        }
    }

    render() {
        const { values, handleChange } = this.props
        const { passwordOK,emailOK } = this.state

        if(passwordOK & emailOK){
            this.props.nextStep();
        }

        return (
            <MuiThemeProvider>
                <Fragment>
                        <div className="col-md-6 m-auto" >
                            <div className="card card-body mt-5">
                                <Grid container justify="center">
                                        <TextField
                                            required
                                            disabled={values.external_account=='Google' ? true : false}
                                            error={this.state.emailError}
                                            label="Email"
                                            onChange={handleChange('email')}
                                            type="email"
                                            value={values.email}
                                            helperText={this.state.emailError ? this.state.errorMsgEmail : ''}
                                        />
                                    </Grid>
                                    <br/>
                                     <Grid container justify="center">
                                        <TextField
                                            required
                                            disabled={values.external_account=='Google' ? true : false}
                                            error={this.state.passwordError}
                                            label="Contraseña"
                                            onChange={handleChange('password1')}
                                            type="password"
                                            value={values.password1}
                                            helperText={this.state.passwordError ? this.state.errorMsgPassword : ''}
                                        />
                                    </Grid>
                                    <br/>
                                    <Grid container justify="center">
                                        <TextField
                                            required
                                            disabled={values.external_account=='Google' ? true : false}
                                            error={this.state.passwordError}
                                            label="Confirmar contraseña"
                                            onChange={handleChange('password2')}
                                            type="password"
                                            value={values.password2}
                                        />
                                    </Grid>
                                    <br/>
                                    <RaisedButton
                                        label="Siguiente"
                                        primary={true}
                                        style={styles.button}
                                        onClick={this.continue}
                                    />
                            </div>
                        </div>
                </Fragment>
            </MuiThemeProvider>
    );
    }
}

const styles = {
    button: {
        margin:15
    }
}

const mapStateToProps = state => ({
    external_account: state.auth.external_account
})


export default connect(mapStateToProps, {createMessage})(FormPersonalDetails);