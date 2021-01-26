import React, {Component, Fragment} from 'react';
import { connect } from 'react-redux';
import {forgotPassword} from "../../../actions/auth";
import {Link} from "react-router-dom";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";

class ForgotPassword extends Component {

    state = {
        email:'',
        resetPasswordError: false
    }

     onChange = input => e => {
        this.setState({
            [e.target.name]: e.target.value,
            [input]: e.target.value
        })
    };

    onSubmit = (e) => {
         e.preventDefault();
         let re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
         if (re.test(this.state.email)) {
             this.setState({
                  resetPasswordError: false
              })
             this.props.forgotPassword(this.state.email)
         } else {
              this.setState({
                  resetPasswordError: true
              })
         }
    };

    render() {
        const { email } = this.state

         const RequestNoSent = (
             <div className="col-md-6 m-auto">
                 <div className="card card-body mt-5 text-center">
                         <h1 className="text-center">Introduzca el email para recuperar la contraseña</h1>
                             <TextField
                                 required
                                 type="email"
                                 error={this.state.resetPasswordError}
                                 label="Email"
                                 onChange={this.onChange('email')}
                                 defaultValue={email}
                                 value={email}
                                 helperText={this.state.resetPasswordError ? 'Email no válido': ''}
                             />
                            <Button variant="contained" color="primary" onClick={this.onSubmit}>
                                 Recordar contraseña
                             </Button>
                 </div>
             </div>
         );

        const RequestSent = (
            <div className="col-md-6 m-auto">
                 <div className="card card-body mt-5 text-center">
                     Compruebe su correo para cambiar la contraseña
                 </div>
            </div>
        )

        return (
            <Fragment>
                {this.props.resetPassword ? RequestSent : RequestNoSent}
            </Fragment>
        );
    }
}

const mapStateToProps = state => ({
    resetPassword: state.auth.resetPassword

});

export default connect(mapStateToProps, { forgotPassword })(ForgotPassword);