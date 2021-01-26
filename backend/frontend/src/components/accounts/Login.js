import React, {Component, Fragment} from 'react';
import { Link, Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import {login, checkValidation, checkAccount} from '../../actions/auth';
import { createMessage } from '../../actions/messages'
import GoogleLogin from "react-google-login";
import Grid from "@material-ui/core/Grid";
import TextField from "@material-ui/core/TextField";
import InputAdornment from "@material-ui/core/InputAdornment";
import AccountCircle from '@material-ui/icons/AccountCircle';
import LockIcon from '@material-ui/icons/Lock';
import SaveIcon from "@material-ui/icons/Save";
import Button from "@material-ui/core/Button";

export class Login extends Component {

  responseGoogle = async (e) => {
      const user = e.profileObj;
      await this.props.checkAccount(user.email)
      if(this.props.externalAccount['external_account'] == 'Google'){
          this.props.login(user.email, user.googleId);
      } else if(this.props.externalAccount['external_account'] == 'Aula'){
          this.props.createMessage({aulaRegistered: 'Correo registrado en Aula'})
      } else {
          this.setState({
              createGoogleAccount:true,
              username: user.email,
              password: user.googleId
          })
      }
  }

    state = {
      username: '',
      password: '',
      emailError: false,
      passwordError:false,
      createGoogleAccount: false
  };

  static propTypes = {
      login: PropTypes.func.isRequired,
      isAuthenticated: PropTypes.bool,
      isValidated:PropTypes.bool
  }

  onSubmit = (e) => {
    e.preventDefault();
    if(this.props.externalAccount['external_account'] == 'Google'){
        this.setState({emailError: true})
    }else{
      if(this.state.username==''){
          this.setState({emailError: true})
          if(this.state.password==''){
              this.setState({passwordError: true})
          }
      } else if (!this.props.isValidated){
          this.setState({emailError: true})
      } else {
          this.setState({emailError: false, passwordError:false})
          this.props.login(this.state.username, this.state.password);
      }
    }
  };

   handleChange = input => e => {
       let re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
       if(input=='username'){
           if (re.test(e.target.value)){
               this.props.checkValidation(e.target.value)
               if(this.props.isValidated){
                   this.props.checkAccount(e.target.value)
               }
           }
           this.setState({
               [input]: e.target.value
           })
       } else {
           this.setState({
               [input]: e.target.value
           })
       }
   }

  render() {
    if(this.props.user !== null){
        if(this.props.user['is_superuser'])
        {return <Redirect to="/admin" />;}
    }
    if(this.props.isAuthenticated){
        return <Redirect to="/dashboard" />;
    }
    if(this.state.createGoogleAccount){
        return <Redirect to={{
                pathname: "/register",
                state: {email: this.state.username, password: this.state.password, google: this.state.createGoogleAccount}
            }}/>
    }


    return (
        <div className="col-md-6 m-auto">
            <div className="card card-body mt-5">
                <br/>
                <Grid container justify="center">
                    <h5 style={{color: 'green'}}>{this.props.isValidated ? 'Cuenta validada' : ''}</h5>
                </Grid>
                <Grid container justify="center">
                    <br/>
                    <TextField
                        required
                        error={this.state.emailError}
                        label="Email"
                        id="validation-outlined-input"
                        onChange={this.handleChange('username')}
                        defaultValue={this.state.username}
                        type="email"
                        variant="outlined"
                        InputProps={{
                            startAdornment: (
                                <InputAdornment position="start">
                                    <AccountCircle />
                                </InputAdornment>
                            ),
                        }}
                    />
                </Grid>
                <br/>
                <Grid container justify="center">
                    <TextField
                        required
                        error={this.state.passwordError}
                        label="Contraseña"
                        onChange={this.handleChange('password')}
                        defaultValue={this.state.password}
                        type="password"
                        variant="outlined"
                        InputProps={{
                            startAdornment: (
                                <InputAdornment position="start">
                                    <LockIcon />
                                </InputAdornment>
                            ),
                        }}
                    />
                </Grid>
                <br/>
                <Grid container justify="center">
                    <Button variant="contained" color="primary"  onClick={this.onSubmit}>
                        Iniciar sesión
                    </Button>
                </Grid>
                <p className="text-center">
                    <Link to="/forget-password">Recuperar contraseña</Link>
                </p>
                <hr/>
                <Grid container justify="center">
                    <GoogleLogin
                        clientId="930594227028-rqddha8u3p3fpnqlklfh19gi5st3t2jl.apps.googleusercontent.com"
                        buttonText="Inicio Google"
                        onSuccess={this.responseGoogle}
                        onFailure={this.responseGoogle}
                        cookiePolicy={'single_host_origin'}
                        className="text-center"
                    />
                </Grid>
                <hr/>
                <p className="text-center">
                    No tienes cuenta? <Link to="/register">Registrar</Link>
                </p>
        </div>
   </div>
  );
  }
  }


const mapStateToProps = state => ({
    isAuthenticated: state.auth.isAuthenticated,
    isValidated: state.auth.isValidated,
    externalAccount: state.auth.externalAccount,
    user: state.auth.user
});


export default connect(mapStateToProps, { login, createMessage, checkValidation, checkAccount })(Login);